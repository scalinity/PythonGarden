import type { FriendlyError } from '@/types/execution.ts'

const ARG_COUNT_RE =
  /TypeError: (\w+)\(\) takes (\d+) positional arguments? but (\d+) (?:was|were) given/
const NOT_CALLABLE_RE = /TypeError: '(\w+)' object is not callable/
const UNSUPPORTED_OP_RE =
  /TypeError: unsupported operand type\(s\) for (.+): '(\w+)' and '(\w+)'/

export function translateTypeError(
  error: string,
): FriendlyError | null {
  if (!error.includes('TypeError')) return null

  // Wrong argument count
  const argMatch = error.match(ARG_COUNT_RE)
  if (argMatch) {
    const [, fn, expected, given] = argMatch
    return {
      headline: 'Wrong number of arguments',
      explanation: `The function \`${fn}\` expects ${expected} arguments, but you gave it ${given}.`,
      suggestedAction: `Check the function signature and pass exactly ${expected} argument${expected === '1' ? '' : 's'}.`,
      rawError: error,
    }
  }

  // Not callable
  const callMatch = error.match(NOT_CALLABLE_RE)
  if (callMatch) {
    const typeName = callMatch[1]
    return {
      headline: 'Not callable',
      explanation: `\`${typeName}\` is not something you can call like a function.`,
      suggestedAction:
        'Remove the `()` or check that you are calling the right name.',
      rawError: error,
    }
  }

  // Unsupported operand
  const opMatch = error.match(UNSUPPORTED_OP_RE)
  if (opMatch) {
    const [, op, left, right] = opMatch
    return {
      headline: 'Type mismatch',
      explanation: `You can't use \`${op.trim()}\` between a ${left} and a ${right}. Try converting one of them.`,
      suggestedAction:
        `Convert one side so both types match (e.g. \`str()\` or \`int()\`).`,
      rawError: error,
    }
  }

  // Generic TypeError fallback
  return {
    headline: 'Type error',
    explanation: 'A value has the wrong type for the operation you tried.',
    suggestedAction: 'Check that you are using the right types for each operation.',
    rawError: error,
  }
}
