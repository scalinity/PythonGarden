import type { Drone, Position, Direction } from '@/types/entities.ts'

export class DroneEntity {
  id: string
  position: Position
  direction: Direction
  carrying: string | null

  constructor(state: Drone) {
    this.id = state.id
    this.position = { ...state.position }
    this.direction = state.direction
    this.carrying = state.carrying
  }

  toState(): Drone {
    return {
      id: this.id,
      position: { ...this.position },
      direction: this.direction,
      carrying: this.carrying,
    }
  }

  static fromState(state: Drone): DroneEntity {
    return new DroneEntity(state)
  }
}
