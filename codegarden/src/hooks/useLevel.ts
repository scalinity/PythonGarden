import { useCallback } from 'react'
import { useGameStore } from '@store/useGameStore.ts'
import { levels } from '@data/levels/index.ts'
import type { LevelDefinition } from '@/types/level.ts'

export function useLevel() {
  const loadLevel = useGameStore((s) => s.loadLevel)
  const setStarterCode = useGameStore((s) => s.setStarterCode)
  const clearExecution = useGameStore((s) => s.clearExecution)
  const currentLevelId = useGameStore((s) => s.currentLevelId)
  const savedCode = useGameStore((s) => s.savedCode)

  const startLevel = useCallback(
    (levelId: string) => {
      const def = levels.find((l) => l.id === levelId)
      if (!def) return
      clearExecution()
      loadLevel(def)
      const saved = savedCode[levelId]
      setStarterCode(saved ?? def.starterCode)
    },
    [clearExecution, loadLevel, savedCode, setStarterCode],
  )

  const getNextLevelId = useCallback((): string | undefined => {
    if (!currentLevelId) return undefined
    const idx = levels.findIndex((l) => l.id === currentLevelId)
    if (idx === -1 || idx >= levels.length - 1) return undefined
    return levels[idx + 1].id
  }, [currentLevelId])

  const getAllLevels = useCallback((): LevelDefinition[] => levels, [])

  return { startLevel, getNextLevelId, getAllLevels, currentLevelId }
}
