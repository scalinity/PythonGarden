import type { LevelDefinition } from '@/types/level.ts'

export const level44: LevelDefinition = {
  id: 'level-44',
  title: 'Smart Defaults',
  biome: 'aurora_steppe',
  concepts: ['default_parameters', 'functions', 'dictionaries', 'in_operator'],
  order: 44,
  missionText:
    'A function parameter can have a default value:\n`def greet(name, style="formal"):`\nIf no `style` is given, `"formal"` is used automatically.\n\nWrite a `feed_plant` function with a default amount of 10. Orchids need 25, vines need 20 — all others use the default.',
  starterCode:
    '# Define a feed_plant function with a default amount of 10\n# Orchids need 25, vines need 20 — all others use the default\n# Hint: def func(param, amount=10) gives amount a default value\n\n',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'steppe_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'steppe_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'steppe_moss',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'steppe_vine',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'steppe_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 1 } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'default_param' },
      description: 'A function with a default parameter is defined',
    },
    {
      type: 'concept',
      params: { concept: 'function_def' },
      description: 'A function is defined',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_0', amount: 10 },
      description: 'Fern fed with default amount (10)',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_1', amount: 25 },
      description: 'Orchid fed with 25',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_2', amount: 10 },
      description: 'Moss fed with default amount (10)',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_3', amount: 20 },
      description: 'Vine fed with 20',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_4', amount: 10 },
      description: 'Herb fed with default amount (10)',
    },
  ],
  hints: {
    direction:
      'Define a function with a default amount. Check the species to decide when to override it.',
    conceptNudge:
      'Use `def feed_plant(plant, amount=10):` for the default. Check `if plant.species == "orchid":` and call with 25, etc.',
    structuralHelp:
      'def feed_plant(plant, amount=10):\n    sprayer.feed(plant, amount)\n\nfor plant in plants:\n    if plant.species == "orchid":\n        feed_plant(plant, 25)\n    elif plant.species == "vine":\n        feed_plant(plant, 20)\n    else:\n        feed_plant(plant)',
  },
  conceptCardId: 'default_parameters',
}
