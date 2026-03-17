import type { LevelDefinition } from '@/types/level.ts'

export const level09: LevelDefinition = {
  id: 'level-09',
  title: 'Reusable Harvest Routine',
  biome: 'archive_canopy',
  concepts: ['functions', 'function_def'],
  order: 9,
  missionText:
    'Define a harvest function that checks if a plant is ripe before harvesting. Then call it for each plant.',
  starterCode:
    '# Define a harvest function\ndef harvest_if_ripe(plant):\n    if plant.ripe:\n        drone.harvest(plant)\n\n# Call it for each plant\nfor plant in plants:\n    harvest_if_ripe(plant)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants.',
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
          description: 'Harvests the given plant if it is ripe.',
        },
        {
          name: 'move_to',
          signature: 'drone.move_to(position)',
          description: 'Moves the drone to a position.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'tomato_1',
        species: 'tomato',
        position: { x: 1, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'tomato_2',
        species: 'tomato',
        position: { x: 3, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'tomato_3',
        species: 'tomato',
        position: { x: 5, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'tomato_4',
        species: 'tomato',
        position: { x: 7, y: 3 },
        moisture: 60,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
    ],
    drones: [
      {
        id: 'drone',
        position: { x: 4, y: 1 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'function_def' },
      description: 'A function is defined',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_1' },
      description: 'Ripe plant 1 harvested',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_3' },
      description: 'Ripe plant 3 harvested',
    },
  ],
  hints: {
    direction:
      'Write a function first, then call it in a loop. Only ripe plants should be harvested.',
    conceptNudge:
      'A function is defined with "def name(parameter):". The code inside only runs when you call the function.',
    structuralHelp:
      'def harvest_if_ripe(plant):\n    if plant.ripe:\n        drone.harvest(plant)\n\nfor plant in plants:\n    harvest_if_ripe(plant)',
  },
  conceptCardId: 'functions',
}
