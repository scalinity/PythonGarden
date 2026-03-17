import type { LevelDefinition } from '@/types/level.ts'

export const level02: LevelDefinition = {
  id: 'level-02',
  title: 'Store the Water Value',
  biome: 'silent_greenhouse',
  concepts: ['variables', 'numbers'],
  order: 2,
  missionText:
    'The plant needs exactly the right amount of water. Store the amount in a variable, then spray it.',
  starterCode:
    '# Store how much water is needed\nwater_needed = ___\n\n# Spray that amount\nsprinkler.spray(water_needed)\n',
  availableObjects: [
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'spray',
          signature: 'sprinkler.spray(amount)',
          description:
            'Sprays the given amount of water on the plant. The amount must be a number.',
        },
        {
          name: 'on',
          signature: 'sprinkler.on()',
          description: 'Turns the sprinkler on.',
        },
        {
          name: 'off',
          signature: 'sprinkler.off()',
          description: 'Turns the sprinkler off.',
        },
      ],
    },
    {
      name: 'plant',
      type: 'Plant',
      methods: [
        {
          name: 'moisture',
          signature: 'plant.moisture',
          description: 'The current moisture level of the plant (number).',
          returnType: 'number',
        },
        {
          name: 'health',
          signature: 'plant.health',
          description: 'The current health of the plant.',
          returnType: 'number',
        },
      ],
    },
  ],
  world: {
    sprinklers: [{ id: 'sprinkler', position: { x: 3, y: 2 }, isOn: true }],
    plants: [
      {
        id: 'plant',
        name: 'daisy',
        species: 'daisy',
        position: { x: 5, y: 2 },
        moisture: 20,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant', property: 'moisture', operator: '>=', value: 50 },
      description: 'Plant moisture reaches at least 50',
    },
    {
      type: 'concept',
      params: { concept: 'variable_assignment' },
      description: 'A variable is used to store the water amount',
    },
  ],
  hints: {
    direction:
      'How much water does the plant need? Its moisture is 20 and the target is 50.',
    conceptNudge:
      'A variable stores a value. Replace ___ with the number of water units needed.',
    structuralHelp: 'water_needed = 30\nsprinkler.spray(water_needed)',
  },
  conceptCardId: 'variables',
}
