import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useGameStore } from '@store/useGameStore.ts'
import { AppShell } from '@components/AppShell/AppShell.tsx'
import { WorldView } from '@components/WorldView/WorldView.tsx'
import { CodeEditor } from '@components/CodeEditor/CodeEditor.tsx'
import { MissionPanel } from '@components/MissionPanel/MissionPanel.tsx'
import { DebugPanel } from '@components/DebugPanel/DebugPanel.tsx'
import { Toolbar } from '@components/Toolbar/Toolbar.tsx'
import { HintPanel } from '@components/HintPanel/HintPanel.tsx'
import { SuccessOverlay } from '@components/SuccessOverlay/SuccessOverlay.tsx'
import { useLevelLoader } from '@hooks/useLevelLoader.ts'
import { useExecutionController } from '@hooks/useExecutionController.ts'
import { useAccessibility } from '@hooks/useAccessibility.ts'
import { getNextLevel } from '@engine/levels/LevelManager.ts'

export function GameView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useAccessibility()
  useLevelLoader(id)
  const { run, stop, step } = useExecutionController()

  const levelDefinition = useGameStore((s) => s.levelDefinition)
  const worldState = useGameStore((s) => s.worldState)
  const code = useGameStore((s) => s.code)
  const setCode = useGameStore((s) => s.setCode)
  const status = useGameStore((s) => s.status)
  const speed = useGameStore((s) => s.speed)
  const setSpeed = useGameStore((s) => s.setSpeed)
  const currentLine = useGameStore((s) => s.currentLine)
  const actionQueue = useGameStore((s) => s.actionQueue)
  const traceEntries = useGameStore((s) => s.traceEntries)
  const variables = useGameStore((s) => s.variables)
  const errors = useGameStore((s) => s.errors)
  const debugPanelOpen = useGameStore((s) => s.debugPanelOpen)
  const togglePanel = useGameStore((s) => s.togglePanel)
  const hintsUsed = useGameStore((s) => s.hintsUsed)
  const recordHint = useGameStore((s) => s.useHint)
  const resetCode = useGameStore((s) => s.resetCode)
  const resetWorld = useGameStore((s) => s.resetWorld)
  const clearExecution = useGameStore((s) => s.clearExecution)
  const validationResult = useGameStore((s) => s.validationResult)

  const latestError = errors.length > 0 ? errors[errors.length - 1] : undefined
  const failedRuns = levelDefinition ? (hintsUsed[levelDefinition.id] ?? 0) : 0

  const [overlayDismissed, setOverlayDismissed] = useState(false)
  const showOverlay = validationResult !== null && !overlayDismissed

  const nextLevelId = levelDefinition ? getNextLevel(levelDefinition.id) : undefined

  const conditionResults = useMemo(() => {
    if (!validationResult) return undefined
    const map: Record<number, boolean> = {}
    validationResult.results.forEach((r, i) => { map[i] = r.passed })
    return map
  }, [validationResult])

  const handleReset = () => {
    clearExecution()
    resetWorld()
    resetCode()
    setOverlayDismissed(false)
  }

  if (!levelDefinition || !worldState) {
    return (
      <div
        className="flex h-screen w-screen flex-col items-center justify-center"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <p className="mb-4 text-lg" style={{ color: 'var(--color-error)' }}>
          Level not found
        </p>
        <button
          onClick={() => navigate('/levels')}
          className="text-sm underline"
          style={{ color: 'var(--color-accent)' }}
        >
          Back to Level Select
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <AppShell
        debugOpen={debugPanelOpen}
        worldView={
          <WorldView
            worldState={worldState}
            activeLine={currentLine ?? undefined}
          />
        }
        missionPanel={
          <div className="flex flex-col gap-3">
            <MissionPanel level={levelDefinition} conditionResults={conditionResults} />
            <div className="px-3 pb-3">
              <HintPanel
                key={levelDefinition.id}
                hints={levelDefinition.hints}
                failedRuns={failedRuns}
                onHintUsed={() => recordHint(levelDefinition.id)}
              />
            </div>
          </div>
        }
        editor={
          <CodeEditor
            code={code}
            onChange={setCode}
            currentLine={currentLine ?? undefined}
            errors={
              latestError?.highlightLine
                ? [{ line: latestError.highlightLine, message: latestError.headline }]
                : undefined
            }
          />
        }
        toolbar={
          <Toolbar
            status={status}
            speed={speed}
            onRun={run}
            onStep={step}
            onStop={stop}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            onToggleDebug={() => togglePanel('debug')}
            debugOpen={debugPanelOpen}
          />
        }
        debugPanel={
          <DebugPanel
            traceEntries={traceEntries}
            variables={variables}
            actions={actionQueue}
            error={latestError}
          />
        }
      />

      {showOverlay && validationResult && (
        <SuccessOverlay
          result={validationResult}
          hasNextLevel={!!nextLevelId}
          onNextLevel={nextLevelId ? () => navigate(`/play/${nextLevelId}`) : undefined}
          onReplay={() => {
            setOverlayDismissed(true)
            handleReset()
          }}
          onClose={() => setOverlayDismissed(true)}
        />
      )}
    </div>
  )
}
