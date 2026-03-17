import type { LevelDefinition, AvailableObject, AvailableMethod } from '@/types/level.ts'
import type { WorldState, Plant, Sprinkler, Drone, Reservoir, Storage, Canopy, Pump, Sprayer } from '@/types/entities.ts'

export interface GameObjectDescriptor {
  name: string
  type: string
  id?: string
  properties: Record<string, unknown>
  methods: AvailableMethod[]
}

function plantDescriptor(plant: Plant, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: plant.name,
    type: 'plant',
    id: plant.id,
    properties: {
      moisture: plant.moisture,
      health: plant.health,
      ripe: plant.ripe,
      needsPollination: plant.needsPollination,
      species: plant.species,
      row: plant.row,
    },
    methods,
  }
}

function sprinklerDescriptor(s: Sprinkler, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: s.id,
    type: 'sprinkler',
    id: s.id,
    properties: { isOn: s.isOn, x: s.position.x, y: s.position.y },
    methods,
  }
}

function droneDescriptor(d: Drone, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: d.id,
    type: 'drone',
    id: d.id,
    properties: { carrying: d.carrying, direction: d.direction, x: d.position.x, y: d.position.y },
    methods,
  }
}

function reservoirDescriptor(r: Reservoir, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: r.id,
    type: 'reservoir',
    id: r.id,
    properties: { level: r.level, maxLevel: r.maxLevel },
    methods,
  }
}

function storageDescriptor(s: Storage, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: s.id,
    type: 'storage',
    id: s.id,
    properties: { items: s.items, bins: s.bins },
    methods,
  }
}

function canopyDescriptor(c: Canopy, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: c.id,
    type: 'canopy',
    id: c.id,
    properties: { isOpen: c.isOpen },
    methods,
  }
}

function pumpDescriptor(p: Pump, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: p.id,
    type: 'pump',
    id: p.id,
    properties: { transferRate: p.transferRate },
    methods,
  }
}

function sprayerDescriptor(s: Sprayer, methods: AvailableMethod[]): GameObjectDescriptor {
  return {
    name: s.id,
    type: 'sprayer',
    id: s.id,
    properties: { x: s.position.x, y: s.position.y },
    methods,
  }
}

function getMethodsForType(availableObjects: AvailableObject[], type: string): AvailableMethod[] {
  const obj = availableObjects.find((o) => o.type === type)
  return obj?.methods ?? []
}

export function buildDescriptors(
  level: LevelDefinition,
  world: WorldState,
): GameObjectDescriptor[] {
  const descriptors: GameObjectDescriptor[] = []
  const avail = level.availableObjects

  for (const plant of world.plants) {
    descriptors.push(plantDescriptor(plant, getMethodsForType(avail, 'plant')))
  }
  for (const sprinkler of world.sprinklers) {
    descriptors.push(sprinklerDescriptor(sprinkler, getMethodsForType(avail, 'sprinkler')))
  }
  for (const drone of world.drones) {
    descriptors.push(droneDescriptor(drone, getMethodsForType(avail, 'drone')))
  }
  for (const reservoir of world.reservoirs) {
    descriptors.push(reservoirDescriptor(reservoir, getMethodsForType(avail, 'reservoir')))
  }
  for (const storage of world.storages) {
    descriptors.push(storageDescriptor(storage, getMethodsForType(avail, 'storage')))
  }
  for (const canopy of world.canopies) {
    descriptors.push(canopyDescriptor(canopy, getMethodsForType(avail, 'canopy')))
  }
  for (const pump of world.pumps) {
    descriptors.push(pumpDescriptor(pump, getMethodsForType(avail, 'pump')))
  }
  for (const sprayer of world.sprayers) {
    descriptors.push(sprayerDescriptor(sprayer, getMethodsForType(avail, 'sprayer')))
  }

  // Add greenhouse/garden accessor if defined
  const gardenObj = avail.find((o) => o.type === 'garden' || o.type === 'greenhouse')
  if (gardenObj) {
    descriptors.push({
      name: gardenObj.name,
      type: gardenObj.type,
      properties: {
        plantCount: world.plants.length,
        rows: [...new Set(world.plants.map((p) => p.row).filter(Boolean))],
      },
      methods: gardenObj.methods,
    })
  }

  return descriptors
}
