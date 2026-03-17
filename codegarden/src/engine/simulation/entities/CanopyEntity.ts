import type { Canopy } from '@/types/entities.ts'

export class CanopyEntity {
  id: string
  isOpen: boolean

  constructor(state: Canopy) {
    this.id = state.id
    this.isOpen = state.isOpen
  }

  toState(): Canopy {
    return {
      id: this.id,
      isOpen: this.isOpen,
    }
  }

  static fromState(state: Canopy): CanopyEntity {
    return new CanopyEntity(state)
  }
}
