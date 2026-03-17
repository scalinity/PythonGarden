import { useRef, useEffect } from 'react'
import type { WorldState } from '@/types/entities.ts'

export function useWorldSync(worldState: WorldState) {
  const prevRef = useRef<WorldState>(worldState)

  useEffect(() => {
    prevRef.current = worldState
  }, [worldState])

  return { worldState, prevWorldState: prevRef.current }
}
