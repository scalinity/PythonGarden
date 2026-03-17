import type { GameAction, ActionType } from '@/types/actions.ts'

interface ActionConditionParams {
  actionType?: ActionType
  type?: ActionType
  target?: string
  source?: string
  amount?: number
  exists?: boolean
  count?: number
  countOperator?: '==' | '>=' | '<='
}

import type { ConditionResult } from '../Validator.ts'

export function checkActionCondition(
  params: ActionConditionParams,
  actions: GameAction[],
  description: string,
): ConditionResult {
  const actionType = params.actionType ?? params.type
  const matching = actions.filter((a) => {
    if (actionType && a.type !== actionType) return false
    if (params.target && a.target !== params.target) return false
    if (params.source && a.source !== params.source) return false
    if (params.amount !== undefined && a.amount !== params.amount) return false
    return true
  })

  if (params.count !== undefined) {
    const op = params.countOperator ?? '=='
    let passed = false
    switch (op) {
      case '==': passed = matching.length === params.count; break
      case '>=': passed = matching.length >= params.count; break
      case '<=': passed = matching.length <= params.count; break
    }
    return { passed, description }
  }

  const shouldExist = params.exists !== false
  return {
    passed: shouldExist ? matching.length > 0 : matching.length === 0,
    description,
  }
}
