import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '@store/useGameStore.ts'
import { PyodideManager } from '@sandbox/PyodideManager.ts'
import { SimulationEngine } from '@engine/simulation/SimulationEngine.ts'
import { ExecutionController } from '@engine/runtime/ExecutionController.ts'
import { buildGameObjectDescriptors } from '@sandbox/SafeGlobalsBuilder.ts'
import { scanCode } from '@sandbox/codeScan.ts'
import { validate } from '@engine/validation/Validator.ts'
import { getNextLevel } from '@engine/levels/LevelManager.ts'
import type { ExecutionResult } from '@/types/execution.ts'

export function useExecutionController() {
  const pyodide = useRef<PyodideManager | null>(null)
  const simulation = useRef<SimulationEngine | null>(null)
  const controller = useRef<ExecutionController | null>(null)
  const ready = useRef(false)

  const levelDefinition = useGameStore((s) => s.levelDefinition)
  const worldState = useGameStore((s) => s.worldState)
  const code = useGameStore((s) => s.code)
  const speed = useGameStore((s) => s.speed)

  const setStatus = useGameStore((s) => s.setStatus)
  const setCurrentLine = useGameStore((s) => s.setCurrentLine)
  const addActions = useGameStore((s) => s.addActions)
  const addTraceEntryWithLine = useGameStore((s) => s.addTraceEntryWithLine)
  const setVariables = useGameStore((s) => s.setVariables)
  const addError = useGameStore((s) => s.addError)
  const addLog = useGameStore((s) => s.addLog)
  const clearExecution = useGameStore((s) => s.clearExecution)
  const updateWorldState = useGameStore((s) => s.updateWorldState)
  const completeLevel = useGameStore((s) => s.completeLevel)
  const saveCode = useGameStore((s) => s.saveCode)
  const setValidationResult = useGameStore((s) => s.setValidationResult)

  // Initialize Pyodide + Simulation on mount
  useEffect(() => {
    const pm = new PyodideManager()
    const sim = new SimulationEngine()
    pyodide.current = pm
    simulation.current = sim

    pm.onTrace = (entry) => {
      addTraceEntryWithLine(entry)
    }
    pm.onActions = (actions) => addActions(actions)
    pm.onLog = (msg) => addLog(msg)
    pm.onStepPaused = (line, vars) => {
      setCurrentLine(line)
      setVariables(vars)
    }

    pm.init().then(() => {
      ready.current = true
    }).catch((err) => {
      console.error('Pyodide init failed:', err)
    })

    return () => {
      pm.destroy()
    }
    // One-time setup only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load level into simulation when it changes
  useEffect(() => {
    if (!levelDefinition || !simulation.current) return
    simulation.current.loadLevel(levelDefinition)
  }, [levelDefinition])

  // Sync speed
  useEffect(() => {
    controller.current?.setSpeed(speed)
  }, [speed])

  const run = useCallback(async () => {
    if (!pyodide.current || !simulation.current || !levelDefinition || !worldState) return
    if (!ready.current) return

    // Capture code at run time to avoid stale closure in onComplete
    const executedCode = code

    // Pre-execution security scan
    const scan = scanCode(executedCode)
    if (!scan.safe) {
      addError({
        headline: 'Blocked code',
        explanation: scan.violations.join('\n'),
        suggestedAction: 'Remove the blocked constructs and try again.',
        rawError: scan.violations.join('; '),
      })
      setStatus('error')
      return
    }

    clearExecution()
    simulation.current.loadLevel(levelDefinition)

    const ctrl = new ExecutionController(
      simulation.current,
      {
        execute: (c: string) => {
          const descriptors = buildGameObjectDescriptors(levelDefinition, worldState)
          return pyodide.current!.execute(c, descriptors)
        },
        cancel: () => pyodide.current!.cancel(),
      },
      {
        onStatusChange: setStatus,
        onActionApplied: (result) => {
          if (simulation.current) {
            updateWorldState(simulation.current.getWorldState())
          }
          if (!result.success && result.error) {
            addError({
              headline: 'Action failed',
              explanation: result.error,
              suggestedAction: 'Check the action parameters.',
              rawError: result.error,
            })
          }
        },
        onComplete: (result: ExecutionResult) => {
          if (!simulation.current || !levelDefinition) return
          const finalWorld = simulation.current.getWorldState()
          updateWorldState(finalWorld)
          setVariables(result.variables)

          if (!result.error) {
            const validation = validate(levelDefinition, finalWorld, result.actions, executedCode)
            setValidationResult(validation)
            if (validation.passed) {
              const next = getNextLevel(levelDefinition.id)
              completeLevel(levelDefinition.id, next)
            }
          }
        },
        onError: (msg) => {
          addError({
            headline: 'Error',
            explanation: msg,
            suggestedAction: 'Check your code and try again.',
            rawError: msg,
          })
        },
      },
    )

    ctrl.setSpeed(speed)
    controller.current = ctrl
    saveCode(levelDefinition.id, executedCode)

    await ctrl.run(executedCode)
  }, [
    levelDefinition, worldState, code, speed,
    clearExecution, setStatus, updateWorldState, addError,
    setVariables, completeLevel, saveCode, setValidationResult,
  ])

  const stop = useCallback(() => {
    controller.current?.stop()
  }, [])

  const reset = useCallback(() => {
    controller.current?.reset()
    clearExecution()
    if (levelDefinition && simulation.current) {
      simulation.current.loadLevel(levelDefinition)
      updateWorldState(simulation.current.getWorldState())
    }
  }, [levelDefinition, clearExecution, updateWorldState])

  const step = useCallback(async () => {
    controller.current?.step()
  }, [])

  return { run, stop, reset, step }
}
