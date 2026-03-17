import { useState } from 'react'

export function usePyodide() {
  const [isReady] = useState(false)
  const [error] = useState<string | null>(null)

  const execute = async (_code: string): Promise<void> => {
    // Placeholder: will be wired to PyodideManager
    console.warn('Pyodide not yet initialized')
  }

  const cancel = () => {
    // Placeholder
  }

  return { isReady, execute, cancel, error }
}
