import type { LevelDefinition } from '@/types/level.ts'

export const level47: LevelDefinition = {
  id: 'level-47',
  title: 'Aurora Algorithm',
  biome: 'aurora_steppe',
  concepts: ['sorted_key', 'default_parameters', 'tuple_unpacking', 'f_strings', 'nested_loops'],
  order: 47,
  missionText:
    'Time for a full algorithm! Assess and treat the entire aurora steppe.\n\n1. Gather all plants from rows A, B, C into one list\n2. Write an assess function returning (plant, priority)\n3. Sort all plants by priority (highest first)\n4. Treat the top 5: water if priority >= 2, feed 10 if priority >= 1\n5. Store a summary reporting how many were watered',
  starterCode:
    '# Aurora Algorithm:\n# 1. Gather all plants from rows A, B, C into one list\n# 2. Write an assess(plant) function that returns (plant, priority)\n#    priority = +2 if moisture < 30, +1 if health < 50\n# 3. Sort all plants by priority (highest first)\n# 4. Treat the top 5: water if priority >= 2, feed 10 if priority >= 1\n# 5. Store a summary reporting how many were watered\n\n',
  availableObjects: [
    {
      name: 'greenhouse',
      type: 'Greenhouse',
      methods: [
        {
          name: 'row',
          signature: 'greenhouse.row("A")',
          description: 'Returns the list of plants in the named row.',
        },
      ],
    },
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'water',
          signature: 'sprinkler.water(plant)',
          description: 'Waters the given plant, adding 20 moisture.',
        },
      ],
    },
    {
      name: 'sprayer',
      type: 'Sprayer',
      methods: [
        {
          name: 'feed',
          signature: 'sprayer.feed(plant, amount)',
          description: 'Feeds the plant with the given nutrient amount.',
        },
      ],
    },
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(label)',
          description: 'Stores a label string in the storage.',
        },
      ],
    },
  ],
  world: {
    plants: [
      // Row A — varied moisture and health
      {
        id: 'plant_a1',
        name: 'fern_a1',
        species: 'fern',
        position: { x: 1, y: 1 },
        moisture: 10,
        health: 35,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a2',
        name: 'orchid_a2',
        species: 'orchid',
        position: { x: 3, y: 1 },
        moisture: 50,
        health: 90,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a3',
        name: 'moss_a3',
        species: 'moss',
        position: { x: 5, y: 1 },
        moisture: 25,
        health: 45,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a4',
        name: 'herb_a4',
        species: 'herb',
        position: { x: 7, y: 1 },
        moisture: 55,
        health: 80,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      // Row B — varied moisture and health
      {
        id: 'plant_b1',
        name: 'vine_b1',
        species: 'vine',
        position: { x: 1, y: 3 },
        moisture: 5,
        health: 30,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b2',
        name: 'fern_b2',
        species: 'fern',
        position: { x: 3, y: 3 },
        moisture: 40,
        health: 60,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b3',
        name: 'orchid_b3',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 20,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b4',
        name: 'moss_b4',
        species: 'moss',
        position: { x: 7, y: 3 },
        moisture: 60,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      // Row C — varied moisture and health
      {
        id: 'plant_c1',
        name: 'herb_c1',
        species: 'herb',
        position: { x: 1, y: 5 },
        moisture: 15,
        health: 55,
        ripe: false,
        needsPollination: false,
        row: 'C',
      },
      {
        id: 'plant_c2',
        name: 'vine_c2',
        species: 'vine',
        position: { x: 3, y: 5 },
        moisture: 35,
        health: 85,
        ripe: false,
        needsPollination: false,
        row: 'C',
      },
      {
        id: 'plant_c3',
        name: 'fern_c3',
        species: 'fern',
        position: { x: 5, y: 5 },
        moisture: 8,
        health: 42,
        ripe: false,
        needsPollination: false,
        row: 'C',
      },
      {
        id: 'plant_c4',
        name: 'orchid_c4',
        species: 'orchid',
        position: { x: 7, y: 5 },
        moisture: 45,
        health: 75,
        ripe: false,
        needsPollination: false,
        row: 'C',
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 0 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 6 } }],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'sorted_key' },
      description: 'sorted() with key= is used',
    },
    {
      type: 'concept',
      params: { concept: 'tuple_unpack' },
      description: 'Tuple unpacking is used',
    },
    {
      type: 'concept',
      params: { concept: 'f_string' },
      description: 'An f-string is used',
    },
    // Top 5 by priority (highest first):
    // plant_b1: moisture 5 < 30 (+2) + health 30 < 50 (+1) = 3
    // plant_a1: moisture 10 < 30 (+2) + health 35 < 50 (+1) = 3
    // plant_c3: moisture 8 < 30 (+2) + health 42 < 50 (+1) = 3
    // plant_a3: moisture 25 < 30 (+2) + health 45 < 50 (+1) = 3
    // plant_c1: moisture 15 < 30 (+2) + health 55 >= 50     = 2
    {
      type: 'state',
      params: { entity: 'plant_b1', property: 'moisture', operator: '>=', value: 25 },
      description: 'Highest-priority vine_b1 watered',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_b1' },
      description: 'Highest-priority vine_b1 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_a1', property: 'moisture', operator: '>=', value: 30 },
      description: 'High-priority fern_a1 watered',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_a1' },
      description: 'High-priority fern_a1 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_c3', property: 'moisture', operator: '>=', value: 28 },
      description: 'High-priority fern_c3 watered',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_c3' },
      description: 'High-priority fern_c3 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_c1', property: 'moisture', operator: '>=', value: 35 },
      description: 'Priority-2 herb_c1 watered',
    },
    {
      type: 'action',
      params: { type: 'store_item', source: 'storage' },
      description: 'A summary is stored',
    },
  ],
  hints: {
    direction:
      'Break it into steps: gather plants, score them, sort, treat the top 5, then file a report.',
    conceptNudge:
      'Use nested loops to gather: `for row in ["A","B","C"]: for p in greenhouse.row(row): all_plants.append(p)`. Return `(plant, priority)` from assess. Sort with `key=lambda pair: pair[1]` and `reverse=True`.',
    structuralHelp:
      'all_plants = []\nfor row_name in ["A", "B", "C"]:\n    for p in greenhouse.row(row_name):\n        all_plants.append(p)\n\ndef assess(plant):\n    priority = 0\n    if plant.moisture < 30:\n        priority = priority + 2\n    if plant.health < 50:\n        priority = priority + 1\n    return plant, priority\n\nscored = [assess(p) for p in all_plants]\nordered = sorted(scored, key=lambda pair: pair[1], reverse=True)\n\nwatered = 0\nfor plant, priority in ordered[:5]:\n    if priority >= 2:\n        sprinkler.water(plant)\n        watered = watered + 1\n    if priority >= 1:\n        sprayer.feed(plant, 10)\n\nstorage.store(f"Watered {watered} plants")',
  },
  conceptCardId: 'sorted_key',
}
