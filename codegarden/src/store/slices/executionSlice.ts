import type { StateCreator } from 'zustand'
import type { ExecutionStatus, ExecutionSpeed, TraceEntry, VariableSnapshot, FriendlyError } from '@/types/execution.ts'
import type { GameAction } from '@/types/actions.ts'
import type { ValidationResult } from '@engine/validation/Validator.ts'
import type { GameStore } from '../useGameStore.ts'

export interface ExecutionSlice {
  status: ExecutionStatus
  speed: ExecutionSpeed
  currentLine: number | null
  actionQueue: GameAction[]
  traceEntries: TraceEntry[]
  variables: VariableSnapshot[]
  errors: FriendlyError[]
  logs: string[]
  validationResult: ValidationResult | null
  setStatus: (status: ExecutionStatus) => void
  setSpeed: (speed: ExecutionSpeed) => void
  setCurrentLine: (line: number | null) => void
  addActions: (actions: GameAction[]) => void
  addTraceEntry: (entry: TraceEntry) => void
  addTraceEntryWithLine: (entry: TraceEntry) => void
  setVariables: (vars: VariableSnapshot[]) => void
  addError: (error: FriendlyError) => void
  addLog: (message: string) => void
  setValidationResult: (result: ValidationResult | null) => void
  clearExecution: () => void
}

export const createExecutionSlice: StateCreator<
  GameStore,
  [['zustand/immer', never]],
  [],
  ExecutionSlice
> = (set) => ({
  status: 'idle',
  speed: 1,
  currentLine: null,
  actionQueue: [],
  traceEntries: [],
  variables: [],
  errors: [],
  logs: [],
  validationResult: null,

  setStatus: (status) =>
    set((state) => {
      state.status = status
    }),

  setSpeed: (speed) =>
    set((state) => {
      state.speed = speed
    }),

  setCurrentLine: (line) =>
    set((state) => {
      state.currentLine = line
    }),

  addActions: (actions) =>
    set((state) => {
      state.actionQueue.push(...actions)
    }),

  addTraceEntry: (entry) =>
    set((state) => {
      if (state.traceEntries.length < 5000) {
        state.traceEntries.push(entry)
      }
    }),

  addTraceEntryWithLine: (entry) =>
    set((state) => {
      if (state.traceEntries.length < 5000) {
        state.traceEntries.push(entry)
      }
      state.currentLine = entry.line
    }),

  setVariables: (vars) =>
    set((state) => {
      state.variables = vars
    }),

  addError: (error) =>
    set((state) => {
      state.errors.push(error)
    }),

  addLog: (message) =>
    set((state) => {
      state.logs.push(message)
    }),

  setValidationResult: (result) =>
    set((state) => {
      state.validationResult = result
    }),

  clearExecution: () =>
    set((state) => {
      state.status = 'idle'
      state.currentLine = null
      state.actionQueue = []
      state.traceEntries = []
      state.variables = []
      state.errors = []
      state.logs = []
      state.validationResult = null
    }),
})
