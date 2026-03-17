import { useEffect, useRef, useCallback } from 'react'
import type { ValidationResult } from '@engine/validation/Validator.ts'

interface SuccessOverlayProps {
  result: ValidationResult
  onNextLevel?: () => void
  onReplay?: () => void
  onClose: () => void
  hasNextLevel: boolean
}

export function SuccessOverlay({
  result,
  onNextLevel,
  onReplay,
  onClose,
  hasNextLevel,
}: SuccessOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus trap: keep focus inside the dialog
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const dialog = dialogRef.current
    if (!dialog) return
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    // Auto-focus the first button
    const dialog = dialogRef.current
    if (dialog) {
      const first = dialog.querySelector<HTMLElement>('button')
      first?.focus()
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label={result.passed ? 'Level complete' : 'Level results'}
    >
      <div ref={dialogRef} className="w-full max-w-sm mx-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-panel)] shadow-2xl">
        <div className="px-5 py-4 text-center border-b border-[var(--color-border)]">
          <h2
            className={`text-2xl font-bold ${
              result.passed ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'
            }`}
          >
            {result.passed ? 'Level Complete!' : 'Not Quite...'}
          </h2>
        </div>

        <div className="px-5 py-4 space-y-2">
          {result.results.map((cond, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-xs
                  ${cond.passed
                    ? 'bg-[var(--color-success)] text-[var(--color-bg-primary)]'
                    : 'bg-[var(--color-error)] text-[var(--color-bg-primary)]'
                  }`}
                aria-hidden="true"
              >
                {cond.passed ? '\u2713' : '\u2717'}
              </span>
              <span className="text-[var(--color-text-primary)]">{cond.description}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-[var(--color-border)]">
          {result.passed && hasNextLevel && onNextLevel && (
            <button
              onClick={onNextLevel}
              className="flex-1 px-3 py-2 text-sm font-semibold rounded
                         bg-[var(--color-success)] text-[var(--color-bg-primary)]
                         hover:brightness-110 transition-all cursor-pointer"
            >
              Next Level
            </button>
          )}
          {onReplay && (
            <button
              onClick={onReplay}
              className="flex-1 px-3 py-2 text-sm rounded
                         bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]
                         border border-[var(--color-border)]
                         hover:bg-[var(--color-bg-panel)] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm rounded
                       text-[var(--color-text-secondary)]
                       hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
