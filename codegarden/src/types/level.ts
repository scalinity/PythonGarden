import type { WorldState } from './entities.ts'

export interface SuccessCondition {
  type: 'state' | 'action' | 'concept' | 'resource'
  params: Record<string, unknown>
  description: string
}

export interface HintTier {
  direction: string
  conceptNudge: string
  structuralHelp: string
}

export interface AvailableObject {
  name: string
  type: string
  methods: AvailableMethod[]
}

export interface AvailableMethod {
  name: string
  signature: string
  description: string
  returnType?: string
}

export interface LevelDefinition {
  id: string
  title: string
  biome: string
  concepts: string[]
  missionText: string
  starterCode: string
  availableObjects: AvailableObject[]
  world: Partial<WorldState>
  successConditions: SuccessCondition[]
  hints: HintTier
  conceptCardId?: string
  order: number
}
