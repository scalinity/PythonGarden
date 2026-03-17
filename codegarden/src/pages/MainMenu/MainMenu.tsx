import { useNavigate } from 'react-router'

export function MainMenu() {
  const navigate = useNavigate()

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-12"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="text-center">
        <h1
          className="text-5xl tracking-tight"
          style={{
            color: 'var(--color-accent)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          CodeGarden
        </h1>
        <p
          className="mt-3 text-base"
          style={{
            color: 'var(--color-text-secondary)',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          Learn Python by restoring a living world
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/levels')}
          className="rounded px-10 py-3 text-lg font-semibold transition-colors"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
          }}
        >
          Play
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="rounded border px-10 py-3 text-lg transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Settings
        </button>
      </div>
    </div>
  )
}
