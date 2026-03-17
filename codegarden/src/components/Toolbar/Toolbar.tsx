import type { ExecutionStatus, ExecutionSpeed } from '@/types/execution.ts'

interface ToolbarProps {
  status: ExecutionStatus
  speed: ExecutionSpeed
  onRun: () => void
  onStep: () => void
  onStop: () => void
  onReset: () => void
  onSpeedChange: (speed: ExecutionSpeed) => void
  onToggleDebug: () => void
  debugOpen: boolean
  onToggleChat: () => void
  chatOpen: boolean
}

const STATUS_LABELS: Record<ExecutionStatus, string> = {
  idle: 'Ready',
  loading: 'Loading...',
  running: 'Running',
  stepping: 'Stepping',
  step_paused: 'Paused',
  reviewing: 'Reviewing',
  error: 'Error',
}

const STATUS_COLORS: Record<ExecutionStatus, string> = {
  idle: 'var(--color-text-secondary)',
  loading: 'var(--color-warning)',
  running: 'var(--color-success)',
  stepping: 'var(--color-accent)',
  step_paused: 'var(--color-warning)',
  reviewing: 'var(--color-accent)',
  error: 'var(--color-error)',
}

export function Toolbar({
  status,
  speed,
  onRun,
  onStep,
  onStop,
  onReset,
  onSpeedChange,
  onToggleDebug,
  debugOpen,
  onToggleChat,
  chatOpen,
}: ToolbarProps) {
  const isRunning = status === 'running' || status === 'stepping'
  const isIdle = status === 'idle' || status === 'error'

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5"
      style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Run */}
      <button
        onClick={onRun}
        disabled={isRunning}
        aria-label="Run code"
        title="Run code"
        className="rounded px-3 py-1 text-xs font-bold transition-opacity disabled:opacity-30"
        style={{
          background: 'var(--color-success)',
          color: 'var(--color-bg-primary)',
        }}
      >
        Run
      </button>

      {/* Step */}
      <button
        onClick={onStep}
        disabled={status !== 'step_paused'}
        aria-label="Step through code one action at a time"
        title="Step"
        className="rounded px-3 py-1 text-xs font-bold transition-opacity disabled:opacity-30"
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-bg-primary)',
        }}
      >
        Step
      </button>

      {/* Stop */}
      <button
        onClick={onStop}
        disabled={isIdle}
        aria-label="Stop execution"
        title="Stop"
        className="rounded px-3 py-1 text-xs font-bold transition-opacity disabled:opacity-30"
        style={{
          background: 'var(--color-error)',
          color: 'var(--color-bg-primary)',
        }}
      >
        Stop
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        aria-label="Reset code and world state"
        title="Reset"
        className="rounded px-3 py-1 text-xs font-bold"
        style={{
          background: 'var(--color-bg-panel)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
        }}
      >
        Reset
      </button>

      {/* Separator */}
      <div className="mx-1 h-4 w-px" style={{ background: 'var(--color-border)' }} />

      {/* Speed selector */}
      <div className="flex items-center gap-1" role="group" aria-label="Execution speed">
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Speed:
        </span>
        {([1, 2, 4] as ExecutionSpeed[]).map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            aria-label={`Speed ${s}x`}
            aria-pressed={speed === s}
            className="rounded px-2 py-0.5 text-xs font-mono transition-colors"
            style={{
              background: speed === s ? 'var(--color-accent-dim)' : 'transparent',
              color: speed === s ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              border: speed === s ? '1px solid var(--color-accent)' : '1px solid transparent',
            }}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="mx-1 h-4 w-px" style={{ background: 'var(--color-border)' }} />

      {/* Debug toggle */}
      <button
        onClick={onToggleDebug}
        aria-label={debugOpen ? 'Hide debug panel' : 'Show debug panel'}
        aria-pressed={debugOpen}
        className="rounded px-2 py-0.5 text-xs transition-colors"
        style={{
          background: debugOpen ? 'var(--color-accent-dim)' : 'transparent',
          color: debugOpen ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        }}
      >
        Debug
      </button>

      {/* Chat toggle */}
      <button
        onClick={onToggleChat}
        aria-label={chatOpen ? 'Hide AI chat' : 'Show AI chat'}
        aria-pressed={chatOpen}
        className="rounded px-2 py-0.5 text-xs transition-colors"
        style={{
          background: chatOpen ? 'var(--color-accent-dim)' : 'transparent',
          color: chatOpen ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        }}
      >
        Chat
      </button>

      {/* Status */}
      <div className="ml-auto flex items-center gap-1.5" role="status" aria-live="polite">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: STATUS_COLORS[status] }}
          aria-hidden="true"
        />
        <span className="text-xs" style={{ color: STATUS_COLORS[status] }}>
          {STATUS_LABELS[status]}
        </span>
      </div>
    </div>
  )
}
