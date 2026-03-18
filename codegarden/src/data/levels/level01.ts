import type { LevelDefinition } from '@/types/level.ts'

export const level01: LevelDefinition = {
  id: 'level-01',
  title: 'First Command',
  biome: 'silent_greenhouse',
  concepts: ['commands'],
  order: 1,
  missionText:
    '**Commands** — In Python, you tell objects what to do by writing their name, a dot, and an action.\n\nFor example:\n```python\noven.preheat()\noven.bake(cake)\n```\nEach line is one command. Python runs them top to bottom.\n\n**Your mission:** The seedling is thirsty. Turn the sprinkler on, then use it to water the seedling.',
  starterCode:
    '# Step 1: Turn on the sprinkler\nsprinkler.on()\n\n# Step 2: Water the seedling (replace ___ with the plant name)\nsprinkler.water(___)\n',
  availableObjects: [
    {
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'on',
          signature: 'sprinkler.on()',
          description: 'Turns the sprinkler on so it can spray water.',
        },
        {
          name: 'off',
          signature: 'sprinkler.off()',
          description: 'Turns the sprinkler off.',
        },
        {
          name: 'water',
          signature: 'sprinkler.water(plant)',
          description: 'Sprays water on the given plant, increasing its moisture.',
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
          description: 'The current health of the plant (number).',
          returnType: 'number',
        },
        {
          name: 'name',
          signature: 'plant.name',
          description: 'The name of the plant (string).',
          returnType: 'string',
        },
      ],
    },
  ],
  world: {
    sprinklers: [{ id: 'sprinkler', position: { x: 3, y: 2 }, isOn: false }],
    plants: [
      {
        id: 'plant',
        name: 'seedling',
        species: 'seedling',
        position: { x: 5, y: 2 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'sprinkler', property: 'isOn', value: true },
      description: 'Sprinkler is turned on',
    },
    {
      type: 'state',
      params: { entity: 'plant', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant moisture is at least 30',
    },
  ],
  hints: {
    direction: 'The sprinkler is already turned on for you. What object needs to go inside water()?',
    conceptNudge:
      'Commands use the pattern `object.action()`. The plant object is called `plant`.',
    structuralHelp: 'sprinkler.on()\nsprinkler.water(plant)',
  },
  conceptCardId: 'commands',
}
