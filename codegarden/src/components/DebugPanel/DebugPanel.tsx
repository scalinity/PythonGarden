import { useState } from 'react'
import type { TraceEntry, VariableSnapshot, FriendlyError } from '@/types/execution.ts'
import type { GameAction } from '@/types/actions.ts'

interface DebugPanelProps {
  traceEntries: TraceEntry[]
  variables: VariableSnapshot[]
  actions: GameAction[]
  error?: FriendlyError
}

type TabId = 'variables' | 'events' | 'errors'

const ACTION_ICONS: Record<string, string> = {
  water_plant: '\uD83D\uDCA7',
  sprinkler_on: '\u26A1',
  sprinkler_off: '\u23F9',
  spray: '\uD83D\uDCA8',
  drone_move_to: '\u2708',
  drone_harvest: '\uD83C\uDF3E',
  drone_pollinate: '\uD83C\uDF3C',
  pump_transfer: '\u2699',
  canopy_open: '\u2600',
  canopy_close: '\uD83C\uDF19',
  feed_plant: '\uD83C\uDF31',
  store_item: '\uD83D\uDCE6',
  store_in_bin: '\uD83D\uDCE5',
  log: '\uD83D\uDCDD',
  highlight: '\u2728',
}

export function DebugPanel({ traceEntries, variables, actions, error }: DebugPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('variables')
  const [showRawError, setShowRawError] = useState(false)

  const latestVars =
    traceEntries.length > 0
      ? traceEntries[traceEntries.length - 1].variables
      : variables

  const tabs: { id: TabId; label: string }[] = [
    { id: 'variables', label: 'Variables' },
    { id: 'events', label: 'Event Log' },
    { id: 'errors', label: 'Errors' },
  ]

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--color-bg-panel)' }}>
      {/* Tab bar */}
      <div className="flex gap-1 border-b px-2 pt-1" style={{ borderColor: 'var(--color-border)' }} role="tablist" aria-label="Debug panel tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className="rounded-t px-3 py-1 text-xs font-semibold transition-colors"
            style={{
              background:
                activeTab === tab.id ? 'var(--color-bg-secondary)' : 'transparent',
              color:
                activeTab === tab.id
                  ? 'var(--color-accent)'
                  : 'var(--color-text-secondary)',
              borderBottom:
                activeTab === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
            }}
          >
            {tab.label}
            {tab.id === 'errors' && error && (
              <span
                className="ml-1 inline-block h-2 w-2 rounded-full"
                style={{ background: 'var(--color-error)' }}
                aria-label="Has errors"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-2" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'variables' && (
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: 'var(--color-text-secondary)' }}>
                <th className="pb-1 text-left">Name</th>
                <th className="pb-1 text-left">Value</th>
                <th className="pb-1 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {latestVars.map((v, i) => (
                <tr key={i} style={{ color: 'var(--color-text-primary)' }}>
                  <td className="py-0.5 font-mono" style={{ color: 'var(--color-accent)' }}>
                    {v.name}
                  </td>
                  <td className="py-0.5 font-mono">{v.value}</td>
                  <td className="py-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {v.type}
                  </td>
                </tr>
              ))}
              {latestVars.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ color: 'var(--color-text-secondary)' }}>
                    No variables yet. Run your code to see them here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'events' && (
          <div className="space-y-1">
            {actions.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded px-2 py-1 text-xs"
                style={{ background: 'var(--color-bg-secondary)' }}
              >
                <span>{ACTION_ICONS[a.type] ?? '?'}</span>
                <span style={{ color: 'var(--color-accent)' }}>{a.type}</span>
                {a.target && (
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    target: {a.target}
                  </span>
                )}
                {a.amount !== undefined && (
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    amount: {a.amount}
                  </span>
                )}
                <span className="ml-auto" style={{ color: 'var(--color-text-secondary)' }}>
                  L{a.sourceLine}
                </span>
              </div>
            ))}
            {actions.length === 0 && (
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                No events yet. Run your code to see the action log.
              </div>
            )}
          </div>
        )}

        {activeTab === 'errors' && (
          <div>
            {error ? (
              <div
                className="rounded p-3"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderLeft: '3px solid var(--color-error)',
                }}
              >
                <div className="text-sm font-bold" style={{ color: 'var(--color-error)' }}>
                  {error.headline}
                </div>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-primary)' }}>
                  {error.explanation}
                </p>
                <p className="mt-2 text-xs" style={{ color: 'var(--color-success)' }}>
                  Suggestion: {error.suggestedAction}
                </p>
                <button
                  onClick={() => setShowRawError(!showRawError)}
                  className="mt-2 text-xs underline"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {showRawError ? 'Hide raw error' : 'Show raw error'}
                </button>
                {showRawError && (
                  <pre
                    className="mt-1 overflow-x-auto rounded p-2 text-xs"
                    style={{
                      background: 'var(--color-bg-primary)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {error.rawError}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                No errors. Your code is running clean!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
