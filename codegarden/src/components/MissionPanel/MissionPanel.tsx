import type { LevelDefinition, AvailableObject, SuccessCondition } from '@/types/level.ts'
import { concepts } from '@data/concepts/concepts.ts'
import { highlightPython } from '@/utils/highlightPython.ts'

interface MissionPanelProps {
  level: LevelDefinition
  conditionResults?: Record<number, boolean>
}

function ObjectCard({ obj }: { obj: AvailableObject }) {
  return (
    <div
      className="mb-2 rounded p-2"
      style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
    >
      <div className="mb-1 text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
        {obj.name}
        <span className="ml-1 font-normal" style={{ color: 'var(--color-text-secondary)' }}>
          ({obj.type})
        </span>
      </div>
      {obj.methods.map((m) => (
        <div key={m.name} className="ml-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <code style={{ color: 'var(--color-text-primary)' }}>{m.signature}</code>
          <span className="ml-1">- {m.description}</span>
        </div>
      ))}
    </div>
  )
}

function ConditionRow({
  condition,
  passed,
}: {
  condition: SuccessCondition
  passed?: boolean
}) {
  return (
    <div className="flex items-center gap-2 py-0.5 text-xs">
      <span aria-label={passed === undefined ? 'Not yet checked' : passed ? 'Passed' : 'Failed'}>
        {passed === undefined ? '?' : passed ? '\u2713' : '\u2717'}
      </span>
      <span
        style={{
          color: passed
            ? 'var(--color-success)'
            : passed === false
              ? 'var(--color-error)'
              : 'var(--color-text-secondary)',
        }}
      >
        {condition.description}
      </span>
    </div>
  )
}

function renderMissionText(text: string) {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded px-1 py-0.5 text-xs"
          style={{
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-code)',
          }}
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function MissionPanel({ level, conditionResults }: MissionPanelProps) {
  const conceptCard = concepts.find((c) => c.id === level.conceptCardId)
  if (import.meta.env.DEV && level.conceptCardId && !conceptCard) {
    console.warn(`MissionPanel: conceptCardId "${level.conceptCardId}" not found in concepts`)
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4" style={{ background: 'var(--color-bg-panel)' }}>
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--color-accent-dim)' }}>
          {level.biome.replace(/_/g, ' ')}
        </div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {level.title}
        </h2>
      </div>

      {/* Concept card — shown above mission for teach-first approach */}
      {conceptCard && (
        <div
          className="rounded p-2"
          style={{
            background: 'var(--color-bg-secondary)',
            borderLeft: '3px solid var(--color-accent)',
          }}
        >
          <div className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
            {conceptCard.name}
          </div>
          <p className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {conceptCard.explanation}
          </p>
          <pre
            className="mt-2 overflow-x-auto rounded p-2 text-xs"
            style={{ background: 'var(--color-bg-panel)', fontFamily: 'var(--font-code)' }}
            dangerouslySetInnerHTML={{ __html: highlightPython(conceptCard.pythonExample) }}
          />
        </div>
      )}

      {/* Mission */}
      <div>
        <h3 className="mb-1 text-[11px] font-medium uppercase" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em' }}>
          Mission
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-primary)', whiteSpace: 'pre-line' }}>
          {renderMissionText(level.missionText)}
        </p>
      </div>

      {/* Available objects */}
      <div>
        <h3 className="mb-1 text-[11px] font-medium uppercase" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em' }}>
          Objects
        </h3>
        {level.availableObjects.map((obj) => (
          <ObjectCard key={obj.name} obj={obj} />
        ))}
      </div>

      {/* Success criteria */}
      <div>
        <h3 className="mb-1 text-[11px] font-medium uppercase" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.1em' }}>
          Goals
        </h3>
        {level.successConditions.map((cond, i) => (
          <ConditionRow
            key={i}
            condition={cond}
            passed={conditionResults?.[i]}
          />
        ))}
      </div>
    </div>
  )
}
