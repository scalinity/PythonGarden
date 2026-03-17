import { useNavigate } from 'react-router'
import { useGameStore } from '@store/useGameStore.ts'
import { levels } from '@data/levels/index.ts'

const BIOME_COLORS: Record<string, string> = {
  silent_greenhouse: '#22d3ee',
  thirst_fields: '#fbbf24',
  pollinator_ridge: '#34d399',
  root_network: '#a78bfa',
  archive_canopy: '#f472b6',
  memory_marsh: '#818cf8',
}

export function LevelSelect() {
  const navigate = useNavigate()
  const completedLevels = useGameStore((s) => s.completedLevels)
  const unlockedLevels = useGameStore((s) => s.unlockedLevels)

  const isUnlocked = (id: string) =>
    id === levels[0]?.id || unlockedLevels.includes(id) || completedLevels.includes(id)

  const isCompleted = (id: string) => completedLevels.includes(id)
  const isNext = (id: string) => isUnlocked(id) && !isCompleted(id)

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
        Select a Level
      </h1>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => {
          const unlocked = isUnlocked(level.id)
          const completed = isCompleted(level.id)
          const next = isNext(level.id)
          const biomeColor = BIOME_COLORS[level.biome] ?? 'var(--color-accent)'

          return (
            <button
              key={level.id}
              disabled={!unlocked}
              onClick={() => navigate(`/play/${level.id}`)}
              className="rounded-lg p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: 'var(--color-bg-panel)',
                border: next
                  ? '2px solid var(--color-accent)'
                  : completed
                    ? '1px solid var(--color-success)'
                    : '1px solid var(--color-border)',
                boxShadow: next ? '0 0 12px var(--color-glow)' : 'none',
              }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: biomeColor }}>
                  {String(level.order).padStart(2, '0')}
                </span>
                {completed && (
                  <span style={{ color: 'var(--color-success)' }} aria-label="Completed">{'\u2713'}</span>
                )}
                {!unlocked && (
                  <span style={{ color: 'var(--color-text-secondary)' }} aria-label="Locked">{'\uD83D\uDD12'}</span>
                )}
              </div>
              <h3
                className="text-sm font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {level.title}
              </h3>
              <div
                className="mt-1 text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {level.biome.replace(/_/g, ' ')}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {level.concepts.map((c) => (
                  <span
                    key={c}
                    className="rounded px-1.5 py-0.5 text-xs"
                    style={{
                      background: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
