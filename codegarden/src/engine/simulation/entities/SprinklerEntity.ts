import type { Sprinkler, Position } from '@/types/entities.ts'

export class SprinklerEntity {
  id: string
  position: Position
  isOn: boolean

  constructor(state: Sprinkler) {
    this.id = state.id
    this.position = { ...state.position }
    this.isOn = state.isOn
  }

  toState(): Sprinkler {
    return {
      id: this.id,
      position: { ...this.position },
      isOn: this.isOn,
    }
  }

  static fromState(state: Sprinkler): SprinklerEntity {
    return new SprinklerEntity(state)
  }
}
