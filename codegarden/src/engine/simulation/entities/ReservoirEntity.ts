import type { Reservoir } from '@/types/entities.ts'

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export class ReservoirEntity {
  id: string
  level: number
  maxLevel: number

  constructor(state: Reservoir) {
    this.id = state.id
    this.maxLevel = state.maxLevel
    this.level = clamp(state.level, 0, state.maxLevel)
  }

  setLevel(value: number) {
    this.level = clamp(value, 0, this.maxLevel)
  }

  toState(): Reservoir {
    return {
      id: this.id,
      level: this.level,
      maxLevel: this.maxLevel,
    }
  }

  static fromState(state: Reservoir): ReservoirEntity {
    return new ReservoirEntity(state)
  }
}
