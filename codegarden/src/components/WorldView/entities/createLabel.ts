import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

export function createLabel(text: string): CSS2DObject {
  const div = document.createElement('div')
  div.textContent = text
  div.style.fontSize = '10px'
  div.style.color = '#8a8a8a'
  div.style.fontFamily = "var(--font-display)"
  div.style.textShadow = '0 0 3px #0c0c0c, 0 0 6px #0c0c0c'
  div.style.pointerEvents = 'none'
  div.style.whiteSpace = 'nowrap'

  const label = new CSS2DObject(div)
  label.position.set(0, 1.1, 0)
  return label
}
