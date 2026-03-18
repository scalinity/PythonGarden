import type { LevelDefinition } from '@/types/level.ts'

export const level42: LevelDefinition = {
  id: 'level-42',
  title: 'Sorted by Need',
  biome: 'aurora_steppe',
  concepts: ['sorted_key', 'functions', 'for_loop'],
  order: 42,
  missionText:
    '`sorted()` orders a list. Add `key=` to sort by a custom rule:\n`sorted(items, key=some_function)`\n\nYour garden has 5 plants with different moisture levels. Sort them by moisture (driest first) and water the 3 driest.',
  starterCode:
    '# Sort plants by moisture (driest first) and water the 3 driest\n# Hint: sorted(items, key=some_function) sorts using that function\n# Hint: ordered[:3] gives the first 3 items\n\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (5).',
          returnType: 'number',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'steppe_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'steppe_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 45,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'steppe_moss',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 25,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'steppe_vine',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'steppe_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'sorted_key' },
      description: 'sorted() with key= is used',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 30 },
      description: 'Driest plant (fern, moisture 10) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Second driest plant (herb, moisture 15) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 45 },
      description: 'Third driest plant (moss, moisture 25) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 45 },
      description: 'Orchid (moisture 45) not watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 60 },
      description: 'Vine (moisture 60) not watered',
    },
  ],
  hints: {
    direction:
      'You need a function that extracts moisture from a plant, then pass it to sorted(). Only water the first 3 in the result.',
    conceptNudge:
      'Define `def get_moisture(plant): return plant.moisture` and use `sorted(plants, key=get_moisture)`. Then slice with `[:3]`.',
    structuralHelp:
      'def get_moisture(plant):\n    return plant.moisture\n\nordered = sorted(plants, key=get_moisture)\nfor plant in ordered[:3]:\n    sprinkler.water(plant)',
  },
  conceptCardId: 'sorted_key',
}
