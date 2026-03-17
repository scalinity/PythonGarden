import * as THREE from 'three'

const GRID_X = 10
const GRID_Z = 5

export function createGrid(): THREE.Group {
  const group = new THREE.Group()

  // Dark ground plane
  const planeGeo = new THREE.PlaneGeometry(GRID_X, GRID_Z)
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0c })
  const plane = new THREE.Mesh(planeGeo, planeMat)
  plane.rotation.x = -Math.PI / 2
  plane.position.set(GRID_X / 2, -0.01, GRID_Z / 2)
  group.add(plane)

  // Grid lines
  const points: number[] = []

  // Vertical lines (along Z)
  for (let x = 0; x <= GRID_X; x++) {
    points.push(x, 0, 0, x, 0, GRID_Z)
  }

  // Horizontal lines (along X)
  for (let z = 0; z <= GRID_Z; z++) {
    points.push(0, 0, z, GRID_X, 0, z)
  }

  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(points, 3),
  )

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x1a1a1a,
    transparent: true,
    opacity: 0.6,
  })

  const lines = new THREE.LineSegments(lineGeo, lineMat)
  lines.position.y = 0.001
  group.add(lines)

  return group
}
