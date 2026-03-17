import { useState } from 'react'
import type { HintTier } from '@/types/level.ts'

interface HintPanelProps {
  hints: HintTier
  failedRuns: number
  onHintUsed?: (tier: number) => void
}

export function HintPanel({ hints, failedRuns, onHintUsed }: HintPanelProps) {
  const [revealedTier, setRevealedTier] = useState(0)
  const [open, setOpen] = useState(false)

  const unlocked = failedRuns >= 3

  const reveal = () => {
    if (revealedTier < 3) {
      const next = revealedTier + 1
      setRevealedTier(next)
      onHintUsed?.(next)
    }
  }

  const tiers = [
    { label: 'Direction', content: hints.direction },
    { label: 'Concept Nudge', content: hints.conceptNudge },
    { label: 'Solution Hint', content: hints.structuralHelp },
  ]

  return (
    <div
      className="rounded"
      style={{
        background: 'var(--color-bg-panel)',
        border: '1px solid var(--color-border)',
      }}
    >
      <button
        onClick={() => {
          if (unlocked) {
            setOpen(!open)
            if (!open && revealedTier === 0) reveal()
          }
        }}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold"
        style={{
          color: unlocked ? 'var(--color-warning)' : 'var(--color-text-secondary)',
        }}
      >
        <span>Hints</span>
        <span>
          {!unlocked
            ? `(available after ${3 - failedRuns} more attempt${3 - failedRuns === 1 ? '' : 's'})`
            : open
              ? '\u25B2'
              : '\u25BC'}
        </span>
      </button>

      {open && unlocked && (
        <div className="space-y-2 px-3 pb-3">
          {tiers.map((tier, i) =>
            i < revealedTier ? (
              <div key={i}>
                <div
                  className="text-xs font-semibold"
                  style={{ color: 'var(--color-warning)' }}
                >
                  {tier.label}
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--color-text-primary)' }}>
                  {i === 2 ? (
                    <pre
                      className="overflow-x-auto rounded p-2 text-xs"
                      style={{
                        background: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {tier.content}
                    </pre>
                  ) : (
                    tier.content
                  )}
                </div>
              </div>
            ) : null,
          )}

          {revealedTier < 3 && (
            <button
              onClick={reveal}
              className="text-xs underline"
              style={{ color: 'var(--color-accent)' }}
            >
              Show more help
            </button>
          )}
        </div>
      )}
    </div>
  )
}
