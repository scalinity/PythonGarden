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

const ENTITY_SCALE = 1.5

function addEntity(group: THREE.Group, obj: THREE.Group, x: number, y: number, z: number) {
  obj.scale.setScalar(ENTITY_SCALE)
  obj.position.set(x, y, z)
  group.add(obj)
}

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
    addEntity(entityGroup, createSprinkler(s), s.position.x, 0, s.position.y)
  }

  // Plants
  for (const p of worldState.plants ?? []) {
    addEntity(entityGroup, createPlant(p, highlightPlants), p.position.x, 0, p.position.y)
  }

  // Drones
  for (const d of worldState.drones ?? []) {
    addEntity(entityGroup, createDrone(d), d.position.x, 0, d.position.y)
  }

  // Reservoirs — fixed position (2, 0, 2)
  for (const r of worldState.reservoirs ?? []) {
    addEntity(entityGroup, createReservoir(r), 2, 0, 2)
  }

  // Canopies — fixed position (5, 0, 0)
  for (const c of worldState.canopies ?? []) {
    addEntity(entityGroup, createCanopy(c), 5, 0, 0)
  }

  // Pumps — fixed position (4, 0, 2)
  for (const p of worldState.pumps ?? []) {
    addEntity(entityGroup, createPump(p), 4, 0, 2)
  }

  // Sprayers
  for (const s of worldState.sprayers ?? []) {
    addEntity(entityGroup, createSprayer(s), s.position.x, 0, s.position.y)
  }
}
