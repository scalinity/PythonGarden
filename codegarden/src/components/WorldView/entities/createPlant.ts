import * as THREE from 'three'
import type { Plant } from '@/types/entities.ts'
import { createLabel } from './createLabel.ts'

const tmpLow = new THREE.Color(0xc83232)
const tmpHigh = new THREE.Color(0x34d399)
const tmpResult = new THREE.Color()

export function createPlant(plant: Plant, active: boolean): THREE.Group {
  const group = new THREE.Group()
  group.userData = { entityId: plant.id, entityType: 'plants' }

  const healthRatio = Math.max(0, Math.min(1, plant.health / 100))
  tmpResult.copy(tmpLow).lerp(tmpHigh, healthRatio)

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.4, 6)
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x2d6a4f,
    emissive: 0x2d6a4f,
    emissiveIntensity: 0.15,
  })
  const stem = new THREE.Mesh(stemGeo, stemMat)
  stem.position.y = 0.2
  group.add(stem)

  // Icosahedron body
  const bodyGeo = new THREE.IcosahedronGeometry(0.35, 1)
  const bodyMat = new THREE.MeshStandardMaterial({
    color: tmpResult.clone(),
    emissive: tmpResult.clone(),
    emissiveIntensity: 0.4 + healthRatio * 0.4,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.y = 0.6
  group.add(body)

  // Moisture bar background
  const barBgGeo = new THREE.BoxGeometry(0.6, 0.04, 0.08)
  const barBgMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  const barBg = new THREE.Mesh(barBgGeo, barBgMat)
  barBg.position.set(0, 0.02, 0.5)
  group.add(barBg)

  // Moisture bar fill
  const moistureFill = Math.max(0, Math.min(1, plant.moisture / 100))
  if (moistureFill > 0) {
    const barFillGeo = new THREE.BoxGeometry(0.6 * moistureFill, 0.045, 0.082)
    const barFillMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
    })
    const barFill = new THREE.Mesh(barFillGeo, barFillMat)
    barFill.position.set((0.6 * moistureFill - 0.6) / 2, 0.02, 0.5)
    group.add(barFill)
  }

  // Ripe indicator
  if (plant.ripe) {
    const ripeGeo = new THREE.SphereGeometry(0.08, 8, 8)
    const ripeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
    })
    const ripe = new THREE.Mesh(ripeGeo, ripeMat)
    ripe.position.set(0.25, 0.85, 0)
    group.add(ripe)
  }

  // Active ring
  if (active) {
    const ringGeo = new THREE.RingGeometry(0.45, 0.52, 32)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.6,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.01
    group.add(ring)
  }

  // Label
  group.add(createLabel(plant.name || plant.id))

  return group
}
