import type { LevelDefinition, SuccessCondition } from '@/types/level.ts'
import type { WorldState } from '@/types/entities.ts'
import type { GameAction } from '@/types/actions.ts'
import { checkStateCondition } from './conditions/stateCondition.ts'
import { checkActionCondition } from './conditions/actionCondition.ts'
import { checkConceptCondition } from './conditions/conceptCondition.ts'
import { checkResourceCondition } from './conditions/resourceCondition.ts'

export interface ConditionResult {
  passed: boolean
  description: string
}

export interface ValidationResult {
  passed: boolean
  results: ConditionResult[]
}

type ConditionChecker = (
  condition: SuccessCondition,
  world: WorldState,
  actions: GameAction[],
  code: string,
) => ConditionResult

const checkers: Record<string, ConditionChecker> = {
  state: (cond, world) =>
    checkStateCondition(
      cond.params as unknown as Parameters<typeof checkStateCondition>[0],
      world,
      cond.description,
    ),
  action: (cond, _world, actions) =>
    checkActionCondition(
      cond.params as unknown as Parameters<typeof checkActionCondition>[0],
      actions,
      cond.description,
    ),
  concept: (cond, _world, _actions, code) =>
    checkConceptCondition(
      cond.params as unknown as Parameters<typeof checkConceptCondition>[0],
      code,
      cond.description,
    ),
  resource: (cond, _world, actions) =>
    checkResourceCondition(
      cond.params as unknown as Parameters<typeof checkResourceCondition>[0],
      actions,
      cond.description,
    ),
}

export function validate(
  level: LevelDefinition,
  worldState: WorldState,
  actions: GameAction[],
  code: string,
): ValidationResult {
  const results: ConditionResult[] = level.successConditions.map((condition) => {
    const checker = checkers[condition.type]
    if (!checker) {
      return { passed: false, description: `Unknown condition type: ${condition.type}` }
    }
    return checker(condition, worldState, actions, code)
  })

  return {
    passed: results.every((r) => r.passed),
    results,
  }
}
