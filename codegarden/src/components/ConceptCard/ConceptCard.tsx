import type { ConceptCard as ConceptCardType } from '@/types/execution.ts'

interface ConceptCardProps {
  concept: ConceptCardType
}

const PYTHON_KEYWORDS = [
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

function highlightPython(code: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Highlight strings
  html = html.replace(
    /(["'])(?:(?=(\\?))\2.)*?\1/g,
    '<span style="color: var(--color-success)">$&</span>',
  )

  // Highlight comments
  html = html.replace(
    /#.*/g,
    '<span style="color: var(--color-text-secondary)">$&</span>',
  )

  // Highlight keywords
  for (const kw of PYTHON_KEYWORDS) {
    html = html.replace(
      new RegExp(`\\b(${kw})\\b`, 'g'),
      '<span style="color: var(--color-accent); font-weight: bold">$1</span>',
    )
  }

  // Highlight numbers
  html = html.replace(
    /\b(\d+)\b/g,
    '<span style="color: var(--color-warning)">$1</span>',
  )

  return html
}

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <div
      className="rounded p-3"
      style={{
        background: 'var(--color-bg-panel)',
        borderLeft: '3px solid var(--color-accent)',
      }}
    >
      <h3 className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
        {concept.name}
      </h3>
      <p className="mt-1 text-xs" style={{ color: 'var(--color-text-primary)' }}>
        {concept.explanation}
      </p>
      <pre
        className="mt-2 overflow-x-auto rounded p-2 text-xs"
        style={{ background: 'var(--color-bg-secondary)' }}
        dangerouslySetInnerHTML={{ __html: highlightPython(concept.pythonExample) }}
      />
    </div>
  )
}
