import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'

export interface SceneContext {
  renderer: THREE.WebGLRenderer
  labelRenderer: CSS2DRenderer
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  composer: EffectComposer
  bloomPass: UnrealBloomPass
  entityGroup: THREE.Group
  render: () => void
  resize: () => void
  dispose: () => void
}

// Scene bounds in view-space (computed from 10x5 grid projected through the isometric camera)
// Grid X maps directly to view horizontal; grid Z is compressed by the camera angle.
// With camera at (5,7,9) looking at (5,0,2.5):
//   View horizontal span: ~12 units (grid 0-10 + 1 padding each side)
//   View vertical span:   ~6 units  (grid depth compressed by angle + entity heights)
const SCENE_WIDTH = 12
const SCENE_HEIGHT = 6
const PADDING = 1.15 // 15% breathing room

export function createScene(container: HTMLDivElement): SceneContext {
  const w = container.clientWidth || 300
  const h = container.clientHeight || 150

  // WebGL renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x0c0c0c)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  // CSS2D label renderer
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(w, h)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0'
  labelRenderer.domElement.style.left = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  container.appendChild(labelRenderer.domElement)

  // Orthographic camera — ~47° isometric tilt for visible 3D depth
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
  camera.position.set(5, 7, 9)
  camera.lookAt(5, 0, 2.5)

  // Scene
  const scene = new THREE.Scene()

  // Lighting — dim ambient so emissive glow is prominent
  scene.add(new THREE.AmbientLight(0x1a1a1a, 0.4))

  const directional = new THREE.DirectionalLight(0x8a8a8a, 0.3)
  directional.position.set(5, 10, 5)
  scene.add(directional)

  scene.add(new THREE.HemisphereLight(0x0c0c0c, 0xf59e0b, 0.15))

  // Entity group
  const entityGroup = new THREE.Group()
  scene.add(entityGroup)

  // Post-processing — bloom
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    0.8,  // strength
    0.4,  // radius
    0.85, // threshold
  )
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  function fitCamera(aspect: number) {
    // Fit the scene bounds into the viewport, constrained by whichever
    // dimension is tighter, so the scene always fills at least one axis.
    const frustumByWidth = (SCENE_WIDTH * PADDING) / aspect
    const frustumByHeight = SCENE_HEIGHT * PADDING
    const frustumH = Math.max(frustumByWidth, frustumByHeight)
    const frustumW = frustumH * aspect

    camera.left = -frustumW / 2
    camera.right = frustumW / 2
    camera.top = frustumH / 2
    camera.bottom = -frustumH / 2
    camera.updateProjectionMatrix()
  }

  // Initial fit
  fitCamera(w / h)

  function render() {
    composer.render()
    labelRenderer.render(scene, camera)
  }

  function resize() {
    const cw = container.clientWidth
    const ch = container.clientHeight
    if (cw === 0 || ch === 0) return

    fitCamera(cw / ch)

    renderer.setSize(cw, ch)
    labelRenderer.setSize(cw, ch)
    bloomPass.resolution.set(cw, ch)
    composer.setSize(cw, ch)

    render()
  }

  function dispose() {
    composer.dispose()
    renderer.dispose()
    if (renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
    if (labelRenderer.domElement.parentElement) {
      labelRenderer.domElement.parentElement.removeChild(labelRenderer.domElement)
    }
  }

  return { renderer, labelRenderer, scene, camera, composer, bloomPass, entityGroup, render, resize, dispose }
}
