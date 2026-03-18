import type { LevelDefinition } from '@/types/level.ts'

export const level37: LevelDefinition = {
  id: 'level-37',
  title: 'Paired Pools',
  biome: 'tide_pools',
  concepts: ['enumerate_zip', 'for_loop'],
  order: 37,
  missionText:
    'zip() pairs items from two lists together, like zipping two sides of a jacket:\n\n`for left, right in zip(names, scores):`\n`    print(left, right)`\n\nThis walks through both lists at the same time.\n\nRow A needs water, Row B needs nutrients. Use zip to process them in pairs.',
  starterCode:
    '# Row A plants need water, Row B plants need feeding\n# Use zip(row_a, row_b) to process them in pairs\n\n',
  availableObjects: [
    {
      name: 'row_a',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(row_a)',
          description: 'Row A plants (4 ferns needing water).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'row_b',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(row_b)',
          description: 'Row B plants (4 orchids needing nutrients).',
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
        id: 'plant_a1',
        name: 'pool_fern_a1',
        species: 'fern',
        position: { x: 1, y: 2 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a2',
        name: 'pool_fern_a2',
        species: 'fern',
        position: { x: 3, y: 2 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a3',
        name: 'pool_fern_a3',
        species: 'fern',
        position: { x: 5, y: 2 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a4',
        name: 'pool_fern_a4',
        species: 'fern',
        position: { x: 7, y: 2 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_b1',
        name: 'pool_orchid_b1',
        species: 'orchid',
        position: { x: 1, y: 4 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b2',
        name: 'pool_orchid_b2',
        species: 'orchid',
        position: { x: 3, y: 4 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b3',
        name: 'pool_orchid_b3',
        species: 'orchid',
        position: { x: 5, y: 4 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
      {
        id: 'plant_b4',
        name: 'pool_orchid_b4',
        species: 'orchid',
        position: { x: 7, y: 4 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'B',
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 5 } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'zip_call' },
      description: 'Uses zip()',
    },
    {
      type: 'state',
      params: { entity: 'plant_a1', property: 'moisture', operator: '>=', value: 35 },
      description: 'Row A plant 1 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_a2', property: 'moisture', operator: '>=', value: 35 },
      description: 'Row A plant 2 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_a3', property: 'moisture', operator: '>=', value: 35 },
      description: 'Row A plant 3 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_a4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Row A plant 4 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_b1', property: 'health', operator: '>=', value: 50 },
      description: 'Row B plant 1 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_b2', property: 'health', operator: '>=', value: 50 },
      description: 'Row B plant 2 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_b3', property: 'health', operator: '>=', value: 50 },
      description: 'Row B plant 3 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_b4', property: 'health', operator: '>=', value: 50 },
      description: 'Row B plant 4 fed',
    },
  ],
  hints: {
    direction:
      'Use zip() to pair one Row A plant with one Row B plant, then handle each in the loop body.',
    conceptNudge:
      'Inside the loop, water the first plant and feed the second: `sprinkler.water(a)` and `sprayer.feed(b, 15)`.',
    structuralHelp:
      'for a, b in zip(row_a, row_b):\n    sprinkler.water(a)\n    sprayer.feed(b, 15)',
  },
  conceptCardId: 'enumerate_zip',
}
