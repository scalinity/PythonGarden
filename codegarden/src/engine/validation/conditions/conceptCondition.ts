interface ConceptConditionParams {
  concept: string
}

export interface ConditionResult {
  passed: boolean
  description: string
}

const conceptPatterns: Record<string, RegExp> = {
  for_loop: /for\s+\w+\s+in\s+/,
  while_loop: /while\s+.+:/,
  if_statement: /if\s+.+:/,
  function_def: /def\s+\w+\s*\(/,
  variable_assignment: /\w+\s*=\s*[^=]/,
  dictionary: /\{[^}]*:[^}]*\}/,
}

export function checkConceptCondition(
  params: ConceptConditionParams,
  code: string,
  description: string,
): ConditionResult {
  const pattern = conceptPatterns[params.concept]
  if (!pattern) {
    return { passed: false, description: `Unknown concept: ${params.concept}` }
  }

  return {
    passed: pattern.test(code),
    description,
  }
}
