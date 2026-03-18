import type { LevelDefinition } from '@/types/level.ts'

export const level43: LevelDefinition = {
  id: 'level-43',
  title: 'Resource Budget',
  biome: 'aurora_steppe',
  concepts: ['list_comprehensions', 'if_statement'],
  order: 43,
  missionText:
    '`sum()` adds up all numbers, `min()` finds the smallest, `max()` finds the largest:\n`total = sum([10, 20, 30])`\n`average = total / len(items)`\n\nCalculate the average moisture across all plants and water any plant below the average.',
  starterCode:
    '# Calculate the average moisture across all plants\n# Use sum() and len() to compute the average\n# Water any plant with moisture below the average\n# Hint: build a list of moistures with a comprehension first\n\n',
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
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'steppe_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'steppe_moss',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 20,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'steppe_vine',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 40,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'steppe_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 30,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'aggregation' },
      description: 'sum(), min(), or max() is used',
    },
    {
      type: 'concept',
      params: { concept: 'list_comprehension' },
      description: 'A list comprehension is used',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 30 },
      description: 'Fern (moisture 10, below average 30) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 40 },
      description: 'Moss (moisture 20, below average 30) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 50 },
      description: 'Orchid (moisture 50, above average) unchanged',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 40 },
      description: 'Vine (moisture 40, above average) unchanged',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '==', value: 30 },
      description: 'Herb (moisture 30, at average) unchanged',
    },
  ],
  hints: {
    direction:
      'First collect all moisture values, then compute the average with sum and len. Loop through plants again and water those below.',
    conceptNudge:
      'Try `moistures = [p.moisture for p in plants]` to collect values. Then `avg = sum(moistures) / len(moistures)`. Use `if plant.moisture < avg:` in a loop.',
    structuralHelp:
      'moistures = [p.moisture for p in plants]\navg = sum(moistures) / len(moistures)\n\nfor plant in plants:\n    if plant.moisture < avg:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'aggregation',
}
