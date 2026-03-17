import type { GameAction, ActionResult } from '@/types/actions.ts'
import type { ExecutionStatus, ExecutionSpeed, ExecutionResult } from '@/types/execution.ts'
import type { SimulationEngine } from '@engine/simulation/SimulationEngine.ts'
import { EventLog } from './EventLog.ts'

interface ExecutionCallbacks {
  onStatusChange: (status: ExecutionStatus) => void
  onActionApplied: (result: ActionResult) => void
  onComplete: (result: ExecutionResult) => void
  onError: (error: string) => void
}

interface PyodideRunner {
  execute(code: string): Promise<ExecutionResult>
  cancel(): void
}

const SPEED_DELAYS: Record<ExecutionSpeed, number> = {
  1: 300,
  2: 150,
  4: 75,
}

const WALL_CLOCK_TIMEOUT = 5000

export class ExecutionController {
  private status: ExecutionStatus = 'idle'
  private speed: ExecutionSpeed = 1
  private simulation: SimulationEngine
  private runner: PyodideRunner
  private callbacks: ExecutionCallbacks
  private eventLog = new EventLog()
  private actionQueue: GameAction[] = []
  private drainTimer: ReturnType<typeof setTimeout> | null = null
  private timeoutTimer: ReturnType<typeof setTimeout> | null = null
  private stepIndex = 0
  private cancelled = false

  constructor(
    simulation: SimulationEngine,
    runner: PyodideRunner,
    callbacks: ExecutionCallbacks,
  ) {
    this.simulation = simulation
    this.runner = runner
    this.callbacks = callbacks
  }

  getStatus(): ExecutionStatus {
    return this.status
  }

  getEventLog(): EventLog {
    return this.eventLog
  }

  setSpeed(speed: ExecutionSpeed): void {
    this.speed = speed
  }

  async run(code: string): Promise<void> {
    if (this.status !== 'idle' && this.status !== 'step_paused') return

    this.cancelled = false
    this.setStatus('running')
    this.eventLog.clear()
    this.simulation.reset()

    try {
      const result = await this.executeWithTimeout(code)

      if (this.cancelled) return

      if (result.error) {
        this.callbacks.onError(result.error.headline)
        this.setStatus('error')
        this.callbacks.onComplete(result)
        return
      }

      this.actionQueue = [...result.actions]
      await this.drainActions()

      if (!this.cancelled) {
        this.setStatus('reviewing')
        this.callbacks.onComplete(result)
      }
    } catch (err) {
      if (!this.cancelled) {
        const message = err instanceof Error ? err.message : String(err)
        this.callbacks.onError(message)
        this.setStatus('error')
      }
    }
  }

  async step(): Promise<void> {
    if (this.status === 'idle') {
      // First step - need to execute code first, but we don't have it stored
      // The caller should use run() for the initial execution
      return
    }

    if (this.status !== 'step_paused') return

    this.setStatus('stepping')

    if (this.stepIndex < this.actionQueue.length) {
      const action = this.actionQueue[this.stepIndex]
      this.eventLog.append(action)
      const result = this.simulation.applyAction(action)
      this.callbacks.onActionApplied(result)
      this.stepIndex++
    }

    if (this.stepIndex >= this.actionQueue.length) {
      this.setStatus('reviewing')
    } else {
      this.setStatus('step_paused')
    }
  }

  stop(): void {
    this.cancelled = true
    this.runner.cancel()
    this.clearTimers()
    this.actionQueue = []
    this.stepIndex = 0
    this.setStatus('idle')
  }

  reset(): void {
    this.stop()
    this.simulation.reset()
    this.eventLog.clear()
  }

  private async executeWithTimeout(code: string): Promise<ExecutionResult> {
    return new Promise<ExecutionResult>((resolve, reject) => {
      this.timeoutTimer = setTimeout(() => {
        this.runner.cancel()
        reject(new Error('Execution timed out after 5 seconds'))
      }, WALL_CLOCK_TIMEOUT)

      this.runner.execute(code).then(
        (result) => {
          this.clearTimeout()
          resolve(result)
        },
        (err) => {
          this.clearTimeout()
          reject(err)
        },
      )
    })
  }

  private async drainActions(): Promise<void> {
    const delay = SPEED_DELAYS[this.speed]

    for (let i = 0; i < this.actionQueue.length; i++) {
      if (this.cancelled) return

      const action = this.actionQueue[i]
      this.eventLog.append(action)
      const result = this.simulation.applyAction(action)
      this.callbacks.onActionApplied(result)

      if (i < this.actionQueue.length - 1) {
        await this.sleep(delay)
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.drainTimer = setTimeout(resolve, ms)
    })
  }

  private setStatus(status: ExecutionStatus): void {
    this.status = status
    this.callbacks.onStatusChange(status)
  }

  private clearTimers(): void {
    if (this.drainTimer) {
      clearTimeout(this.drainTimer)
      this.drainTimer = null
    }
    this.clearTimeout()
  }

  private clearTimeout(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
      this.timeoutTimer = null
    }
  }
}
