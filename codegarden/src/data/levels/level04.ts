import type { LevelDefinition } from '@/types/level.ts'

export const level04: LevelDefinition = {
  id: 'level-04',
  title: 'Use What You Stored',
  biome: 'silent_greenhouse',
  concepts: ['variables', 'properties'],
  order: 4,
  missionText:
    '**Properties** — You can read a property from an object and store it in a variable.\n\nFor example:\n```python\nspeed = car.velocity\nremaining = 200 - speed\n```\n\n**Your mission:** Two plants need different amounts of water. Read each plant\'s moisture, calculate how much more it needs to reach 50, and spray the right amount for each.',
  starterCode:
    '# Plant A has some moisture already — figure out how much more it needs\ndeficit_a = 50 - ___\nsprinkler.spray(deficit_a)\n\n# Now do the same for Plant B\ndeficit_b = 50 - ___\nsprinkler.spray(deficit_b)\n',
  availableObjects: [
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'spray',
          signature: 'sprinkler.spray(amount)',
          description: 'Sprays the given amount of water.',
        },
      ],
    },
    {
      name: 'plant_a',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant_a.moisture',
          description: 'Current moisture level (number). Currently 35.',
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
          description: 'Current moisture level (number). Currently 15.',
          returnType: 'number',
        },
      ],
    },
  ],
  world: {
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 3 }, isOn: true }],
    plants: [
      {
        id: 'plant_a',
        name: 'tulip',
        species: 'tulip',
        position: { x: 2, y: 3 },
        moisture: 35,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_b',
        name: 'lily',
        species: 'lily',
        position: { x: 6, y: 3 },
        moisture: 15,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_a', property: 'moisture', operator: '>=', value: 50 },
      description: 'Plant A moisture is at least 50',
    },
    {
      type: 'state',
      params: { entity: 'plant_b', property: 'moisture', operator: '>=', value: 50 },
      description: 'Plant B moisture is at least 50',
    },
    {
      type: 'concept',
      params: { concept: 'variable_assignment' },
      description: 'Variables are used to calculate deficit',
    },
  ],
  hints: {
    direction:
      'Each blank should read the plant\'s moisture. What property tells you how wet a plant is?',
    conceptNudge:
      'You can read a property like `plant_a.moisture` and use it in math: `50 - plant_a.moisture`.',
    structuralHelp:
      'deficit_a = 50 - plant_a.moisture\nsprinkler.spray(deficit_a)\n\ndeficit_b = 50 - plant_b.moisture\nsprinkler.spray(deficit_b)',
  },
  conceptCardId: 'variables',
}
