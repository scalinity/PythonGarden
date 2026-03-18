import type { LevelDefinition } from '@/types/level.ts'

export const level31: LevelDefinition = {
  id: 'level-31',
  title: 'Species Tags',
  biome: 'echo_ravine',
  concepts: ['f_strings', 'for_loop', 'strings'],
  order: 31,
  missionText:
    'An **f-string** lets you embed values directly inside text. Put `f` before the opening quote and wrap expressions in `{curly braces}`:\n`name = "Ada"; greeting = f"Hello, {name}!"`\n\nPython evaluates the expression and inserts the result.\n\nEach ravine plant needs a label tag. Create one for each plant showing its species and health.',
  starterCode:
    '# Create a label for each plant showing its species and health\n# Use an f-string: f"text {expression} more text"\n# Store each label with storage.store(label)\n\nfor plant in plants:\n    label = ___\n    storage.store(label)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (4).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(item)',
          description: 'Stores a label string for later reference.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'echo_fern',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 60,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'echo_orchid',
        species: 'orchid',
        position: { x: 4, y: 3 },
        moisture: 45,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'echo_moss',
        species: 'moss',
        position: { x: 6, y: 3 },
        moisture: 75,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'echo_vine',
        species: 'vine',
        position: { x: 8, y: 3 },
        moisture: 30,
        health: 55,
        ripe: false,
        needsPollination: false,
      },
    ],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_item', count: 4, countOperator: '>=' },
      description: 'At least 4 labels stored',
    },
    {
      type: 'concept',
      params: { concept: 'f_string' },
      description: 'An f-string is used',
    },
  ],
  hints: {
    direction:
      'Each plant has a .species and .health property. Build a string that includes both.',
    conceptNudge:
      'An f-string starts with f before the quote: `f"Species: {plant.species}, Health: {plant.health}"`.',
    structuralHelp:
      'for plant in plants:\n    label = f"{plant.species} - health: {plant.health}"\n    storage.store(label)',
  },
  conceptCardId: 'f_strings',
}
