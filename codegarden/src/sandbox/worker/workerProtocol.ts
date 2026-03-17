import type { ExecutionResult, FriendlyError, TraceEntry, VariableSnapshot } from '@/types/execution.ts'
import type { GameAction } from '@/types/actions.ts'

// ---------------------------------------------------------------------------
// GameObjectDescriptor – describes a stub object available in Python
// ---------------------------------------------------------------------------
export interface GameObjectDescriptor {
  name: string
  type: string
  id: string
  methods: { name: string; args: string[] }[]
  properties: { name: string; value: unknown }[]
}

// ---------------------------------------------------------------------------
// Main thread -> Worker
// ---------------------------------------------------------------------------
export type WorkerInMessage =
  | { type: 'init' }
  | { type: 'execute'; code: string; globals: GameObjectDescriptor[]; interruptBuffer: SharedArrayBuffer }
  | { type: 'step-next' }
  | { type: 'cancel' }
  | { type: 'reset' }

// ---------------------------------------------------------------------------
// Worker -> Main thread
// ---------------------------------------------------------------------------
export type WorkerOutMessage =
  | { type: 'ready' }
  | { type: 'execution-start' }
  | { type: 'execution-complete'; result: ExecutionResult }
  | { type: 'execution-error'; error: FriendlyError }
  | { type: 'trace'; entry: TraceEntry }
  | { type: 'actions'; actions: GameAction[] }
  | { type: 'log'; message: string }
  | { type: 'step-paused'; line: number; variables: VariableSnapshot[] }
