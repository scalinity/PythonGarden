import * as THREE from 'three'
import type { Reservoir } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

const TANK_HEIGHT = 1.2
const TANK_RADIUS = 0.3

export function createReservoir(reservoir: Reservoir): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: reservoir.id, entityType: 'reservoirs' }

  // Translucent shell
  const shellGeo = new THREE.CylinderGeometry(TANK_RADIUS, TANK_RADIUS, TANK_HEIGHT, 16, 1, true)
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  })
  const shell = new THREE.Mesh(shellGeo, shellMat)
  shell.position.y = TANK_HEIGHT / 2
  group.add(shell)

  // Cap bands (top & bottom rings)
  const capGeo = new THREE.RingGeometry(TANK_RADIUS - 0.02, TANK_RADIUS + 0.02, 16)
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x505050,
    side: THREE.DoubleSide,
  })
  const topCap = new THREE.Mesh(capGeo, capMat)
  topCap.rotation.x = -Math.PI / 2
  topCap.position.y = TANK_HEIGHT
  group.add(topCap)

  const bottomCap = new THREE.Mesh(capGeo.clone(), capMat.clone())
  bottomCap.rotation.x = -Math.PI / 2
  bottomCap.position.y = 0.01
  group.add(bottomCap)

  // Inner water fill
  const fill = Math.max(0, Math.min(1, reservoir.level / reservoir.maxLevel))
  if (fill > 0) {
    const fillHeight = TANK_HEIGHT * fill
    const waterGeo = new THREE.CylinderGeometry(
      TANK_RADIUS - 0.03,
      TANK_RADIUS - 0.03,
      fillHeight,
      16,
    )
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    })
    const water = new THREE.Mesh(waterGeo, waterMat)
    water.position.y = fillHeight / 2
    group.add(water)
  }

  // Label
  group.add(createLabel(reservoir.id))

  return group
}
