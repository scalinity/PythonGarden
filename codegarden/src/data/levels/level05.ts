import type { LevelDefinition } from '@/types/level.ts'

export const level05: LevelDefinition = {
  id: 'level-05',
  title: 'Shade Logic',
  biome: 'thirst_fields',
  concepts: ['if_statement', 'else'],
  order: 5,
  missionText:
    'The canopy should open when sunlight is low and close when sunlight is high. Use if/else to decide.',
  starterCode:
    '# Check the sunlight level\nif weather.sunlight > 60:\n    # Too bright - close the canopy\n    ___\nelse:\n    # Not enough light - open the canopy\n    ___\n',
  availableObjects: [
    {
      name: 'weather',
      type: 'Weather',
      methods: [
        {
          name: 'sunlight',
          signature: 'weather.sunlight',
          description: 'The current sunlight intensity (0-100).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'canopy',
      type: 'Canopy',
      methods: [
        {
          name: 'open',
          signature: 'canopy.open()',
          description: 'Opens the canopy to let sunlight through.',
        },
        {
          name: 'close',
          signature: 'canopy.close()',
          description: 'Closes the canopy to block sunlight.',
        },
        {
          name: 'isOpen',
          signature: 'canopy.isOpen',
          description: 'Whether the canopy is currently open (True/False).',
          returnType: 'bool',
        },
      ],
    },
  ],
  world: {
    canopies: [{ id: 'canopy', isOpen: false }],
    weather: { sunlight: 90, temperature: 25 },
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'canopy_close' },
      description: 'Canopy was closed (sunlight is high)',
    },
  ],
  hints: {
    direction:
      'If sunlight is above 60, the canopy should close. Otherwise, it should open.',
    conceptNudge:
      'An if/else gives you two paths. The else block runs when the if condition is False.',
    structuralHelp:
      'if weather.sunlight > 60:\n    canopy.close()\nelse:\n    canopy.open()',
  },
  conceptCardId: 'if_statement',
}
