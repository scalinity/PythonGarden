import type { LevelDefinition } from '@/types/level.ts'
import type { WorldState } from '@/types/entities.ts'
import type { GameObjectDescriptor } from '@/sandbox/worker/workerProtocol.ts'

const ENTITY_METHOD_MAP: Record<string, { methods: { name: string; args: string[] }[] }> = {
  Plant: {
    methods: [
      { name: 'moisture', args: [] },
      { name: 'health', args: [] },
      { name: 'is_ripe', args: [] },
      { name: 'species', args: [] },
      { name: 'needs_pollination', args: [] },
    ],
  },
  Sprinkler: {
    methods: [
      { name: 'on', args: [] },
      { name: 'off', args: [] },
      { name: 'water', args: ['plant'] },
      { name: 'spray', args: ['amount'] },
    ],
  },
  Drone: {
    methods: [
      { name: 'move_to', args: ['target'] },
      { name: 'harvest', args: ['plant'] },
      { name: 'pollinate', args: ['flower'] },
    ],
  },
  Reservoir: {
    methods: [{ name: 'level', args: [] }],
  },
  Storage: {
    methods: [
      { name: 'store', args: ['item'] },
      { name: 'store_in', args: ['bin_name', 'item'] },
      { name: 'items', args: [] },
      { name: 'count', args: ['item_type'] },
    ],
  },
  Weather: {
    methods: [
      { name: 'sunlight', args: [] },
      { name: 'temperature', args: [] },
    ],
  },
  Canopy: {
    methods: [
      { name: 'open', args: [] },
      { name: 'close', args: [] },
    ],
  },
  Pump: {
    methods: [{ name: 'transfer', args: [] }],
  },
  Sprayer: {
    methods: [{ name: 'feed', args: ['plant', 'amount'] }],
  },
  Greenhouse: {
    methods: [{ name: 'row', args: ['name'] }],
  },
}

function entityProperties(type: string, entity: Record<string, unknown>): { name: string; value: unknown }[] {
  const props: { name: string; value: unknown }[] = []

  switch (type) {
    case 'Plant':
      props.push(
        { name: 'name', value: entity.name },
        { name: 'moisture', value: entity.moisture },
        { name: 'health', value: entity.health },
        { name: 'ripe', value: entity.ripe },
        { name: 'needsPollination', value: entity.needsPollination },
        { name: 'species', value: entity.species },
        { name: 'row', value: entity.row ?? null },
      )
      break
    case 'Sprinkler':
      props.push({ name: 'isOn', value: entity.isOn })
      break
    case 'Drone':
      props.push(
        { name: 'direction', value: entity.direction },
        { name: 'carrying', value: entity.carrying },
      )
      break
    case 'Reservoir':
      props.push(
        { name: 'level', value: entity.level },
        { name: 'maxLevel', value: entity.maxLevel },
      )
      break
    case 'Storage':
      props.push(
        { name: 'items', value: entity.items },
        { name: 'bins', value: entity.bins },
      )
      break
    case 'Weather':
      props.push(
        { name: 'sunlight', value: entity.sunlight },
        { name: 'temperature', value: entity.temperature },
      )
      break
    case 'Canopy':
      props.push({ name: 'isOpen', value: entity.isOpen })
      break
    case 'Pump':
      props.push({ name: 'transferRate', value: entity.transferRate })
      break
    case 'Sprayer':
      break
  }

  return props
}

const WORLD_KEY_TO_TYPE: Record<string, string> = {
  plants: 'Plant',
  sprinklers: 'Sprinkler',
  drones: 'Drone',
  reservoirs: 'Reservoir',
  storages: 'Storage',
  canopies: 'Canopy',
  pumps: 'Pump',
  sprayers: 'Sprayer',
}

// Map collection-style available object names to world state keys
const COLLECTION_NAME_MAP: Record<string, string> = {
  plants: 'plants',
  sprinklers: 'sprinklers',
  drones: 'drones',
  reservoirs: 'reservoirs',
  storages: 'storages',
  canopies: 'canopies',
  pumps: 'pumps',
  sprayers: 'sprayers',
}

export function buildGameObjectDescriptors(
  level: LevelDefinition,
  world: WorldState,
): GameObjectDescriptor[] {
  const allowedNames = new Set(level.availableObjects.map((o) => o.name))
  const descriptors: GameObjectDescriptor[] = []

  // Check if any available object refers to a collection (e.g., "plants")
  // If so, include ALL entities of that collection type
  const includeAllOfType = new Set<string>()
  for (const obj of level.availableObjects) {
    const worldKey = COLLECTION_NAME_MAP[obj.name]
    if (worldKey) {
      const typeName = WORLD_KEY_TO_TYPE[worldKey]
      if (typeName) includeAllOfType.add(typeName)
    }
    // Greenhouse needs all plants for row() filtering
    if (obj.type === 'Greenhouse') {
      includeAllOfType.add('Plant')
    }
  }

  // Add entity-backed objects
  for (const [key, typeName] of Object.entries(WORLD_KEY_TO_TYPE)) {
    const entities = world[key as keyof WorldState]
    if (!Array.isArray(entities)) continue

    for (const entity of entities) {
      const e = entity as unknown as Record<string, unknown>
      const name = (e.name as string | undefined) ?? (e.id as string)
      // Include if: name is explicitly allowed, OR the entire type collection is allowed
      if (!allowedNames.has(name) && !includeAllOfType.has(typeName)) continue

      const methodDef = ENTITY_METHOD_MAP[typeName]
      descriptors.push({
        name,
        type: typeName,
        id: e.id as string,
        methods: methodDef?.methods ?? [],
        properties: entityProperties(typeName, e),
      })
    }
  }

  // Add weather as a singleton if allowed
  if (allowedNames.has('weather')) {
    descriptors.push({
      name: 'weather',
      type: 'Weather',
      id: 'weather',
      methods: ENTITY_METHOD_MAP.Weather.methods,
      properties: entityProperties('Weather', world.weather as unknown as Record<string, unknown>),
    })
  }

  // Add greenhouse accessor if allowed
  if (allowedNames.has('greenhouse')) {
    // Collect row names from plants
    const rows = new Set<string>()
    for (const p of world.plants) {
      if (p.row) rows.add(p.row)
    }
    descriptors.push({
      name: 'greenhouse',
      type: 'Greenhouse',
      id: 'greenhouse',
      methods: ENTITY_METHOD_MAP.Greenhouse.methods,
      properties: [{ name: 'rows', value: [...rows] }],
    })
  }

  return descriptors
}
