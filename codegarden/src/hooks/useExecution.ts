import { useCallback, useRef, useState } from 'react'
import type { ExecutionStatus, ExecutionSpeed } from '@/types/execution.ts'
import type { GameAction } from '@/types/actions.ts'

interface UseExecutionConfig {
  speed: ExecutionSpeed
  worldState: unknown
  onActionApplied?: (action: GameAction) => void
  onLineChange?: (line: number) => void
  onComplete?: () => void
}

export function useExecution(config?: UseExecutionConfig) {
  const [status, setStatus] = useState<ExecutionStatus>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actionsRef = useRef<GameAction[]>([])
  const indexRef = useRef(0)

  const speedMs = (config?.speed ?? 1) === 1 ? 300 : config?.speed === 2 ? 150 : 75

  const drainActions = useCallback(() => {
    if (indexRef.current >= actionsRef.current.length) {
      setStatus('reviewing')
      config?.onComplete?.()
      return
    }

    const action = actionsRef.current[indexRef.current]
    config?.onActionApplied?.(action)
    if (action.sourceLine !== undefined) {
      config?.onLineChange?.(action.sourceLine)
    }
    indexRef.current++

    timerRef.current = setTimeout(drainActions, speedMs)
  }, [config, speedMs])

  const run = useCallback(
    (actions?: GameAction[]) => {
      if (actions) {
        actionsRef.current = actions
      }
      indexRef.current = 0
      setStatus('running')
      drainActions()
    },
    [drainActions],
  )

  const step = useCallback(() => {
    if (indexRef.current >= actionsRef.current.length) {
      setStatus('reviewing')
      config?.onComplete?.()
      return
    }
    setStatus('step_paused')
    const action = actionsRef.current[indexRef.current]
    config?.onActionApplied?.(action)
    if (action.sourceLine !== undefined) {
      config?.onLineChange?.(action.sourceLine)
    }
    indexRef.current++
  }, [config])

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    indexRef.current = 0
    actionsRef.current = []
    setStatus('idle')
  }, [])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    indexRef.current = 0
    actionsRef.current = []
    setStatus('idle')
  }, [])

  return { status, run, step, stop, reset }
}
