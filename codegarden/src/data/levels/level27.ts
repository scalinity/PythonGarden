import type { LevelDefinition } from '@/types/level.ts'

export const level27: LevelDefinition = {
  id: 'level-27',
  title: 'Terrace Rows',
  biome: 'ember_terraces',
  concepts: ['range_loops'],
  order: 27,
  missionText:
    'You can give `range()` a start and stop value:\n```\nfor i in range(2, 5):\n    print(i)\n```\nThis prints 2, 3, 4 — it starts at 2 and stops BEFORE 5.\n\nOnly the middle terraces (positions 2 through 5) need water. Use `range(start, stop)` to water just those plants.',
  starterCode:
    '# Only water plants at positions 2 through 5\nfor i in range(___, ___):\n    sprinkler.water(plants[i])\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (8).',
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
        name: 'terrace_herb_0',
        species: 'herb',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'terrace_herb_1',
        species: 'herb',
        position: { x: 2, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'terrace_herb_2',
        species: 'herb',
        position: { x: 3, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'terrace_herb_3',
        species: 'herb',
        position: { x: 4, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'terrace_herb_4',
        species: 'herb',
        position: { x: 5, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'terrace_herb_5',
        species: 'herb',
        position: { x: 6, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'terrace_herb_6',
        species: 'herb',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_7',
        name: 'terrace_herb_7',
        species: 'herb',
        position: { x: 8, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 0 left dry (not in range)',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 1 left dry (not in range)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 2 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 3 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 4 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 5 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_6', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 6 left dry (not in range)',
    },
    {
      type: 'state',
      params: { entity: 'plant_7', property: 'moisture', operator: '==', value: 15 },
      description: 'Plant 7 left dry (not in range)',
    },
  ],
  hints: {
    direction:
      'Which indices should be watered? Remember, range(start, stop) stops BEFORE the stop value.',
    conceptNudge:
      'You want indices 2, 3, 4, 5. What start and stop values give you that sequence?',
    structuralHelp:
      'for i in range(2, 6):\n    sprinkler.water(plants[i])',
  },
  conceptCardId: 'range_loops',
}
