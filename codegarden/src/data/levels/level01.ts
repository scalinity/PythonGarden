import type { LevelDefinition } from '@/types/level.ts'

export const level01: LevelDefinition = {
  id: 'level-01',
  title: 'Power the Sprinkler',
  biome: 'silent_greenhouse',
  concepts: ['commands', 'sequencing'],
  order: 1,
  missionText:
    'The seedling is thirsty! Turn on the sprinkler, then use it to water the plant.',
  starterCode: '# Turn on the sprinkler\n# Then water the seedling\n',
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
    direction: 'Think about what needs to happen first before you can water.',
    conceptNudge:
      'Each line of code runs one command. Try writing sprinkler.on() first.',
    structuralHelp: 'sprinkler.on()\nsprinkler.water(plant)',
  },
  conceptCardId: 'commands',
}
