import type { LevelDefinition } from '@/types/level.ts'

export const level16: LevelDefinition = {
  id: 'level-16',
  title: 'Build a List',
  biome: 'archive_canopy',
  concepts: ['lists', 'list_operations'],
  order: 16,
  missionText:
    '**Building Lists** — You can build a list as you go using `.append()` to add items one at a time.\n\nFor example:\n```python\nwinners = []\nfor runner in race:\n    if runner.time < 10:\n        winners.append(runner)\n```\n\n**Your mission:** Loop through the plants, collect the ripe ones into a list, then loop through your list and harvest each one.',
  starterCode:
    '# Build a list of ripe plants\nripe_plants = []\nfor plant in plants:\n    if ___:\n        ripe_plants.append(___)\n\n# Harvest each ripe plant\nfor plant in ripe_plants:\n    ___\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (5).',
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
      {
        id: 'plant_5',
        name: 'tomato_5',
        species: 'tomato',
        position: { x: 9, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
    ],
    drones: [
      {
        id: 'drone',
        position: { x: 5, y: 1 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'list_append' },
      description: 'Items added to a list with .append()',
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
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_5' },
      description: 'Ripe plant 5 harvested',
    },
  ],
  hints: {
    direction:
      'First find the ripe ones, then harvest them. Check the `ripe` property.',
    conceptNudge:
      'Use `if plant.ripe:` to check, then `ripe_plants.append(plant)` to add it to the list.',
    structuralHelp:
      'ripe_plants = []\nfor plant in plants:\n    if plant.ripe:\n        ripe_plants.append(plant)\n\nfor plant in ripe_plants:\n    drone.harvest(plant)',
  },
  conceptCardId: 'list_operations',
}
