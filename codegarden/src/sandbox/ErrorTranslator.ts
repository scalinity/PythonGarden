import type { FriendlyError } from '@/types/execution.ts'
import { translateNameError } from './errorRules/nameErrors.ts'
import { translateSyntaxError } from './errorRules/syntaxErrors.ts'
import { translateTypeError } from './errorRules/typeErrors.ts'
import { translateRuntimeError } from './errorRules/runtimeErrors.ts'
import { translateLoopError } from './errorRules/loopErrors.ts'

type ErrorRule = (error: string, code: string) => FriendlyError | null

const rules: ErrorRule[] = [
  translateNameError,
  translateSyntaxError,
  translateTypeError,
  translateRuntimeError,
  translateLoopError,
]

export function translate(
  error: Error | string,
  code: string,
): FriendlyError {
  const message = typeof error === 'string' ? error : error.message

  for (const rule of rules) {
    const result = rule(message, code)
    if (result) return result
  }

  return {
    headline: 'Something went wrong',
    explanation:
      'An unexpected error occurred while running your code.',
    suggestedAction:
      'Double-check your code for typos or try a different approach.',
    rawError: message,
  }
}
