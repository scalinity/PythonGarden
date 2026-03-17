import * as THREE from 'three'
import type { Pump } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

export function createPump(pump: Pump): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: pump.id, entityType: 'pumps' }

  // Core cylinder
  const coreGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 12)
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a8a,
    metalness: 0.6,
    roughness: 0.4,
  })
  const core = new THREE.Mesh(coreGeo, coreMat)
  core.position.y = 0.2
  group.add(core)

  // 6 gear teeth
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6
    const toothGeo = new THREE.BoxGeometry(0.08, 0.12, 0.08)
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0x8a8a8a,
      metalness: 0.5,
      roughness: 0.5,
    })
    const tooth = new THREE.Mesh(toothGeo, toothMat)
    tooth.position.set(
      Math.cos(angle) * 0.28,
      0.2,
      Math.sin(angle) * 0.28,
    )
    group.add(tooth)
  }

  // Hub sphere
  const hubGeo = new THREE.SphereGeometry(0.1, 12, 12)
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
  })
  const hub = new THREE.Mesh(hubGeo, hubMat)
  hub.position.y = 0.42
  group.add(hub)

  // Label
  group.add(createLabel(pump.id))

  return group
}
