import type { LevelDefinition } from '@/types/level.ts'

export const level39: LevelDefinition = {
  id: 'level-39',
  title: 'Quick Filter',
  biome: 'tide_pools',
  concepts: ['list_comprehensions', 'for_loop', 'if_statement'],
  order: 39,
  missionText:
    'A list comprehension builds a new list in one line:\n\n`[x * 2 for x in numbers if x > 3]`\n\nThis takes each number, keeps only those above 3, and doubles them.\n\nUse a list comprehension to find all ripe plants, then harvest each one.',
  starterCode:
    '# Build a list of ripe plants using a list comprehension:\n#   [item for item in collection if condition]\n# Then harvest each one with drone.harvest(plant)\n\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (6).',
          returnType: 'number',
        },
      ],
    },
    {
      name: 'drone',
      type: 'Drone',
      methods: [
        {
          name: 'harvest',
          signature: 'drone.harvest(plant)',
          description: 'Harvests the given plant.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'pool_tomato_0',
        species: 'tomato',
        position: { x: 1, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'pool_tomato_1',
        species: 'tomato',
        position: { x: 3, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'pool_tomato_2',
        species: 'tomato',
        position: { x: 5, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'pool_tomato_3',
        species: 'tomato',
        position: { x: 7, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'pool_tomato_4',
        species: 'tomato',
        position: { x: 9, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'pool_tomato_5',
        species: 'tomato',
        position: { x: 11, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
    ],
    drones: [
      {
        id: 'drone',
        position: { x: 4, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'list_comprehension' },
      description: 'Uses a list comprehension',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_0' },
      description: 'Ripe plant 0 harvested',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_2' },
      description: 'Ripe plant 2 harvested',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_4' },
      description: 'Ripe plant 4 harvested',
    },
  ],
  hints: {
    direction:
      'First build the filtered list with a comprehension, then loop through it to harvest.',
    conceptNudge:
      'Filter with `[p for p in plants if p.ripe]`, then use a for loop to harvest each one.',
    structuralHelp:
      'ripe_plants = [p for p in plants if p.ripe]\n\nfor plant in ripe_plants:\n    drone.harvest(plant)',
  },
  conceptCardId: 'list_comprehensions',
}
