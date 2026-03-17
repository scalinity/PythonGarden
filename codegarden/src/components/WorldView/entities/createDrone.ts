import * as THREE from 'three'
import type { Drone } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

const DIRECTION_ANGLES: Record<string, number> = {
  north: 0,
  east: Math.PI / 2,
  south: Math.PI,
  west: (3 * Math.PI) / 2,
}

export function createDrone(drone: Drone): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: drone.id, entityType: 'drones' }

  // Rotate group by direction
  group.rotation.y = DIRECTION_ANGLES[drone.direction] ?? 0

  // Diamond body (cone rotated)
  const bodyGeo = new THREE.ConeGeometry(0.25, 0.5, 4)
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.y = 0.5
  group.add(body)

  // Propeller discs
  const propGeo = new THREE.CircleGeometry(0.18, 12)
  const propMat = new THREE.MeshStandardMaterial({
    color: 0x505050,
    emissive: 0x505050,
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide,
  })
  const propLeft = new THREE.Mesh(propGeo, propMat)
  propLeft.rotation.x = -Math.PI / 2
  propLeft.position.set(-0.3, 0.75, 0)
  group.add(propLeft)

  const propRight = new THREE.Mesh(propGeo, propMat.clone())
  propRight.rotation.x = -Math.PI / 2
  propRight.position.set(0.3, 0.75, 0)
  group.add(propRight)

  // Carrying cargo
  if (drone.carrying) {
    const cargoGeo = new THREE.BoxGeometry(0.15, 0.1, 0.15)
    const cargoMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x34d399,
      emissiveIntensity: 0.3,
    })
    const cargo = new THREE.Mesh(cargoGeo, cargoMat)
    cargo.position.y = 0.15
    group.add(cargo)
  }

  // Label — add to a wrapper so label doesn't rotate
  const labelWrapper = new THREE.Group()
  labelWrapper.rotation.y = -(DIRECTION_ANGLES[drone.direction] ?? 0)
  labelWrapper.add(createLabel(drone.id))
  group.add(labelWrapper)

  return group
}
