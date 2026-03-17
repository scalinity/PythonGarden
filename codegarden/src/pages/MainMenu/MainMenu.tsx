import { useNavigate } from 'react-router'

export function MainMenu() {
  const navigate = useNavigate()

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-8"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-black tracking-tight"
          style={{
            color: 'var(--color-accent)',
            textShadow: '0 0 40px var(--color-glow), 0 0 80px var(--color-glow)',
          }}
        >
          CodeGarden
        </h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Learn Python by restoring a living world
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/levels')}
          className="rounded-lg px-10 py-3 text-lg font-semibold transition-colors"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
          }}
        >
          Play
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="rounded-lg border px-10 py-3 text-lg transition-colors"
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
