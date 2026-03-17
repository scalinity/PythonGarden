import { useEffect } from 'react'
import { useGameStore } from '@store/useGameStore.ts'

export function useAccessibility() {
  const theme = useGameStore((s) => s.theme)
  const fontSize = useGameStore((s) => s.fontSize)
  const reducedMotion = useGameStore((s) => s.reducedMotion)
  const dyslexiaFont = useGameStore((s) => s.dyslexiaFont)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('theme-high-contrast', theme === 'high-contrast')
    root.classList.toggle('font-dyslexia', dyslexiaFont)
    root.classList.toggle('reduced-motion', reducedMotion)
    root.style.setProperty('--font-size-base', `${fontSize}px`)
  }, [theme, fontSize, reducedMotion, dyslexiaFont])

  return { theme, fontSize, reducedMotion, dyslexiaFont }
}
