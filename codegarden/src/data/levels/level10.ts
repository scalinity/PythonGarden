import type { LevelDefinition } from '@/types/level.ts'

export const level10: LevelDefinition = {
  id: 'level-10',
  title: 'Feed the Row',
  biome: 'pollinator_ridge',
  concepts: ['for_loop'],
  order: 10,
  missionText:
    '**Loop Variables as Arguments** — Inside a loop, you can pass the loop variable to any command.\n\nFor example:\n```python\nfor student in classroom:\n    give_grade(student, 85)\n```\n\n**Your mission:** All 4 plants in Row A are low on health. Loop through them and feed each one 10 nutrients.',
  starterCode:
    '# Feed every plant in the row\nfor plant in row_a:\n    ___\n',
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
        name: 'herb_1',
        species: 'herb',
        position: { x: 1, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a2',
        name: 'herb_2',
        species: 'herb',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a3',
        name: 'herb_3',
        species: 'herb',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a4',
        name: 'herb_4',
        species: 'herb',
        position: { x: 7, y: 3 },
        moisture: 50,
        health: 40,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
    ],
    sprayers: [{ id: 'sprayer', position: { x: 4, y: 1 } }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_a1', property: 'health', operator: '>=', value: 50 },
      description: 'Plant 1 health >= 50',
    },
    {
      type: 'state',
      params: { entity: 'plant_a2', property: 'health', operator: '>=', value: 50 },
      description: 'Plant 2 health >= 50',
    },
    {
      type: 'state',
      params: { entity: 'plant_a3', property: 'health', operator: '>=', value: 50 },
      description: 'Plant 3 health >= 50',
    },
    {
      type: 'state',
      params: { entity: 'plant_a4', property: 'health', operator: '>=', value: 50 },
      description: 'Plant 4 health >= 50',
    },
  ],
  hints: {
    direction:
      'Each plant needs feeding. Use the sprayer and pass the plant and an amount.',
    conceptNudge:
      'The loop variable `plant` is the argument: `sprayer.feed(plant, 10)`.',
    structuralHelp: 'for plant in row_a:\n    sprayer.feed(plant, 10)',
  },
  conceptCardId: 'for_loop',
}
