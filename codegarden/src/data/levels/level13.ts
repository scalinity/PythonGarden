import type { LevelDefinition } from '@/types/level.ts'

export const level13: LevelDefinition = {
  id: 'level-13',
  title: 'Pump It Up',
  biome: 'root_network',
  concepts: ['while_loop'],
  order: 13,
  missionText:
    '**While Loops** — While loops are great for "keep doing X until Y is done" patterns.\n\nFor example:\n```python\nwhile tank.fuel < 50:\n    station.refuel(tank)\n```\nThis keeps refueling until the tank is at least half full.\n\n**Your mission:** The reservoir is running low. Keep pumping until it reaches maximum capacity.',
  starterCode:
    '# Pump water until the reservoir is full\n# Write a while loop here\n\n',
  availableObjects: [
    {
      name: 'reservoir',
      type: 'Reservoir',
      methods: [
        {
          name: 'level',
          signature: 'reservoir.level',
          description: 'The current water level. Currently 20.',
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
          description: 'Pumps 10 units of water into the reservoir.',
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
      'The pump adds 10 each time. What condition should the loop check?',
    conceptNudge:
      'Use `while reservoir.level < 100:` or `while reservoir.level < reservoir.max_level:`.',
    structuralHelp:
      'while reservoir.level < reservoir.max_level:\n    pump.transfer(reservoir)',
  },
  conceptCardId: 'while_loop',
}
