import type { LevelDefinition } from '@/types/level.ts'

export const level07: LevelDefinition = {
  id: 'level-07',
  title: 'Water Only the Dry Ones',
  biome: 'pollinator_ridge',
  concepts: ['for_loop', 'if_statement'],
  order: 7,
  missionText:
    'Some plants are already watered. Loop through the row and only water plants with moisture below 30.',
  starterCode:
    '# Loop through each plant\nfor plant in row_a:\n    if plant.moisture < 30:\n        sprinkler.water(plant)\n',
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
      'You need to combine a loop with a check. Not every plant needs water.',
    conceptNudge:
      'Put an if statement inside the for loop. Only call sprinkler.water() when moisture is below 30.',
    structuralHelp:
      'for plant in row_a:\n    if plant.moisture < 30:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'for_loop',
}
