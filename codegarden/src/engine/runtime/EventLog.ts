import type { GameAction, ActionType } from '@/types/actions.ts'

export class EventLog {
  private entries: GameAction[] = []

  append(action: GameAction): void {
    this.entries.push(action)
  }

  getAll(): GameAction[] {
    return [...this.entries]
  }

  getByType(type: ActionType): GameAction[] {
    return this.entries.filter((a) => a.type === type)
  }

  clear(): void {
    this.entries = []
  }
}
