import type { StateCreator } from 'zustand'
import type { GameStore } from '../useGameStore.ts'

export interface EditorSlice {
  code: string
  starterCode: string
  isDirty: boolean
  setCode: (code: string) => void
  setStarterCode: (code: string) => void
  resetCode: () => void
}

export const createEditorSlice: StateCreator<
  GameStore,
  [['zustand/immer', never]],
  [],
  EditorSlice
> = (set) => ({
  code: '',
  starterCode: '',
  isDirty: false,

  setCode: (code) =>
    set((state) => {
      state.code = code
      state.isDirty = code !== state.starterCode
    }),

  setStarterCode: (code) =>
    set((state) => {
      state.starterCode = code
      state.code = code
      state.isDirty = false
    }),

  resetCode: () =>
    set((state) => {
      state.code = state.starterCode
      state.isDirty = false
    }),
})
