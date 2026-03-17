import { useEffect, useRef } from 'react'
import type { WorldState } from '@/types/entities.ts'
import { useGameStore } from '@store/useGameStore.ts'
import { createScene, type SceneContext } from './createScene.ts'
import { createGrid } from './createGrid.ts'
import { updateScene } from './updateScene.ts'
import { disposeObject } from './disposeScene.ts'

interface WorldViewProps {
  worldState: WorldState
  activeLine?: number
}

export function WorldView({ worldState, activeLine }: WorldViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<SceneContext | null>(null)
  const reducedMotion = useGameStore((s) => s.reducedMotion)

  // Init effect — set up scene, grid, ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = createScene(containerRef.current)
    ctxRef.current = ctx

    // Add grid
    const grid = createGrid()
    ctx.scene.add(grid)

    // ResizeObserver
    const ro = new ResizeObserver(() => ctx.resize())
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()

      // Dispose entity group children
      while (ctx.entityGroup.children.length > 0) {
        disposeObject(ctx.entityGroup.children[0])
        ctx.entityGroup.remove(ctx.entityGroup.children[0])
      }

      // Dispose grid
      disposeObject(grid)
      ctx.scene.remove(grid)

      ctx.dispose()
      ctxRef.current = null
    }
  }, [])

  // Reduced motion — toggle bloom
  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ctx.bloomPass.enabled = !reducedMotion && !prefersReduced
  }, [reducedMotion])

  // Update effect — rebuild entities and render
  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx) return

    updateScene(ctx.entityGroup, worldState, activeLine)
    ctx.render()
  }, [worldState, activeLine])

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ position: 'relative', background: 'var(--color-bg-primary)' }}
    />
  )
}
