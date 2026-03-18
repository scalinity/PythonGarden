import type { LevelDefinition } from '@/types/level.ts'

export const level03: LevelDefinition = {
  id: 'level-03',
  title: 'Store a Value',
  biome: 'silent_greenhouse',
  concepts: ['variables', 'numbers'],
  order: 3,
  missionText:
    '**Variables** — A variable stores a value so you can use it later. You create one with `=`.\n\nFor example:\n```python\ntickets_left = 100 - 37\nprint(tickets_left)\n```\n\n**Your mission:** The plant has 20 moisture and needs 50. Calculate the missing amount, store it in a variable, then spray that exact amount.',
  starterCode:
    '# How much water does the plant need?\n# It has 20 moisture and needs 50\nwater_needed = ___\n\n# Spray that amount\nsprinkler.spray(water_needed)\n',
  availableObjects: [
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'spray',
          signature: 'sprinkler.spray(amount)',
          description:
            'Sprays the given amount of water on the plant. The amount must be a number.',
        },
        {
          name: 'on',
          signature: 'sprinkler.on()',
          description: 'Turns the sprinkler on.',
        },
      ],
    },
    {
      name: 'plant',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant.moisture',
          description: 'The current moisture level of the plant (number).',
          returnType: 'number',
        },
        {
          name: 'health',
          signature: 'plant.health',
          description: 'The current health of the plant.',
          returnType: 'number',
        },
      ],
    },
  ],
  world: {
    sprinklers: [{ id: 'sprinkler', position: { x: 3, y: 2 }, isOn: true }],
    plants: [
      {
        id: 'plant',
        name: 'daisy',
        species: 'daisy',
        position: { x: 5, y: 2 },
        moisture: 20,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant', property: 'moisture', operator: '>=', value: 50 },
      description: 'Plant moisture reaches at least 50',
    },
    {
      type: 'concept',
      params: { concept: 'variable_assignment' },
      description: 'A variable is used to store the water amount',
    },
  ],
  hints: {
    direction:
      'The plant has 20 moisture and needs 50. What number fills that gap?',
    conceptNudge:
      'A variable stores a value: `water_needed = 30`. Then you can pass it to spray().',
    structuralHelp: 'water_needed = 30\nsprinkler.spray(water_needed)',
  },
  conceptCardId: 'variables',
}
