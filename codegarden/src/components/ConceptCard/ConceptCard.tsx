import type { ConceptCard as ConceptCardType } from '@/types/execution.ts'
import { highlightPython } from '@/utils/highlightPython.ts'

interface ConceptCardProps {
  concept: ConceptCardType
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
        style={{ background: 'var(--color-bg-secondary)', fontFamily: 'var(--font-code)' }}
        dangerouslySetInnerHTML={{ __html: highlightPython(concept.pythonExample) }}
      />
    </div>
  )
}
