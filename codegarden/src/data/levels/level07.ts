import type { LevelDefinition } from '@/types/level.ts'

export const level07: LevelDefinition = {
  id: 'level-07',
  title: 'Make a Decision',
  biome: 'thirst_fields',
  concepts: ['if_statement', 'comparisons'],
  order: 7,
  missionText:
    '**If Statements** — An `if` statement checks a condition. If it\'s True, the indented code below runs.\n\nFor example:\n```python\nif temperature > 100:\n    alarm.sound()\n```\n\n**Your mission:** One plant is dry, one is fine. Write an `if` check so you only water the dry one. Leave the healthy plant alone!',
  starterCode:
    '# Only water the plant that needs it\n# Replace ___ with a condition that checks moisture\nif ___:\n    sprinkler.water(plant_a)\n',
  availableObjects: [
    {
      name: 'plant_a',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant_a.moisture',
          description: 'Current moisture level (number). Currently 10.',
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
          description: 'Current moisture level (number). Currently 60.',
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
      description: 'Healthy plant was left unchanged',
    },
  ],
  hints: {
    direction:
      'Which plant is dry? Compare its moisture to a threshold like 30.',
    conceptNudge:
      'The condition goes after `if`: try `if plant_a.moisture < 30:`.',
    structuralHelp:
      'if plant_a.moisture < 30:\n    sprinkler.water(plant_a)',
  },
  conceptCardId: 'if_statement',
}
