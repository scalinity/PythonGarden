import type { LevelDefinition } from '@/types/level.ts'

export const level04: LevelDefinition = {
  id: 'level-04',
  title: 'Check the Dry Plant',
  biome: 'thirst_fields',
  concepts: ['booleans', 'comparisons', 'if_statement'],
  order: 4,
  missionText:
    'One plant is dry and one is fine. Check each plant\'s moisture and only water the dry one.',
  starterCode:
    '# Check if a plant needs water\nif plant_a.moisture < 30:\n    sprinkler.water(plant_a)\n\nif plant_b.moisture < 30:\n    sprinkler.water(plant_b)\n',
  availableObjects: [
    {
      name: 'plant_a',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant_a.moisture',
          description: 'Current moisture level (number).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'plant_b',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant_b.moisture',
          description: 'Current moisture level (number).',
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
        id: 'plant_a',
        name: 'wilted_rose',
        species: 'rose',
        position: { x: 2, y: 3 },
        moisture: 10,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_b',
        name: 'healthy_lily',
        species: 'lily',
        position: { x: 6, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 3 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: {
        entity: 'plant_a',
        property: 'moisture',
        operator: '>=',
        value: 30,
      },
      description: 'Dry plant has been watered (moisture >= 30)',
    },
    {
      type: 'state',
      params: {
        entity: 'plant_b',
        property: 'moisture',
        operator: '==',
        value: 60,
      },
      description: 'Wet plant was left unchanged',
    },
  ],
  hints: {
    direction:
      'Compare each plant\'s moisture to 30. Only water plants below that threshold.',
    conceptNudge:
      'An if statement checks a condition. "if plant.moisture < 30:" runs the indented code only when moisture is low.',
    structuralHelp:
      'if plant_a.moisture < 30:\n    sprinkler.water(plant_a)\n\nif plant_b.moisture < 30:\n    sprinkler.water(plant_b)',
  },
  conceptCardId: 'if_statement',
}
