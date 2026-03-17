import type { Sprayer, Position } from '@/types/entities.ts'

export class SprayerEntity {
  id: string
  position: Position

  constructor(state: Sprayer) {
    this.id = state.id
    this.position = { ...state.position }
  }

  toState(): Sprayer {
    return {
      id: this.id,
      position: { ...this.position },
    }
  }

  static fromState(state: Sprayer): SprayerEntity {
    return new SprayerEntity(state)
  }
}
