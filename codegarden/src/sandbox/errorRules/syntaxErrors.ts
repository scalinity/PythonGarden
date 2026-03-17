import type { FriendlyError } from '@/types/execution.ts'

const MISSING_COLON_RE = /SyntaxError:.*expected ':'/i
const KEYWORD_LINE_RE = /^\s*(if|for|while|def|elif|else)\b/

const INDENT_RE = /IndentationError|unexpected indent/i
const PAREN_RE = /SyntaxError:.*(\(|was never closed)/i
const ASSIGN_VS_COMPARE_RE = /SyntaxError:.*invalid syntax/i

export function translateSyntaxError(
  error: string,
  code = '',
): FriendlyError | null {
  if (!(/SyntaxError|IndentationError/.test(error))) return null

  // Missing colon after keyword
  if (MISSING_COLON_RE.test(error)) {
    const keyword = detectKeyword(error, code)
    const kw = keyword ?? 'statement'
    return {
      headline: 'Missing `:`',
      explanation: `Don't forget the \`:\` at the end of your \`${kw}\` statement.`,
      suggestedAction: `Add a \`:\` at the end of the \`${kw}\` line.`,
      rawError: error,
    }
  }

  // Indentation error
  if (INDENT_RE.test(error)) {
    return {
      headline: 'Indentation problem',
      explanation:
        'This line is indented more than expected. Check that it lines up with the code around it.',
      suggestedAction:
        'Make sure each block of code is indented by the same amount (usually 4 spaces).',
      rawError: error,
    }
  }

  // Unmatched parentheses
  if (PAREN_RE.test(error)) {
    return {
      headline: 'Unmatched parentheses',
      explanation:
        'You have an opening `(` without a closing `)`. Check your parentheses match up.',
      suggestedAction: 'Count your opening and closing parentheses to make sure they pair up.',
      rawError: error,
    }
  }

  // = vs == confusion
  if (ASSIGN_VS_COMPARE_RE.test(error) && looksLikeComparisonMistake(code, error)) {
    return {
      headline: '`=` vs `==`',
      explanation:
        'Use `==` to compare values, and `=` to assign them.',
      suggestedAction:
        'If you meant to compare, change `=` to `==`. If you meant to assign, make sure this is not inside an `if` or `while` condition.',
      rawError: error,
    }
  }

  // Generic syntax error fallback
  return {
    headline: 'Syntax error',
    explanation: 'Python found something it doesn\'t understand in your code.',
    suggestedAction: 'Check for typos, missing colons, or mismatched brackets near the line mentioned.',
    rawError: error,
  }
}

function detectKeyword(error: string, code: string): string | null {
  const lineMatch = error.match(/line (\d+)/)
  if (lineMatch) {
    const lineNum = parseInt(lineMatch[1], 10)
    const lines = code.split('\n')
    const line = lines[lineNum - 1]
    if (line) {
      const kwMatch = line.match(KEYWORD_LINE_RE)
      if (kwMatch) return kwMatch[1]
    }
  }
  return null
}

function looksLikeComparisonMistake(code: string, error: string): boolean {
  const lineMatch = error.match(/line (\d+)/)
  if (!lineMatch) return false
  const lineNum = parseInt(lineMatch[1], 10)
  const lines = code.split('\n')
  const line = lines[lineNum - 1]
  if (!line) return false
  // Check if line has an `if`/`while` with single `=`
  return /\b(if|while)\b.*[^=!<>]=[^=]/.test(line)
}
