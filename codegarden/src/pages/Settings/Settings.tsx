import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useGameStore } from '@store/useGameStore.ts'
import { useAccessibility } from '@hooks/useAccessibility.ts'

export function Settings() {
  const navigate = useNavigate()
  useAccessibility()

  const theme = useGameStore((s) => s.theme)
  const fontSize = useGameStore((s) => s.fontSize)
  const reducedMotion = useGameStore((s) => s.reducedMotion)
  const dyslexiaFont = useGameStore((s) => s.dyslexiaFont)
  const setTheme = useGameStore((s) => s.setTheme)
  const setFontSize = useGameStore((s) => s.setFontSize)
  const setReducedMotion = useGameStore((s) => s.setReducedMotion)
  const setDyslexiaFont = useGameStore((s) => s.setDyslexiaFont)
  const resetProgress = useGameStore((s) => s.resetProgress)

  const [showResetConfirm, setShowResetConfirm] = useState(false)

  return (
    <div
      className="flex h-full flex-col items-center overflow-y-auto py-10"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        &larr; Back to Menu
      </button>

      <h1
        className="mb-8 text-3xl font-bold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Settings
      </h1>

      <div className="flex w-full max-w-md flex-col gap-6 px-6">
        {/* Theme toggle */}
        <div>
          <label
            className="mb-2 block text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Theme
          </label>
          <div className="flex gap-2">
            {(['default', 'high-contrast'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="rounded px-4 py-2 text-sm transition-colors"
                style={{
                  background:
                    theme === t ? 'var(--color-accent-dim)' : 'var(--color-bg-panel)',
                  color:
                    theme === t ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  border:
                    theme === t
                      ? '1px solid var(--color-accent)'
                      : '1px solid var(--color-border)',
                }}
              >
                {t === 'default' ? 'Default' : 'High Contrast'}
              </button>
            ))}
          </div>
        </div>

        {/* Font size slider */}
        <div>
          <label
            className="mb-2 block text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min={12}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Reduced motion */}
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
            Reduced Motion
          </span>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            role="switch"
            aria-checked={reducedMotion}
            className="rounded px-4 py-1 text-sm"
            style={{
              background: reducedMotion
                ? 'var(--color-accent-dim)'
                : 'var(--color-bg-panel)',
              color: reducedMotion
                ? 'var(--color-accent)'
                : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            {reducedMotion ? 'On' : 'Off'}
          </button>
        </div>

        {/* Dyslexia font */}
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
            Dyslexia-Friendly Font
          </span>
          <button
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
            role="switch"
            aria-checked={dyslexiaFont}
            className="rounded px-4 py-1 text-sm"
            style={{
              background: dyslexiaFont
                ? 'var(--color-accent-dim)'
                : 'var(--color-bg-panel)',
              color: dyslexiaFont
                ? 'var(--color-accent)'
                : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            {dyslexiaFont ? 'On' : 'Off'}
          </button>
        </div>

        {/* Reset progress */}
        <div
          className="mt-4 border-t pt-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="rounded px-4 py-2 text-sm font-semibold"
              style={{
                background: 'var(--color-bg-panel)',
                color: 'var(--color-error)',
                border: '1px solid var(--color-error)',
              }}
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: 'var(--color-error)' }}>
                Are you sure?
              </span>
              <button
                onClick={() => {
                  resetProgress()
                  setShowResetConfirm(false)
                }}
                className="rounded px-3 py-1 text-sm font-bold"
                style={{ background: 'var(--color-error)', color: '#fff' }}
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
