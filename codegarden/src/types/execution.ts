export type ExecutionStatus =
  | 'idle'
  | 'loading'
  | 'running'
  | 'stepping'
  | 'step_paused'
  | 'reviewing'
  | 'error'

export type ExecutionSpeed = 1 | 2 | 4

export interface TraceEntry {
  line: number
  variables: VariableSnapshot[]
  timestamp: number
}

export interface VariableSnapshot {
  name: string
  value: string
  type: string
}

export interface FriendlyError {
  headline: string
  explanation: string
  highlightLine?: number
  suggestedAction: string
  relatedConcept?: string
  rawError: string
}

export interface ExecutionResult {
  success: boolean
  actions: import('./actions.ts').GameAction[]
  traceEntries: TraceEntry[]
  variables: VariableSnapshot[]
  error?: FriendlyError
  logs: string[]
}

export interface ConceptCard {
  id: string
  name: string
  explanation: string
  pythonExample: string
  relatedConcepts?: string[]
}

export interface PlayerProgress {
  unlockedLevels: string[]
  completedLevels: string[]
  hintsUsed: Record<string, number>
  savedCode: Record<string, string>
  conceptMastery: Record<string, boolean>
}
