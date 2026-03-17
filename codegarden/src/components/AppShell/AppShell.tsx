import type { ReactNode } from 'react'

interface AppShellProps {
  worldView: ReactNode
  missionPanel: ReactNode
  editor: ReactNode
  toolbar: ReactNode
  debugPanel: ReactNode
  debugOpen: boolean
}

export function AppShell({
  worldView,
  missionPanel,
  editor,
  toolbar,
  debugPanel,
  debugOpen,
}: AppShellProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Top: World View */}
      <div className="flex-none" style={{ height: '40%' }}>
        {worldView}
      </div>

      {/* Bottom: Panels */}
      <div className="flex min-h-0 flex-1">
        {/* Left: Mission Panel */}
        <div
          className="flex-none overflow-y-auto"
          style={{
            width: '30%',
            borderRight: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {missionPanel}
        </div>

        {/* Right: Toolbar + Editor */}
        <div
          className="flex min-h-0 flex-1 flex-col"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {toolbar}
          <div className="min-h-0 flex-1" style={{ background: '#161616' }}>{editor}</div>
        </div>
      </div>

      {/* Bottom: Debug Panel (collapsible) */}
      {debugOpen && (
        <div
          className="flex-none overflow-y-auto"
          style={{
            height: '25%',
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-bg-panel)',
          }}
        >
          {debugPanel}
        </div>
      )}
    </div>
  )
}
