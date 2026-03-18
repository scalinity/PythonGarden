import type { LevelDefinition } from '@/types/level.ts'

export const level15: LevelDefinition = {
  id: 'level-15',
  title: 'Recipe With a Result',
  biome: 'archive_canopy',
  concepts: ['functions', 'return'],
  order: 15,
  missionText:
    '**Return Values** — A function can **return** a value back to whoever called it.\n\nFor example:\n```python\ndef tip(bill):\n    return bill * 0.15\n\nmy_tip = tip(60)\n```\nThe function calculates the result and sends it back.\n\n**Your mission:** Each plant needs a different amount of nutrients to reach full health. Write a function that calculates how much each plant needs, returns the result, and use it to feed each one the right amount.',
  starterCode:
    '# Define a function that returns the nutrient deficit\ndef feed_needed(plant):\n    ___\n\n# Use it to feed each plant the right amount\nfor plant in plants:\n    amount = feed_needed(plant)\n    sprayer.feed(plant, amount)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (3).',
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
          description: 'Feeds the plant with the given nutrient amount, increasing health.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'fern_1',
        species: 'fern',
        position: { x: 3, y: 1 },
        moisture: 50,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'fern_2',
        species: 'fern',
        position: { x: 5, y: 2 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'fern_3',
        species: 'fern',
        position: { x: 7, y: 1 },
        moisture: 50,
        health: 75,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 1 } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'return_statement' },
      description: 'Function uses a return statement',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'health', operator: '>=', value: 80 },
      description: 'Plant 1 health >= 80',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'health', operator: '>=', value: 80 },
      description: 'Plant 2 health >= 80',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'health', operator: '>=', value: 80 },
      description: 'Plant 3 health >= 80',
    },
  ],
  hints: {
    direction:
      'The function should calculate 80 minus the plant\'s health and send it back.',
    conceptNudge:
      'Use `return` to send a value back: `return 80 - plant.health`.',
    structuralHelp:
      'def feed_needed(plant):\n    return 80 - plant.health\n\nfor plant in plants:\n    amount = feed_needed(plant)\n    sprayer.feed(plant, amount)',
  },
  conceptCardId: 'return_values',
}
