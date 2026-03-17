export interface Position {
  x: number
  y: number
}

export type Direction = 'north' | 'south' | 'east' | 'west'

export interface Plant {
  id: string
  name: string
  species: string
  position: Position
  moisture: number
  health: number
  ripe: boolean
  needsPollination: boolean
  row?: string
}

export interface Sprinkler {
  id: string
  position: Position
  isOn: boolean
}

export interface Drone {
  id: string
  position: Position
  direction: Direction
  carrying: string | null
}

export interface Reservoir {
  id: string
  level: number
  maxLevel: number
}

export interface Storage {
  id: string
  items: string[]
  bins: Record<string, string[]>
}

export interface Weather {
  sunlight: number
  temperature: number
}

export interface Canopy {
  id: string
  isOpen: boolean
}

export interface Pump {
  id: string
  transferRate: number
}

export interface Sprayer {
  id: string
  position: Position
}

export interface WorldState {
  plants: Plant[]
  sprinklers: Sprinkler[]
  drones: Drone[]
  reservoirs: Reservoir[]
  storages: Storage[]
  weather: Weather
  canopies: Canopy[]
  pumps: Pump[]
  sprayers: Sprayer[]
}

export type EntityType = keyof WorldState
