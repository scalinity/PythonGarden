import type { LevelDefinition } from '@/types/level.ts'

export const level30: LevelDefinition = {
  id: 'level-30',
  title: 'Ember Harvest',
  biome: 'ember_terraces',
  concepts: ['break_continue', 'for_loop', 'if_statement'],
  order: 30,
  missionText:
    'Time to combine `break` and `continue` for precise control over a loop.\n\nThe ember terraces have ripe tomatoes ready for harvest, but some need pollination first and should be skipped. Harvest exactly 3 ripe plants that don\'t need pollination, then stop.',
  starterCode:
    '# Harvest exactly 3 ripe plants\n# Some plants should be skipped — which ones?\n# Harvest the good ones, but only a limited number\nharvested = 0\n\nfor plant in plants:\n    # Which plants should be skipped?\n    # Harvest eligible ones and keep count\n    # How do you stop at exactly 3?\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (8).',
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
        name: 'ember_tomato_0',
        species: 'tomato',
        position: { x: 1, y: 3 },
        moisture: 50,
        health: 80,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'ember_tomato_1',
        species: 'tomato',
        position: { x: 2, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: true,
      },
      {
        id: 'plant_2',
        name: 'ember_tomato_2',
        species: 'tomato',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 80,
        ripe: true,
        needsPollination: true,
      },
      {
        id: 'plant_3',
        name: 'ember_tomato_3',
        species: 'tomato',
        position: { x: 4, y: 3 },
        moisture: 50,
        health: 80,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'ember_tomato_4',
        species: 'tomato',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'ember_tomato_5',
        species: 'tomato',
        position: { x: 6, y: 3 },
        moisture: 50,
        health: 80,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'ember_tomato_6',
        species: 'tomato',
        position: { x: 7, y: 3 },
        moisture: 50,
        health: 80,
        ripe: true,
        needsPollination: true,
      },
      {
        id: 'plant_7',
        name: 'ember_tomato_7',
        species: 'tomato',
        position: { x: 8, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
    drones: [
      {
        id: 'drone',
        position: { x: 5, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_0' },
      description: 'Plant 0 harvested (ripe, no pollination needed)',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_3' },
      description: 'Plant 3 harvested (ripe, no pollination needed)',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_5' },
      description: 'Plant 5 harvested (ripe, no pollination needed)',
    },
    {
      type: 'concept',
      params: { concept: 'break_statement' },
      description: 'break is used to stop after 3 harvests',
    },
    {
      type: 'concept',
      params: { concept: 'continue_statement' },
      description: 'continue is used to skip ineligible plants',
    },
  ],
  hints: {
    direction:
      'You need two continue checks (pollination and ripeness) and one break check (after counting 3).',
    conceptNudge:
      'First skip with `if plant.needs_pollination: continue`. Then skip with `if not plant.ripe: continue`. After harvesting, increment the counter and break at 3.',
    structuralHelp:
      'harvested = 0\n\nfor plant in plants:\n    if plant.needs_pollination:\n        continue\n    if not plant.ripe:\n        continue\n    drone.harvest(plant)\n    harvested = harvested + 1\n    if harvested == 3:\n        break',
  },
  conceptCardId: 'break_continue',
}
