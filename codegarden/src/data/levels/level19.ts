import type { LevelDefinition } from '@/types/level.ts'

export const level19: LevelDefinition = {
  id: 'level-19',
  title: 'Multiple Checks',
  biome: 'memory_marsh',
  concepts: ['booleans', 'boolean_operators'],
  order: 19,
  missionText:
    '**Boolean Operators** — Combine conditions with `and` (both must be True) or `or` (either can be True).\n\nFor example:\n```python\nif age >= 13 and has_ticket:\n    enter_movie()\n```\n\n**Your mission:** Some plants are both dry AND unhealthy. Water only those ones. Leave plants that are healthy or already moist alone.',
  starterCode:
    '# Loop through plants and water only the ones that are\n# BOTH dry (moisture < 30) AND unhealthy (health < 50)\nfor plant in plants:\n    if ___:\n        sprinkler.water(plant)\n',
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
        id: 'plant_1',
        name: 'shrub_1',
        species: 'shrub',
        position: { x: 1, y: 3 },
        moisture: 10,
        health: 30,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'shrub_2',
        species: 'shrub',
        position: { x: 3, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'shrub_3',
        species: 'shrub',
        position: { x: 5, y: 3 },
        moisture: 25,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'shrub_4',
        species: 'shrub',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'shrub_5',
        species: 'shrub',
        position: { x: 9, y: 3 },
        moisture: 20,
        health: 25,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'boolean_operator' },
      description: 'Boolean operator (and/or) is used',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 1 watered (dry + unhealthy)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '==', value: 60 },
      description: 'Plant 2 unchanged (healthy)',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 3 watered (dry + unhealthy)',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 4 unchanged (dry but healthy)',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 5 watered (dry + unhealthy)',
    },
  ],
  hints: {
    direction:
      'You need two checks combined. Which plants are BOTH dry AND unhealthy?',
    conceptNudge:
      'Use `and` to combine: `if plant.moisture < 30 and plant.health < 50:`.',
    structuralHelp:
      'for plant in plants:\n    if plant.moisture < 30 and plant.health < 50:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'boolean_operators',
}
