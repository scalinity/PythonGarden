import type { Pump } from '@/types/entities.ts'

export class PumpEntity {
  id: string
  transferRate: number

  constructor(state: Pump) {
    this.id = state.id
    this.transferRate = state.transferRate
  }

  toState(): Pump {
    return {
      id: this.id,
      transferRate: this.transferRate,
    }
  }

  static fromState(state: Pump): PumpEntity {
    return new PumpEntity(state)
  }
}
