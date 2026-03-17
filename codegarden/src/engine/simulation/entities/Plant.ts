import type { Plant as PlantState, Position } from '@/types/entities.ts'

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export class PlantEntity {
  id: string
  name: string
  species: string
  position: Position
  moisture: number
  health: number
  ripe: boolean
  needsPollination: boolean
  row?: string

  constructor(state: PlantState) {
    this.id = state.id
    this.name = state.name
    this.species = state.species
    this.position = { ...state.position }
    this.moisture = clamp(state.moisture, 0, 100)
    this.health = clamp(state.health, 0, 100)
    this.ripe = state.ripe
    this.needsPollination = state.needsPollination
    this.row = state.row
  }

  setMoisture(value: number) {
    this.moisture = clamp(value, 0, 100)
  }

  setHealth(value: number) {
    this.health = clamp(value, 0, 100)
  }

  toState(): PlantState {
    return {
      id: this.id,
      name: this.name,
      species: this.species,
      position: { ...this.position },
      moisture: this.moisture,
      health: this.health,
      ripe: this.ripe,
      needsPollination: this.needsPollination,
      ...(this.row !== undefined ? { row: this.row } : {}),
    }
  }

  static fromState(state: PlantState): PlantEntity {
    return new PlantEntity(state)
  }
}
