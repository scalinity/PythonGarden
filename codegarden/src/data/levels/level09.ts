import type { LevelDefinition } from '@/types/level.ts'

export const level09: LevelDefinition = {
  id: 'level-09',
  title: 'Do It for Every One',
  biome: 'pollinator_ridge',
  concepts: ['for_loop', 'lists'],
  order: 9,
  missionText:
    '**For Loops** — A `for` loop repeats code once for each item in a list. The loop variable changes each time.\n\nFor example:\n```python\nfor guest in invitations:\n    send_email(guest)\n```\n\n**Your mission:** All 4 plants in Row A need watering. Fill in the loop body to water each one.',
  starterCode:
    '# Water every plant in the row\nfor plant in row_a:\n    ___\n',
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
      name: 'row_a',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(row_a)',
          description: 'All plants in Row A. Auto-created from greenhouse.row("A").',
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
      params: { entity: 'plant_a1', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 1 moisture >= 35',
    },
    {
      type: 'state',
      params: { entity: 'plant_a2', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 2 moisture >= 35',
    },
    {
      type: 'state',
      params: { entity: 'plant_a3', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 3 moisture >= 35',
    },
    {
      type: 'state',
      params: { entity: 'plant_a4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 4 moisture >= 35',
    },
  ],
  hints: {
    direction:
      'The loop gives you each plant one at a time. What command waters a plant?',
    conceptNudge:
      'Inside the loop, `plant` refers to the current item. Use `sprinkler.water(plant)`.',
    structuralHelp: 'for plant in row_a:\n    sprinkler.water(plant)',
  },
  conceptCardId: 'for_loop',
}
