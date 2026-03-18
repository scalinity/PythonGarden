import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

export function createLabel(text: string): CSS2DObject {
  const div = document.createElement('div')
  div.textContent = text
  div.style.fontSize = '10px'
  div.style.color = 'var(--color-text-secondary)'
  div.style.fontFamily = 'var(--font-display)'
  div.style.textShadow = '0 0 3px var(--color-bg-primary), 0 0 6px var(--color-bg-primary)'
  div.style.pointerEvents = 'none'
  div.style.whiteSpace = 'nowrap'

  const label = new CSS2DObject(div)
  label.position.set(0, 1.1, 0)
  return label
}
