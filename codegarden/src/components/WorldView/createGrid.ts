import * as THREE from 'three'

// Playable area
const GRID_X = 10
const GRID_Z = 5

// Extended ground covers the full camera frustum so the viewport is never empty
const EXTEND = 20

export function createGrid(): THREE.Group {
  const group = new THREE.Group()

  // Large ground plane fills the viewport
  const planeSize = GRID_X + EXTEND * 2
  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x101010 })
  const plane = new THREE.Mesh(planeGeo, planeMat)
  plane.rotation.x = -Math.PI / 2
  plane.position.set(GRID_X / 2, -0.02, GRID_Z / 2)
  group.add(plane)

  // Extended grid lines — dim, covering the full ground
  const bgPoints: number[] = []
  for (let x = -EXTEND; x <= GRID_X + EXTEND; x++) {
    bgPoints.push(x, 0, -EXTEND, x, 0, GRID_Z + EXTEND)
  }
  for (let z = -EXTEND; z <= GRID_Z + EXTEND; z++) {
    bgPoints.push(-EXTEND, 0, z, GRID_X + EXTEND, 0, z)
  }
  const bgLineGeo = new THREE.BufferGeometry()
  bgLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(bgPoints, 3))
  const bgLines = new THREE.LineSegments(bgLineGeo, new THREE.LineBasicMaterial({
    color: 0x1c1c1c,
    transparent: true,
    opacity: 0.5,
  }))
  bgLines.position.y = -0.01
  group.add(bgLines)

  // Playable area grid lines — slightly brighter
  const fgPoints: number[] = []
  for (let x = 0; x <= GRID_X; x++) {
    fgPoints.push(x, 0, 0, x, 0, GRID_Z)
  }
  for (let z = 0; z <= GRID_Z; z++) {
    fgPoints.push(0, 0, z, GRID_X, 0, z)
  }
  const fgLineGeo = new THREE.BufferGeometry()
  fgLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(fgPoints, 3))
  const fgLines = new THREE.LineSegments(fgLineGeo, new THREE.LineBasicMaterial({
    color: 0x282828,
    transparent: true,
    opacity: 0.8,
  }))
  fgLines.position.y = 0.001
  group.add(fgLines)

  return group
}
