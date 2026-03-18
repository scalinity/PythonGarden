export const PYTHON_KEYWORDS = [
  'def',
  'if',
  'else',
  'elif',
  'for',
  'while',
  'return',
  'import',
  'from',
  'in',
  'not',
  'and',
  'or',
  'True',
  'False',
  'None',
  'print',
]

// Single-pass tokenizer: matches tokens in priority order so keywords/numbers
// inside strings or comments are never double-highlighted.
const TOKEN_REGEX = new RegExp(
  `(["'])(?:(?=(\\\\?))\\2.)*?\\1` +            // string literals (group 1,2)
  `|#[^\\n]*` +                                   // comments to end of line
  `|\\b(${PYTHON_KEYWORDS.join('|')})\\b` +      // keywords (group 3)
  `|\\b(\\d+)\\b` +                              // numbers (group 4)
  `|[\\s\\S]`,                                    // catch-all: any other char
  'g',
)

export function highlightPython(code: string): string {
  if (!code) return ''

  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  TOKEN_REGEX.lastIndex = 0
  return escaped.replace(TOKEN_REGEX, (match, strQuote, _esc, keyword, number) => {
    if (strQuote) {
      return `<span style="color: var(--color-success)">${match}</span>`
    }
    if (match.startsWith('#')) {
      return `<span style="color: var(--color-text-secondary)">${match}</span>`
    }
    if (keyword) {
      return `<span style="color: var(--color-accent); font-weight: bold">${match}</span>`
    }
    if (number) {
      return `<span style="color: var(--color-warning)">${match}</span>`
    }
    return match
  })
}
