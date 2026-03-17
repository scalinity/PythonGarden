import type { StateCreator } from 'zustand'
import type { WorldState } from '@/types/entities.ts'
import type { LevelDefinition } from '@/types/level.ts'
import type { GameStore } from '../useGameStore.ts'

export interface LevelSlice {
  currentLevelId: string | null
  worldState: WorldState | null
  initialWorldState: WorldState | null
  levelDefinition: LevelDefinition | null
  loadLevel: (level: LevelDefinition) => void
  resetWorld: () => void
  updateWorldState: (state: WorldState) => void
}

const defaultWorld: WorldState = {
  plants: [],
  sprinklers: [],
  drones: [],
  reservoirs: [],
  storages: [],
  weather: { sunlight: 50, temperature: 20 },
  canopies: [],
  pumps: [],
  sprayers: [],
}

function fillWorldDefaults(partial: Partial<WorldState>): WorldState {
  return { ...defaultWorld, ...partial }
}

export const createLevelSlice: StateCreator<
  GameStore,
  [['zustand/immer', never]],
  [],
  LevelSlice
> = (set) => ({
  currentLevelId: null,
  worldState: null,
  initialWorldState: null,
  levelDefinition: null,

  loadLevel: (level) =>
    set((state) => {
      const world = fillWorldDefaults(level.world)
      state.currentLevelId = level.id
      state.levelDefinition = level
      state.worldState = world
      state.initialWorldState = world
    }),

  resetWorld: () =>
    set((state) => {
      if (state.initialWorldState) {
        state.worldState = state.initialWorldState
      }
    }),

  updateWorldState: (world) =>
    set((state) => {
      state.worldState = world
    }),
})
