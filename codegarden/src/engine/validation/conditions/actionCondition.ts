import type { GameAction, ActionType } from '@/types/actions.ts'

interface ActionConditionParams {
  actionType: ActionType
  target?: string
  source?: string
  exists?: boolean
  count?: number
  countOperator?: '==' | '>=' | '<='
}

export interface ConditionResult {
  passed: boolean
  description: string
}

export function checkActionCondition(
  params: ActionConditionParams,
  actions: GameAction[],
  description: string,
): ConditionResult {
  const matching = actions.filter((a) => {
    if (a.type !== params.actionType) return false
    if (params.target && a.target !== params.target) return false
    if (params.source && a.source !== params.source) return false
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
