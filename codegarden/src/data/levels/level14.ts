import type { LevelDefinition } from '@/types/level.ts'

export const level14: LevelDefinition = {
  id: 'level-14',
  title: 'Write a Recipe',
  biome: 'root_network',
  concepts: ['functions', 'function_def'],
  order: 14,
  missionText:
    '**Functions** — A function is a reusable recipe. Define it once with `def`, then call it whenever you need it.\n\nFor example:\n```python\ndef greet(name):\n    print("Hello " + name)\n\ngreet("Alice")\n```\n\n**Your mission:** Define a function that waters one plant. Then call it in a loop for every plant in the list.',
  starterCode:
    '# Define a function that waters one plant\ndef water_plant(plant):\n    ___\n\n# Call it for each plant\nfor plant in plants:\n    ___\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (3).',
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
        id: 'plant_1',
        name: 'herb_1',
        species: 'herb',
        position: { x: 2, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'herb_2',
        species: 'herb',
        position: { x: 5, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'herb_3',
        species: 'herb',
        position: { x: 8, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'function_def' },
      description: 'A function is defined',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 1 watered (moisture >= 30)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 2 watered (moisture >= 30)',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 3 watered (moisture >= 30)',
    },
  ],
  hints: {
    direction:
      'The function body should water the plant. The loop body should call the function.',
    conceptNudge:
      'Inside the function: `sprinkler.water(plant)`. In the loop: `water_plant(plant)`.',
    structuralHelp:
      'def water_plant(plant):\n    sprinkler.water(plant)\n\nfor plant in plants:\n    water_plant(plant)',
  },
  conceptCardId: 'functions',
}
