interface ConceptConditionParams {
  concept: string
}

import type { ConditionResult } from '../Validator.ts'

const conceptPatterns: Record<string, RegExp> = {
  for_loop: /for\s+\w+\s+in\s+/,
  while_loop: /while\s+.+?:/,
  if_statement: /\bif\s+.+?:/,
  function_def: /def\s+\w+\s*\(/,
  variable_assignment: /\w+\s*=\s*(?!=)/,
  dictionary: /\{(?:[^}:]*:)[^}]*\}/,
  dictionary_usage: /\w+\[.+?\]/,
  return_statement: /\breturn\b/,
  list_append: /\.append\(/,
  dict_items: /\.items\(\)/,
  boolean_operator: /\b(and|or)\b/,
  elif_statement: /\belif\s+.+?:/,
  range_call: /\brange\s*\(/,
  break_statement: /\bbreak\b/,
  continue_statement: /\bcontinue\b/,
  f_string: /f["']/,
  string_method: /\.(upper|lower|strip|split|join|replace|startswith|endswith)\s*\(/,
  type_conversion: /\b(int|float|str)\s*\([^)]/,
  enumerate_call: /\benumerate\s*\(/,
  zip_call: /\bzip\s*\(/,
  list_slice: /\w+\[(?:[^[\]:]*:)[^[\]]*\]/,
  list_comprehension: /\[.+\bfor\b\s+\w+\s+\bin\b/,
  nested_dict_access: /\w+\[.+?\]\[.+?\]/,
  sorted_key: /\bsorted\s*\([^)]*key\s*=/,
  aggregation: /\b(min|max|sum)\s*\(/,
  default_param: /\bdef\s+\w+\s*\([^)]*=\s*[^,)]+/,
  tuple_unpack: /\w+\s*,\s*\w+\s*=\s/,
  modulo_operator: /\w+\s*%\s*\w+/,
  in_membership: /\bif\b.*\s+in\s+/,
  not_in: /\bnot\s+in\b/,
}

function stripComments(code: string): string {
  return code.replace(/#.*$/gm, '')
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
    passed: pattern.test(stripComments(code)),
    description,
  }
}
