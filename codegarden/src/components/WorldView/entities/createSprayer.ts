import * as THREE from 'three'
import type { Sprayer } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

export function createSprayer(sprayer: Sprayer): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: sprayer.id, entityType: 'sprayers' }

  // Glowing sphere body
  const bodyGeo = new THREE.SphereGeometry(0.2, 12, 12)
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.7,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.y = 0.35
  group.add(body)

  // Cone nozzle
  const nozzleGeo = new THREE.ConeGeometry(0.1, 0.2, 8)
  const nozzleMat = new THREE.MeshStandardMaterial({
    color: 0x505050,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.2,
  })
  const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat)
  nozzle.position.set(0, 0.15, 0.2)
  nozzle.rotation.x = Math.PI / 2
  group.add(nozzle)

  // Label
  group.add(createLabel(sprayer.id))

  return group
}
