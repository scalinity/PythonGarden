import type { LevelDefinition } from '@/types/level.ts'

export const level12: LevelDefinition = {
  id: 'level-12',
  title: 'Keep Going',
  biome: 'pollinator_ridge',
  concepts: ['while_loop'],
  order: 12,
  missionText:
    '**While Loops** — A `while` loop repeats as long as a condition stays True.\n\nFor example:\n```python\nwhile cups < 5:\n    pour_tea()\n```\nThis keeps pouring until you have 5 cups.\n\n**Your mission:** This plant needs a lot of water. Keep watering it until its moisture reaches at least 60.',
  starterCode:
    '# Write a while loop to keep watering\n# until the plant\'s moisture reaches 60\n\n',
  availableObjects: [
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'water',
          signature: 'sprinkler.water(plant)',
          description: 'Waters the plant, adding 20 moisture each time.',
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
          description: 'Current moisture level (number). Currently 10.',
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
        name: 'thirsty_fern',
        species: 'fern',
        position: { x: 5, y: 2 },
        moisture: 10,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant', property: 'moisture', operator: '>=', value: 60 },
      description: 'Plant moisture reaches at least 60',
    },
  ],
  hints: {
    direction:
      'You need to repeat the watering many times. What kind of loop keeps going until a condition changes?',
    conceptNudge:
      'A `while` loop checks its condition each time. Try `while plant.moisture < 60:`.',
    structuralHelp:
      'while plant.moisture < 60:\n    sprinkler.water(plant)',
  },
  conceptCardId: 'while_loop',
}
