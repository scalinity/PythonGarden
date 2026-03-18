import type { LevelDefinition } from '@/types/level.ts'

export const level41: LevelDefinition = {
  id: 'level-41',
  title: 'Tide Pool Census',
  biome: 'tide_pools',
  concepts: ['enumerate_zip', 'list_comprehensions', 'f_strings'],
  order: 41,
  missionText:
    'Conduct a full tide pool census! Combine everything you have learned:\n\n1. Use zip to pair each plant with its moisture threshold\n2. Use a list comprehension to filter out plants that need water\n3. Use enumerate to number and water each one\n4. Also harvest any ripe plants with the drone',
  starterCode:
    '# Each plant has a moisture threshold \u2014 water those below their threshold\n# Use zip to pair plants with thresholds\n# Use a list comprehension to filter\n# Use enumerate to number the results\n# Also harvest any ripe plants\nthresholds = [30, 25, 35, 20, 40, 30]\n\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (6).',
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
    {
      name: 'drone',
      type: 'Drone',
      methods: [
        {
          name: 'harvest',
          signature: 'drone.harvest(plant)',
          description: 'Harvests the given plant.',
        },
      ],
    },
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'items',
          signature: 'storage.items',
          description: 'List of items currently in storage.',
          returnType: 'list',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'census_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 25,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'census_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 35,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'census_moss',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 20,
        health: 80,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'census_vine',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 40,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'census_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 75,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'census_fern_2',
        species: 'fern',
        position: { x: 11, y: 3 },
        moisture: 45,
        health: 65,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
    drones: [
      {
        id: 'drone',
        position: { x: 5, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'zip_call' },
      description: 'Uses zip()',
    },
    {
      type: 'concept',
      params: { concept: 'enumerate_call' },
      description: 'Uses enumerate()',
    },
    {
      type: 'concept',
      params: { concept: 'list_comprehension' },
      description: 'Uses a list comprehension',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_2' },
      description: 'Ripe moss harvested',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_4' },
      description: 'Ripe herb harvested',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 45 },
      description: 'Fern watered (25 < 30 threshold)',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Herb watered (15 < 40 threshold)',
    },
  ],
  hints: {
    direction:
      'Break it into steps: zip plants with thresholds, filter with a comprehension, enumerate and water, then harvest ripe ones.',
    conceptNudge:
      'Pair with `zip(plants, thresholds)`, filter with `[p for p, t in ... if p.moisture < t]`, then `for i, p in enumerate(...):`.',
    structuralHelp:
      'pairs = list(zip(plants, thresholds))\ndry = [p for p, t in pairs if p.moisture < t]\n\nfor i, plant in enumerate(dry):\n    print(f"#{i}: watering {plant.species}")\n    sprinkler.water(plant)\n\nfor plant in plants:\n    if plant.ripe:\n        drone.harvest(plant)',
  },
  conceptCardId: 'enumerate_zip',
}
