import type { LevelDefinition } from '@/types/level.ts'

let levelRegistry: LevelDefinition[] = []

export function registerLevels(levels: LevelDefinition[]): void {
  levelRegistry = [...levels].sort((a, b) => a.order - b.order)
}

export function loadLevel(id: string): LevelDefinition | undefined {
  return levelRegistry.find((l) => l.id === id)
}

export function getAllLevels(): LevelDefinition[] {
  return [...levelRegistry]
}

export function getNextLevel(currentId: string): string | undefined {
  const idx = levelRegistry.findIndex((l) => l.id === currentId)
  if (idx === -1 || idx >= levelRegistry.length - 1) return undefined
  return levelRegistry[idx + 1].id
}

export function getLevelCount(): number {
  return levelRegistry.length
}
