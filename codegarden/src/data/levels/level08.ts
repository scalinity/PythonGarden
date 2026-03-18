import type { LevelDefinition } from '@/types/level.ts'

export const level08: LevelDefinition = {
  id: 'level-08',
  title: 'Two Paths',
  biome: 'thirst_fields',
  concepts: ['if_statement', 'else'],
  order: 8,
  missionText:
    '**If/Else** — Sometimes you need two paths: one for when a condition is True, another for when it\'s False.\n\nFor example:\n```python\nif score >= 50:\n    print("pass")\nelse:\n    print("fail")\n```\n\n**Your mission:** Sunlight is at 90. If it is above 60, close the canopy to protect the plants. Otherwise, open it to let light in.',
  starterCode:
    '# Check the sunlight and act accordingly\nif weather.sunlight > 60:\n    ___\nelse:\n    ___\n',
  availableObjects: [
    {
      name: 'weather',
      type: 'Weather',
      methods: [
        {
          name: 'sunlight',
          signature: 'weather.sunlight',
          description: 'The current sunlight intensity (0-100). Currently 90.',
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
    canopies: [{ id: 'canopy', isOpen: true }],
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
      'Sunlight is 90, which is above 60. Which branch should run — the if or the else?',
    conceptNudge:
      'Fill in the action for each branch. When sunny: `canopy.close()`. Otherwise: `canopy.open()`.',
    structuralHelp:
      'if weather.sunlight > 60:\n    canopy.close()\nelse:\n    canopy.open()',
  },
  conceptCardId: 'if_statement',
}
