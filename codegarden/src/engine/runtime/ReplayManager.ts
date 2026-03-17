import type { GameAction } from '@/types/actions.ts'
import type { ExecutionSpeed } from '@/types/execution.ts'

const SPEED_DELAYS: Record<ExecutionSpeed, number> = {
  1: 300,
  2: 150,
  4: 75,
}

export class ReplayManager {
  private actions: GameAction[] = []
  private index = 0
  private playing = false
  private paused = false
  private timer: ReturnType<typeof setTimeout> | null = null

  loadActions(actions: GameAction[]): void {
    this.actions = [...actions]
    this.index = 0
    this.playing = false
    this.paused = false
  }

  play(speed: ExecutionSpeed, onAction: (action: GameAction, index: number) => void): void {
    if (this.actions.length === 0) return

    this.playing = true
    this.paused = false
    const delay = SPEED_DELAYS[speed]

    const next = () => {
      if (!this.playing || this.paused) return
      if (this.index >= this.actions.length) {
        this.playing = false
        return
      }

      onAction(this.actions[this.index], this.index)
      this.index++

      if (this.index < this.actions.length) {
        this.timer = setTimeout(next, delay)
      } else {
        this.playing = false
      }
    }

    next()
  }

  pause(): void {
    this.paused = true
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  resume(speed: ExecutionSpeed, onAction: (action: GameAction, index: number) => void): void {
    if (!this.playing) return
    this.paused = false
    this.play(speed, onAction)
  }

  stop(): void {
    this.playing = false
    this.paused = false
    this.index = 0
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  isPlaying(): boolean {
    return this.playing && !this.paused
  }
}
