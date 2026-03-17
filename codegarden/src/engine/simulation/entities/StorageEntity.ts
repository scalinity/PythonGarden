import type { Storage } from '@/types/entities.ts'

export class StorageEntity {
  id: string
  items: string[]
  bins: Record<string, string[]>

  constructor(state: Storage) {
    this.id = state.id
    this.items = [...state.items]
    this.bins = Object.fromEntries(
      Object.entries(state.bins).map(([k, v]) => [k, [...v]])
    )
  }

  toState(): Storage {
    return {
      id: this.id,
      items: [...this.items],
      bins: Object.fromEntries(
        Object.entries(this.bins).map(([k, v]) => [k, [...v]])
      ),
    }
  }

  static fromState(state: Storage): StorageEntity {
    return new StorageEntity(state)
  }
}
