import type { GameAction } from '@/types/actions.ts'

interface ResourceConditionParams {
  maxActions?: number
}

export interface ConditionResult {
  passed: boolean
  description: string
}

export function checkResourceCondition(
  params: ResourceConditionParams,
  actions: GameAction[],
  description: string,
): ConditionResult {
  if (params.maxActions !== undefined) {
    return {
      passed: actions.length <= params.maxActions,
      description,
    }
  }

  return { passed: true, description }
}
