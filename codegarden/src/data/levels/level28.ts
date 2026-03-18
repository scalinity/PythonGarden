import type { LevelDefinition } from '@/types/level.ts'

export const level28: LevelDefinition = {
  id: 'level-28',
  title: 'Stop Early',
  biome: 'ember_terraces',
  concepts: ['break_continue', 'for_loop', 'if_statement'],
  order: 28,
  missionText:
    'Sometimes you need to stop a loop early. The `break` keyword exits the loop immediately:\n```\nfor item in basket:\n    if item == "golden_apple":\n        break\n    print(item)\n```\nOnce the golden apple is found, the loop stops — nothing after it is processed.\n\nWater the terraces in order, but if you reach a fragile plant (health below 20), stop immediately to avoid damaging it.',
  starterCode:
    '# Water plants in order, but STOP if you hit a fragile one (health < 20)\nfor plant in plants:\n    # Add a check here — if the plant is fragile, stop the loop\n\n    sprinkler.water(plant)\n',
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
        name: 'terrace_herb_0',
        species: 'herb',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'terrace_herb_1',
        species: 'herb',
        position: { x: 2, y: 3 },
        moisture: 20,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'terrace_herb_2',
        species: 'herb',
        position: { x: 3, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'terrace_herb_3',
        species: 'herb',
        position: { x: 4, y: 3 },
        moisture: 25,
        health: 15,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'terrace_herb_4',
        species: 'herb',
        position: { x: 5, y: 3 },
        moisture: 18,
        health: 75,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'terrace_herb_5',
        species: 'herb',
        position: { x: 6, y: 3 },
        moisture: 12,
        health: 65,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 0 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 40 },
      description: 'Plant 1 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 2 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 25 },
      description: 'Fragile plant 3 not watered (loop stopped)',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '==', value: 18 },
      description: 'Plant 4 not watered (after break)',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '==', value: 12 },
      description: 'Plant 5 not watered (after break)',
    },
    {
      type: 'concept',
      params: { concept: 'break_statement' },
      description: 'break is used to exit the loop',
    },
  ],
  hints: {
    direction:
      'Check each plant\'s health before watering. If it\'s too low, use break.',
    conceptNudge:
      'Inside the loop, add: `if plant.health < 20:` followed by `break` on the next line.',
    structuralHelp:
      'for plant in plants:\n    if plant.health < 20:\n        break\n    sprinkler.water(plant)',
  },
  conceptCardId: 'break_continue',
}
