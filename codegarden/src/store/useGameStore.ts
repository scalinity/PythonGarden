import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { createLevelSlice, type LevelSlice } from './slices/levelSlice.ts'
import { createExecutionSlice, type ExecutionSlice } from './slices/executionSlice.ts'
import { createEditorSlice, type EditorSlice } from './slices/editorSlice.ts'
import { createUISlice, type UISlice } from './slices/uiSlice.ts'
import { createProgressSlice, type ProgressSlice } from './slices/progressSlice.ts'

export type GameStore = LevelSlice &
  ExecutionSlice &
  EditorSlice &
  UISlice &
  ProgressSlice

export const useGameStore = create<GameStore>()(
  persist(
    immer((...a) => ({
      ...createLevelSlice(...a),
      ...createExecutionSlice(...a),
      ...createEditorSlice(...a),
      ...createUISlice(...a),
      ...createProgressSlice(...a),
    })),
    {
      name: 'codegarden-progress',
      partialize: (state) => ({
        unlockedLevels: state.unlockedLevels,
        completedLevels: state.completedLevels,
        hintsUsed: state.hintsUsed,
        savedCode: state.savedCode,
        conceptMastery: state.conceptMastery,
      }),
    },
  ),
)
