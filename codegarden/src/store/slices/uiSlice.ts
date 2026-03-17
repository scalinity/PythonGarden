import type { StateCreator } from 'zustand'
import type { GameStore } from '../useGameStore.ts'

export interface UISlice {
  theme: 'default' | 'high-contrast'
  fontSize: number
  reducedMotion: boolean
  dyslexiaFont: boolean
  missionPanelOpen: boolean
  debugPanelOpen: boolean
  hintPanelOpen: boolean
  setTheme: (theme: 'default' | 'high-contrast') => void
  setFontSize: (size: number) => void
  setReducedMotion: (on: boolean) => void
  setDyslexiaFont: (on: boolean) => void
  togglePanel: (panel: 'mission' | 'debug' | 'hint') => void
}

const panelKey = {
  mission: 'missionPanelOpen',
  debug: 'debugPanelOpen',
  hint: 'hintPanelOpen',
} as const

export const createUISlice: StateCreator<
  GameStore,
  [['zustand/immer', never]],
  [],
  UISlice
> = (set) => ({
  theme: 'default',
  fontSize: 16,
  reducedMotion: false,
  dyslexiaFont: false,
  missionPanelOpen: true,
  debugPanelOpen: false,
  hintPanelOpen: false,

  setTheme: (theme) =>
    set((state) => {
      state.theme = theme
    }),

  setFontSize: (size) =>
    set((state) => {
      state.fontSize = size
    }),

  setReducedMotion: (on) =>
    set((state) => {
      state.reducedMotion = on
    }),

  setDyslexiaFont: (on) =>
    set((state) => {
      state.dyslexiaFont = on
    }),

  togglePanel: (panel) =>
    set((state) => {
      const key = panelKey[panel]
      state[key] = !state[key]
    }),
})
