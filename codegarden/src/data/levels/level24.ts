import type { LevelDefinition } from '@/types/level.ts'

export const level24: LevelDefinition = {
  id: 'level-24',
  title: 'Alternating Rows',
  biome: 'shifting_delta',
  concepts: ['modulo', 'for_loop', 'if_statement'],
  order: 24,
  missionText:
    'The `%` (modulo) operator gives the remainder after division. For example, `7 % 3` gives `1` because 7 divided by 3 leaves a remainder of 1. A handy trick: even numbers have remainder 0 when divided by 2:\n```\nif 4 % 2 == 0:\n    print("even")  # prints!\nif 5 % 2 == 0:\n    print("even")  # does not print\n```\n\nWater only the plants at even positions (0, 2, 4) to conserve resources.',
  starterCode:
    '# Water only plants at even positions (0, 2, 4)\nfor i in range(len(plants)):\n    if ___:\n        sprinkler.water(plants[i])\n',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'delta_fern_0',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'delta_fern_1',
        species: 'fern',
        position: { x: 3, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'delta_fern_2',
        species: 'fern',
        position: { x: 5, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'delta_fern_3',
        species: 'fern',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'delta_fern_4',
        species: 'fern',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'delta_fern_5',
        species: 'fern',
        position: { x: 11, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 6, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 0 (even) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 1 (odd) left dry',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 2 (even) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 3 (odd) left dry',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 4 (even) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 5 (odd) left dry',
    },
    {
      type: 'concept',
      params: { concept: 'modulo_operator' },
      description: 'Modulo operator is used',
    },
  ],
  hints: {
    direction:
      'Even numbers have no remainder when divided by 2. How do you express "remainder" in Python?',
    conceptNudge:
      'The modulo operator `%` gives the remainder: `if i % 2 == 0:` is true for even values of i.',
    structuralHelp:
      'for i in range(len(plants)):\n    if i % 2 == 0:\n        sprinkler.water(plants[i])',
  },
  conceptCardId: 'modulo',
}
