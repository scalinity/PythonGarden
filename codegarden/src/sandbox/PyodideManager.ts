import type {
  WorkerInMessage,
  WorkerOutMessage,
  GameObjectDescriptor,
} from '@/sandbox/worker/workerProtocol.ts'
import type {
  ExecutionResult,
  FriendlyError,
  TraceEntry,
  VariableSnapshot,
} from '@/types/execution.ts'
import type { GameAction } from '@/types/actions.ts'

type TraceCallback = (entry: TraceEntry) => void
type ActionsCallback = (actions: GameAction[]) => void
type LogCallback = (message: string) => void
type StepPausedCallback = (line: number, variables: VariableSnapshot[]) => void

export class PyodideManager {
  private worker: Worker | null = null
  private interruptBuffer: SharedArrayBuffer | null = null
  private interruptView: Int32Array | null = null
  private initPromise: Promise<void> | null = null
  private executeResolve: ((result: ExecutionResult) => void) | null = null
  private executeReject: ((error: FriendlyError) => void) | null = null

  private _onTrace: TraceCallback | null = null
  private _onActions: ActionsCallback | null = null
  private _onLog: LogCallback | null = null
  private _onStepPaused: StepPausedCallback | null = null

  constructor() {
    this.spawnWorker()
  }

  // ---- Callback setters ---------------------------------------------------

  set onTrace(cb: TraceCallback) {
    this._onTrace = cb
  }

  set onActions(cb: ActionsCallback) {
    this._onActions = cb
  }

  set onLog(cb: LogCallback) {
    this._onLog = cb
  }

  set onStepPaused(cb: StepPausedCallback) {
    this._onStepPaused = cb
  }

  // ---- Lifecycle ----------------------------------------------------------

  init(): Promise<void> {
    if (this.initPromise) return this.initPromise

    this.initPromise = new Promise<void>((resolve, reject) => {
      const handler = (e: MessageEvent<WorkerOutMessage>) => {
        if (e.data.type === 'ready') {
          this.worker?.removeEventListener('message', handler)
          resolve()
        } else if (e.data.type === 'execution-error') {
          this.worker?.removeEventListener('message', handler)
          reject(e.data.error)
        }
      }
      this.worker?.addEventListener('message', handler)
      this.send({ type: 'init' })
    })

    return this.initPromise
  }

  execute(
    code: string,
    globalsConfig: GameObjectDescriptor[],
    _mode: 'run' | 'step' = 'run',
  ): Promise<ExecutionResult> {
    return new Promise<ExecutionResult>((resolve, reject) => {
      this.executeResolve = resolve
      this.executeReject = reject

      // Allocate SharedArrayBuffer: 2 int32 slots
      // [0] = interrupt/cancel flag,  [1] = step lock
      this.interruptBuffer = new SharedArrayBuffer(8)
      this.interruptView = new Int32Array(this.interruptBuffer)
      Atomics.store(this.interruptView, 0, 0)
      Atomics.store(this.interruptView, 1, 1) // 1 = running

      this.send({
        type: 'execute',
        code,
        globals: globalsConfig,
        interruptBuffer: this.interruptBuffer,
      })
    })
  }

  stepNext(): void {
    if (this.interruptView) {
      Atomics.store(this.interruptView, 1, 1)
      Atomics.notify(this.interruptView, 1)
    }
    this.send({ type: 'step-next' })
  }

  cancel(): void {
    if (this.interruptView) {
      Atomics.store(this.interruptView, 0, 1)
    }
    this.send({ type: 'cancel' })
  }

  reset(): void {
    this.interruptBuffer = null
    this.interruptView = null
    this.executeResolve = null
    this.executeReject = null
    this.send({ type: 'reset' })
  }

  destroy(): void {
    this.worker?.terminate()
    this.worker = null
    this.initPromise = null
    this.interruptBuffer = null
    this.interruptView = null
  }

  // ---- Internal -----------------------------------------------------------

  private spawnWorker(): void {
    this.worker = new Worker(
      new URL('./worker/pyodideWorker.ts', import.meta.url),
      { type: 'module' },
    )
    this.worker.addEventListener('message', this.handleMessage)
    this.worker.addEventListener('error', this.handleError)
  }

  private send(msg: WorkerInMessage): void {
    this.worker?.postMessage(msg)
  }

  private handleMessage = (e: MessageEvent<WorkerOutMessage>): void => {
    const msg = e.data

    switch (msg.type) {
      case 'execution-complete':
        this.executeResolve?.(msg.result)
        this.executeResolve = null
        this.executeReject = null
        break

      case 'execution-error':
        this.executeReject?.(msg.error)
        this.executeResolve = null
        this.executeReject = null
        break

      case 'trace':
        this._onTrace?.(msg.entry)
        break

      case 'actions':
        this._onActions?.(msg.actions)
        break

      case 'log':
        this._onLog?.(msg.message)
        break

      case 'step-paused':
        this._onStepPaused?.(msg.line, msg.variables)
        break

      // 'ready' and 'execution-start' handled by init() / ignored
      default:
        break
    }
  }

  private handleError = (_e: ErrorEvent): void => {
    // Worker crashed -- recreate it
    this.worker?.terminate()
    this.initPromise = null

    const err: FriendlyError = {
      headline: 'Python engine crashed',
      explanation: 'The code runner encountered an unexpected error and had to restart.',
      suggestedAction: 'Try running your code again.',
      rawError: _e.message,
    }
    this.executeReject?.(err)
    this.executeResolve = null
    this.executeReject = null

    this.spawnWorker()
    void this.init()
  }
}
