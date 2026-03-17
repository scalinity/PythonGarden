import type { StateCreator } from 'zustand'
import type { GameStore } from '../useGameStore.ts'

export interface ProgressSlice {
  unlockedLevels: string[]
  completedLevels: string[]
  hintsUsed: Record<string, number>
  savedCode: Record<string, string>
  conceptMastery: Record<string, boolean>
  completeLevel: (levelId: string, nextLevelId?: string) => void
  useHint: (levelId: string) => void
  saveCode: (levelId: string, code: string) => void
  masterConcept: (concept: string) => void
  resetProgress: () => void
}

export const createProgressSlice: StateCreator<
  GameStore,
  [['zustand/immer', never]],
  [],
  ProgressSlice
> = (set) => ({
  unlockedLevels: [],
  completedLevels: [],
  hintsUsed: {},
  savedCode: {},
  conceptMastery: {},

  completeLevel: (levelId, nextLevelId) =>
    set((state) => {
      if (!state.completedLevels.includes(levelId)) {
        state.completedLevels.push(levelId)
      }
      if (nextLevelId && !state.unlockedLevels.includes(nextLevelId)) {
        state.unlockedLevels.push(nextLevelId)
      }
    }),

  useHint: (levelId) =>
    set((state) => {
      state.hintsUsed[levelId] = (state.hintsUsed[levelId] ?? 0) + 1
    }),

  saveCode: (levelId, code) =>
    set((state) => {
      state.savedCode[levelId] = code
    }),

  masterConcept: (concept) =>
    set((state) => {
      state.conceptMastery[concept] = true
    }),

  resetProgress: () =>
    set((state) => {
      state.unlockedLevels = []
      state.completedLevels = []
      state.hintsUsed = {}
      state.savedCode = {}
      state.conceptMastery = {}
    }),
})
