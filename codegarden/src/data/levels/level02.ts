import type { LevelDefinition } from '@/types/level.ts'

export const level02: LevelDefinition = {
  id: 'level-02',
  title: 'Two Commands',
  biome: 'silent_greenhouse',
  concepts: ['commands', 'arguments'],
  order: 2,
  missionText:
    '**Arguments** — Some commands need extra information, which you put inside the parentheses.\n\nFor example:\n```python\nrobot.pick_up(box)\nrobot.deliver(box)\n```\nThe argument tells the command *what* to act on.\n\n**Your mission:** A flower needs pollinating. Move the drone to the flower, then pollinate it.',
  starterCode:
    '# Step 1: Move the drone to the flower (replace ___ with the target)\ndrone.move_to(___)\n\n# Step 2: Pollinate the flower (replace ___ with the target)\ndrone.pollinate(___)\n',
  availableObjects: [
    {
      name: 'drone',
      type: 'Drone',
      methods: [
        {
          name: 'move_to',
          signature: 'drone.move_to(target)',
          description: 'Moves the drone to the given target.',
        },
        {
          name: 'pollinate',
          signature: 'drone.pollinate(plant)',
          description: 'Pollinates the given plant.',
        },
      ],
    },
    {
      name: 'flower',
      type: 'Plant',
      methods: [
        {
          name: 'needsPollination',
          signature: 'flower.needs_pollination',
          description: 'Whether this plant needs pollination (True/False).',
          returnType: 'bool',
        },
        {
          name: 'name',
          signature: 'flower.name',
          description: 'The name of the plant.',
          returnType: 'string',
        },
      ],
    },
  ],
  world: {
    drones: [
      {
        id: 'drone',
        position: { x: 1, y: 1 },
        direction: 'south',
        carrying: null,
      },
    ],
    plants: [
      {
        id: 'flower',
        name: 'sunflower',
        species: 'sunflower',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: true,
      },
    ],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'drone_pollinate', target: 'flower' },
      description: 'Flower has been pollinated',
    },
    {
      type: 'state',
      params: { entity: 'flower', property: 'needsPollination', value: false },
      description: 'Flower no longer needs pollination',
    },
  ],
  hints: {
    direction: 'The drone must reach the flower before it can pollinate. What object is the flower?',
    conceptNudge:
      'Put the target object name inside the parentheses: `drone.move_to(flower)`.',
    structuralHelp: 'drone.move_to(flower)\ndrone.pollinate(flower)',
  },
  conceptCardId: 'commands',
}
