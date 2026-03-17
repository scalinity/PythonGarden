import * as THREE from 'three'
import type { WorldState } from '@/types/entities.ts'
import { disposeGroup } from './disposeScene.ts'
import {
  createPlant,
  createSprinkler,
  createDrone,
  createReservoir,
  createCanopy,
  createPump,
  createSprayer,
} from './entities/index.ts'

export function updateScene(
  entityGroup: THREE.Group,
  worldState: WorldState,
  activeLine?: number,
): void {
  // Clear previous entities
  disposeGroup(entityGroup)

  const highlightPlants = activeLine !== undefined && activeLine > 0

  // Sprinklers
  for (const s of worldState.sprinklers ?? []) {
    const obj = createSprinkler(s)
    obj.position.set(s.position.x, 0, s.position.y)
    entityGroup.add(obj)
  }

  // Plants
  for (const p of worldState.plants ?? []) {
    const obj = createPlant(p, highlightPlants)
    obj.position.set(p.position.x, 0, p.position.y)
    entityGroup.add(obj)
  }

  // Drones
  for (const d of worldState.drones ?? []) {
    const obj = createDrone(d)
    obj.position.set(d.position.x, 0, d.position.y)
    entityGroup.add(obj)
  }

  // Reservoirs — fixed position (2, 0, 2)
  for (const r of worldState.reservoirs ?? []) {
    const obj = createReservoir(r)
    obj.position.set(2, 0, 2)
    entityGroup.add(obj)
  }

  // Canopies — fixed position (5, 0, 0)
  for (const c of worldState.canopies ?? []) {
    const obj = createCanopy(c)
    obj.position.set(5, 0, 0)
    entityGroup.add(obj)
  }

  // Pumps — fixed position (4, 0, 2)
  for (const p of worldState.pumps ?? []) {
    const obj = createPump(p)
    obj.position.set(4, 0, 2)
    entityGroup.add(obj)
  }

  // Sprayers
  for (const s of worldState.sprayers ?? []) {
    const obj = createSprayer(s)
    obj.position.set(s.position.x, 0, s.position.y)
    entityGroup.add(obj)
  }
}
