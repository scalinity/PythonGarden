import { useEffect, useRef } from 'react'
import { useGameStore } from '@store/useGameStore.ts'
import { levels } from '@data/levels/index.ts'
import { registerLevels, loadLevel } from '@engine/levels/LevelManager.ts'

export function useLevelLoader(levelId: string | undefined) {
  const loadLevelAction = useGameStore((s) => s.loadLevel)
  const setStarterCode = useGameStore((s) => s.setStarterCode)
  const savedCode = useGameStore((s) => s.savedCode)
  const clearExecution = useGameStore((s) => s.clearExecution)
  const registered = useRef(false)

  useEffect(() => {
    if (!registered.current) {
      registerLevels(levels)
      registered.current = true
    }
  }, [])

  useEffect(() => {
    if (!levelId) return

    const def = loadLevel(levelId)
    if (!def) return

    clearExecution()
    loadLevelAction(def)

    const saved = savedCode[levelId]
    setStarterCode(saved ?? def.starterCode)
  }, [levelId, loadLevelAction, setStarterCode, savedCode, clearExecution])
}
