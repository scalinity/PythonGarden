import type { LevelDefinition } from '@/types/level.ts'

export const level26: LevelDefinition = {
  id: 'level-26',
  title: 'Counting Steps',
  biome: 'ember_terraces',
  concepts: ['range_loops', 'for_loop'],
  order: 26,
  missionText:
    'The `range()` function generates a sequence of numbers you can loop over:\n```\nfor i in range(3):\n    print(i)\n```\nThis prints 0, 1, 2 — exactly 3 times.\n\nThe reservoir needs exactly 5 pump cycles. Use `range()` to pump precisely that many times.',
  starterCode:
    '# Pump exactly 5 times to fill the reservoir\nfor i in range(___):\n    pump.transfer(reservoir)\n',
  availableObjects: [
    {
      name: 'reservoir',
      type: 'Reservoir',
      methods: [
        {
          name: 'level',
          signature: 'reservoir.level',
          description: 'The current water level. Currently 0.',
          returnType: 'number',
        },
        {
          name: 'max_level',
          signature: 'reservoir.max_level',
          description: 'The maximum capacity (100).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'pump',
      type: 'Pump',
      methods: [
        {
          name: 'transfer',
          signature: 'pump.transfer(reservoir)',
          description: 'Pumps 20 units of water into the reservoir.',
        },
      ],
    },
  ],
  world: {
    reservoirs: [{ id: 'reservoir', level: 0, maxLevel: 100 }],
    pumps: [{ id: 'pump', transferRate: 20 }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'reservoir', property: 'level', operator: '>=', value: 100 },
      description: 'Reservoir is full (level >= 100)',
    },
    {
      type: 'concept',
      params: { concept: 'range_call' },
      description: 'range() is used',
    },
    {
      type: 'resource',
      params: { maxActions: 5 },
      description: 'Completed in exactly 5 pump cycles',
    },
  ],
  hints: {
    direction:
      'How many times does the pump need to run? Put that number inside range().',
    conceptNudge:
      'range(5) produces the numbers 0, 1, 2, 3, 4 — that is 5 iterations.',
    structuralHelp:
      'for i in range(5):\n    pump.transfer(reservoir)',
  },
  conceptCardId: 'range_loops',
}
