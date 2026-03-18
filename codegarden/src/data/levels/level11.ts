import type { LevelDefinition } from '@/types/level.ts'

export const level11: LevelDefinition = {
  id: 'level-11',
  title: 'Pick and Choose',
  biome: 'pollinator_ridge',
  concepts: ['for_loop', 'if_statement'],
  order: 11,
  missionText:
    '**If Inside a Loop** — You can put an `if` inside a `for` loop to act on only some items.\n\nFor example:\n```python\nfor email in inbox:\n    if email.unread:\n        mark_important(email)\n```\n\n**Your mission:** Some plants in Row A are dry, some are fine. Loop through and only water the ones with moisture below 30.',
  starterCode:
    '# Loop through each plant\nfor plant in row_a:\n    # Add an if check — only water dry plants\n    ___\n',
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
        name: 'vine_1',
        species: 'vine',
        position: { x: 1, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a2',
        name: 'vine_2',
        species: 'vine',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 90,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a3',
        name: 'vine_3',
        species: 'vine',
        position: { x: 5, y: 3 },
        moisture: 22,
        health: 65,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a4',
        name: 'vine_4',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 80,
        health: 95,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
      {
        id: 'plant_a5',
        name: 'vine_5',
        species: 'vine',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 55,
        ripe: false,
        needsPollination: false,
        row: 'A',
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_a1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry plant 1 watered (moisture >= 30)',
    },
    {
      type: 'state',
      params: { entity: 'plant_a2', property: 'moisture', operator: '==', value: 50 },
      description: 'Wet plant 2 unchanged',
    },
    {
      type: 'state',
      params: { entity: 'plant_a3', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry plant 3 watered (moisture >= 30)',
    },
    {
      type: 'state',
      params: { entity: 'plant_a4', property: 'moisture', operator: '==', value: 80 },
      description: 'Wet plant 4 unchanged',
    },
    {
      type: 'state',
      params: { entity: 'plant_a5', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry plant 5 watered (moisture >= 30)',
    },
  ],
  hints: {
    direction:
      'Not every plant needs water. How can you check before watering?',
    conceptNudge:
      'Put an `if` inside the loop. Check `plant.moisture < 30` before calling water.',
    structuralHelp:
      'for plant in row_a:\n    if plant.moisture < 30:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'for_loop',
}
