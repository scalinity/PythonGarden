import type { GameAction } from '@/types/actions.ts'

interface ResourceConditionParams {
  maxActions?: number
}

import type { ConditionResult } from '../Validator.ts'

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
