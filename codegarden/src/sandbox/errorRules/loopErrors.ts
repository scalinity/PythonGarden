import type { FriendlyError } from '@/types/execution.ts'

export function translateLoopError(
  error: string,
  code = '',
): FriendlyError | null {
  if (!error.includes('InstructionBudgetExceeded')) return null

  const hasWhile = /\bwhile\b/.test(code)
  const hasRecursion = detectPossibleRecursion(code)

  if (hasWhile) {
    return {
      headline: 'Code ran too long',
      explanation:
        "Your code ran for too long! This usually means a `while` loop isn't stopping. Make sure the condition in your `while` loop eventually becomes False.",
      suggestedAction:
        'Check that something inside your `while` loop changes the condition so it eventually stops.',
      rawError: error,
    }
  }

  if (hasRecursion) {
    return {
      headline: 'Code ran too long',
      explanation:
        "Your code ran for too long! It looks like a function might be calling itself forever (infinite recursion).",
      suggestedAction:
        'Make sure your recursive function has a base case that stops the recursion.',
      rawError: error,
    }
  }

  return {
    headline: 'Code ran too long',
    explanation:
      'Your code ran for too long! Check for any loops or repeated actions that might not be stopping.',
    suggestedAction:
      'Look for loops that might run forever and add a stopping condition.',
    rawError: error,
  }
}

function detectPossibleRecursion(code: string): boolean {
  const defMatch = code.match(/def\s+(\w+)\s*\(/)
  if (!defMatch) return false
  const fnName = defMatch[1]
  // Check if the function name appears again inside the body
  const bodyStart = code.indexOf(defMatch[0]) + defMatch[0].length
  return code.slice(bodyStart).includes(fnName + '(')
}
