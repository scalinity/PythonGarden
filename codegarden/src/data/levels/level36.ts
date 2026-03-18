import type { LevelDefinition } from '@/types/level.ts'

export const level36: LevelDefinition = {
  id: 'level-36',
  title: 'Pool Index',
  biome: 'tide_pools',
  concepts: ['enumerate_zip', 'for_loop', 'modulo'],
  order: 36,
  missionText:
    'enumerate() gives you both the position number and the item, like numbering a list:\n\n`for i, fruit in enumerate(basket):`\n`    print(i, fruit)`\n\nThis prints 0 apple, 1 banana, 2 cherry, and so on.\n\nWater only the plants at even-numbered positions (0, 2, 4).',
  starterCode:
    '# Water only plants at even-numbered positions (0, 2, 4)\n# enumerate(plants) gives you (index, plant) pairs\n\n',
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
        name: 'pool_fern_0',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'pool_fern_1',
        species: 'fern',
        position: { x: 3, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'pool_fern_2',
        species: 'fern',
        position: { x: 5, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'pool_fern_3',
        species: 'fern',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'pool_fern_4',
        species: 'fern',
        position: { x: 9, y: 3 },
        moisture: 15,
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
      params: { concept: 'enumerate_call' },
      description: 'Uses enumerate()',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 0 watered (even index)',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 1 unchanged (odd index)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 2 watered (even index)',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 3 unchanged (odd index)',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 4 watered (even index)',
    },
  ],
  hints: {
    direction:
      'You need to know each plant\'s position number to decide which ones to water. What gives you both the position and the item?',
    conceptNudge:
      'Even numbers have a remainder of 0 when divided by 2: `if i % 2 == 0:`',
    structuralHelp:
      'for i, plant in enumerate(plants):\n    if i % 2 == 0:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'enumerate_zip',
}
