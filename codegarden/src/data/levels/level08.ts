import type { LevelDefinition } from '@/types/level.ts'

export const level08: LevelDefinition = {
  id: 'level-08',
  title: 'Pump Until Full',
  biome: 'root_network',
  concepts: ['while_loop'],
  order: 8,
  missionText:
    'The reservoir is running low. Keep pumping water into it until it reaches maximum capacity.',
  starterCode:
    '# Pump water until the reservoir is full\nwhile reservoir.level < reservoir.max_level:\n    pump.transfer(reservoir)\n',
  availableObjects: [
    {
      name: 'reservoir',
      type: 'Reservoir',
      methods: [
        {
          name: 'level',
          signature: 'reservoir.level',
          description: 'The current water level in the reservoir.',
          returnType: 'number',
        },
        {
          name: 'max_level',
          signature: 'reservoir.max_level',
          description: 'The maximum capacity of the reservoir.',
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
          description:
            'Pumps water into the reservoir. Adds 10 units per call.',
        },
      ],
    },
  ],
  world: {
    reservoirs: [{ id: 'reservoir', level: 20, maxLevel: 100 }],
    pumps: [{ id: 'pump', transferRate: 10 }],
  },
  successConditions: [
    {
      type: 'state',
      params: {
        entity: 'reservoir',
        property: 'level',
        operator: '>=',
        value: 100,
      },
      description: 'Reservoir is full (level >= 100)',
    },
  ],
  hints: {
    direction:
      'The pump adds 10 units each time. Keep going until the reservoir is full.',
    conceptNudge:
      'A while loop repeats as long as a condition is True. "while reservoir.level < 100:" keeps looping until it\'s full.',
    structuralHelp:
      'while reservoir.level < reservoir.max_level:\n    pump.transfer(reservoir)',
  },
  conceptCardId: 'while_loop',
}
