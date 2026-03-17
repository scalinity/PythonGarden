import type { LevelDefinition } from '@/types/level.ts'

export const level06: LevelDefinition = {
  id: 'level-06',
  title: 'Water Every Plant in Row A',
  biome: 'pollinator_ridge',
  concepts: ['lists', 'for_loop'],
  order: 6,
  missionText:
    'All four plants in Row A are dry. Use a for loop to water every one of them.',
  starterCode:
    '# Water every plant in the row\nfor plant in row_a:\n    sprinkler.water(plant)\n',
  availableObjects: [
    {
      name: 'greenhouse',
      type: 'Greenhouse',
      methods: [
        {
          name: 'row',
          signature: 'greenhouse.row("A")',
          description: 'Returns the list of plants in the named row.',
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
        id: 'plant_a1',
        name: 'fern_1',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a2',
        name: 'fern_2',
        species: 'fern',
        position: { x: 3, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a3',
        name: 'fern_3',
        species: 'fern',
        position: { x: 5, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a4',
        name: 'fern_4',
        species: 'fern',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: {
        entity: 'plant_a1',
        property: 'moisture',
        operator: '>=',
        value: 35,
      },
      description: 'Plant 1 moisture >= 35',
    },
    {
      type: 'state',
      params: {
        entity: 'plant_a2',
        property: 'moisture',
        operator: '>=',
        value: 35,
      },
      description: 'Plant 2 moisture >= 35',
    },
    {
      type: 'state',
      params: {
        entity: 'plant_a3',
        property: 'moisture',
        operator: '>=',
        value: 35,
      },
      description: 'Plant 3 moisture >= 35',
    },
    {
      type: 'state',
      params: {
        entity: 'plant_a4',
        property: 'moisture',
        operator: '>=',
        value: 35,
      },
      description: 'Plant 4 moisture >= 35',
    },
  ],
  hints: {
    direction:
      'You need to water all four plants. A loop lets you do it without repeating yourself.',
    conceptNudge:
      'A for loop visits each item in a list. "for plant in row_a:" gives you one plant at a time.',
    structuralHelp: 'for plant in row_a:\n    sprinkler.water(plant)',
  },
  conceptCardId: 'for_loop',
}
