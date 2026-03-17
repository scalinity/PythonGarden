import * as THREE from 'three'
import { QuadraticBezierCurve3 } from 'three'
import type { Canopy } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

export function createCanopy(canopy: Canopy): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: canopy.id, entityType: 'canopies' }

  const controlY = canopy.isOpen ? 2.0 : 0.5
  const color = canopy.isOpen ? 0x34d399 : 0x8a8a8a
  const emissiveIntensity = canopy.isOpen ? 0.5 : 0.1

  const curve = new QuadraticBezierCurve3(
    new THREE.Vector3(-1.5, 0.2, 0),
    new THREE.Vector3(0, controlY, 0),
    new THREE.Vector3(1.5, 0.2, 0),
  )

  const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.05, 8, false)
  const tubeMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity,
  })
  const tube = new THREE.Mesh(tubeGeo, tubeMat)
  group.add(tube)

  // Label
  const label = createLabel(canopy.id)
  label.position.set(0, controlY + 0.5, 0)
  group.add(label)

  return group
}
