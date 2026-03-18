import * as THREE from 'three'
import type { Sprinkler } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

export function createSprinkler(sprinkler: Sprinkler): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: sprinkler.id, entityType: 'sprinklers' }

  const isOn = sprinkler.isOn
  const baseColor = isOn ? 0x38bdf8 : 0x444444
  const emissiveIntensity = isOn ? 0.7 : 0.1

  // Base box
  const baseGeo = new THREE.BoxGeometry(0.5, 0.3, 0.5)
  const baseMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    emissive: baseColor,
    emissiveIntensity,
  })
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.position.y = 0.15
  group.add(base)

  // Nozzle
  const nozzleGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.2, 8)
  const nozzleMat = new THREE.MeshStandardMaterial({
    color: 0x505050,
    emissive: isOn ? 0x38bdf8 : 0x000000,
    emissiveIntensity: isOn ? 0.3 : 0,
  })
  const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat)
  nozzle.position.y = 0.4
  group.add(nozzle)

  // Glow halo when on
  if (isOn) {
    const haloGeo = new THREE.RingGeometry(0.35, 0.55, 32)
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.rotation.x = -Math.PI / 2
    halo.position.y = 0.01
    group.add(halo)
  }

  // Label
  group.add(createLabel(sprinkler.id))

  return group
}
