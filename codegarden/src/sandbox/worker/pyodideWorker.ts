/// <reference lib="webworker" />

import type { WorkerInMessage, WorkerOutMessage } from './workerProtocol.ts'
import {
  BOOTSTRAP_SAFE_GLOBALS,
  BOOTSTRAP_STUBS,
  BOOTSTRAP_TRACE,
  BOOTSTRAP_EXECUTE,
} from './bootstrapPython.ts'

declare const self: DedicatedWorkerGlobalScope

interface PyodideInterface {
  runPython(code: string): unknown
  globals: {
    get(name: string): unknown
    set(name: string, value: unknown): void
  }
}

let pyodide: PyodideInterface | null = null
let interruptBuffer: SharedArrayBuffer | null = null
let interruptView: Int32Array | null = null
let bootstrapped = false

function post(msg: WorkerOutMessage): void {
  self.postMessage(msg)
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
async function handleInit(): Promise<void> {
  try {
    const { loadPyodide } = await import('pyodide');
    pyodide = await loadPyodide({
      indexURL: '/assets/pyodide/',
    })
    post({ type: 'ready' })
  } catch (err) {
    post({
      type: 'execution-error',
      error: {
        headline: 'Failed to load Python engine',
        explanation: String(err),
        suggestedAction: 'Try refreshing the page.',
        rawError: String(err),
      },
    })
  }
}

// ---------------------------------------------------------------------------
// Bootstrap the Python environment (runs once)
// ---------------------------------------------------------------------------
function ensureBootstrapped(): void {
  if (bootstrapped || !pyodide) return
  pyodide.runPython(BOOTSTRAP_SAFE_GLOBALS)
  pyodide.runPython(BOOTSTRAP_STUBS)
  pyodide.runPython(BOOTSTRAP_TRACE)
  pyodide.runPython(BOOTSTRAP_EXECUTE)
  bootstrapped = true
}

// ---------------------------------------------------------------------------
// Execute
// ---------------------------------------------------------------------------
function handleExecute(code: string, globalsJson: string, stepMode: boolean): void {
  if (!pyodide) {
    post({
      type: 'execution-error',
      error: {
        headline: 'Python not ready',
        explanation: 'The Python engine has not finished loading yet.',
        suggestedAction: 'Wait a moment and try again.',
        rawError: 'Pyodide not initialized',
      },
    })
    return
  }

  ensureBootstrapped()
  post({ type: 'execution-start' })

  try {
    // Pass the interrupt buffer view to Python
    if (interruptView) {
      pyodide.globals.set('_interrupt_view_js', interruptView)
    } else {
      pyodide.globals.set('_interrupt_view_js', null)
    }

    // Escape the code and descriptors for Python string embedding
    const escapedCode = JSON.stringify(code)
    const escapedGlobals = JSON.stringify(globalsJson)
    const stepFlag = stepMode ? 'True' : 'False'

    const resultJson = pyodide.runPython(
      `_execute_user_code(${escapedCode}, ${escapedGlobals}, ${stepFlag}, _interrupt_view_js)`
    ) as string

    const result = JSON.parse(resultJson)
    post({ type: 'execution-complete', result })
  } catch (err) {
    post({
      type: 'execution-error',
      error: {
        headline: 'Execution failed',
        explanation: String(err),
        suggestedAction: 'Check your code for errors.',
        rawError: String(err),
      },
    })
  }
}

// ---------------------------------------------------------------------------
// Reset
// ---------------------------------------------------------------------------
function handleReset(): void {
  bootstrapped = false
  interruptBuffer = null
  interruptView = null
}

// ---------------------------------------------------------------------------
// Message handler
// ---------------------------------------------------------------------------
self.onmessage = (e: MessageEvent<WorkerInMessage>) => {
  const msg = e.data

  switch (msg.type) {
    case 'init':
      void handleInit()
      break

    case 'execute':
      interruptBuffer = msg.interruptBuffer
      interruptView = new Int32Array(interruptBuffer)
      // Reset interrupt flags
      Atomics.store(interruptView, 0, 0) // cancel flag
      Atomics.store(interruptView, 1, 1) // step lock: 1 = running
      handleExecute(
        msg.code,
        JSON.stringify(msg.globals),
        false, // step mode determined by caller; worker checks buffer
      )
      break

    case 'step-next':
      if (interruptView) {
        Atomics.store(interruptView, 1, 1)
        Atomics.notify(interruptView, 1)
      }
      break

    case 'cancel':
      if (interruptView) {
        Atomics.store(interruptView, 0, 1)
      }
      break

    case 'reset':
      handleReset()
      break
  }
}
