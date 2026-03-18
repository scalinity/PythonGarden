import type { LevelDefinition } from '@/types/level.ts'

export const level20: LevelDefinition = {
  id: 'level-20',
  title: 'Garden Master',
  biome: 'crystal_summit',
  concepts: ['functions', 'dictionaries', 'for_loop', 'if_statement'],
  order: 20,
  missionText:
    '**Putting It All Together** — Functions, dictionaries, loops, and conditionals can combine to solve complex problems.\n\nFor example:\n```python\ndef process(item):\n    if item.urgent:\n        handle(item)\n```\n\n**Your mission:** Define a function that cares for one plant: water it if dry, feed it if unhealthy (using the nutrient dictionary), and harvest it if ripe. Then call your function for every plant in the garden.',
  starterCode:
    '# Nutrient amounts per species\nnutrients = {"fern": 10, "orchid": 25, "moss": 5,\n             "tomato": 15, "herb": 8, "vine": 12}\n\n# Define your care function\ndef care_for(plant):\n    # Water if dry (moisture < 30)\n\n    # Feed if unhealthy (health < 50)\n\n    # Harvest if ripe\n\n\n# Care for every plant\nfor plant in plants:\n    care_for(plant)\n',
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
      name: 'sprinkler',
      type: 'Sprinkler',
      methods: [
        {
          name: 'water',
          signature: 'sprinkler.water(plant)',
          description: 'Waters the given plant, adding 20 moisture.',
        },
      ],
    },
    {
      name: 'sprayer',
      type: 'Sprayer',
      methods: [
        {
          name: 'feed',
          signature: 'sprayer.feed(plant, amount)',
          description: 'Feeds the plant with the given nutrient amount.',
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
        id: 'plant_1',
        name: 'garden_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 10,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'garden_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 30,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'garden_tomato',
        species: 'tomato',
        position: { x: 5, y: 3 },
        moisture: 60,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'garden_moss',
        species: 'moss',
        position: { x: 7, y: 3 },
        moisture: 20,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'garden_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 70,
        health: 95,
        ripe: true,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'garden_vine',
        species: 'vine',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 25,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 6, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 6, y: 5 } }],
    drones: [
      {
        id: 'drone',
        position: { x: 6, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'function_def' },
      description: 'A care function is defined',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry fern watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'health', operator: '>=', value: 50 },
      description: 'Unhealthy orchid fed',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_3' },
      description: 'Ripe tomato harvested',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry moss watered',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_5' },
      description: 'Ripe herb harvested',
    },
  ],
  hints: {
    direction:
      'Your function needs three if checks: one for dry, one for unhealthy, one for ripe.',
    conceptNudge:
      'Use `if plant.moisture < 30:` to check dry. Use `nutrients[plant.species]` to look up the feed amount.',
    structuralHelp:
      'nutrients = {"fern": 10, "orchid": 25, "moss": 5,\n             "tomato": 15, "herb": 8, "vine": 12}\n\ndef care_for(plant):\n    if plant.moisture < 30:\n        sprinkler.water(plant)\n    if plant.health < 50:\n        amount = nutrients[plant.species]\n        sprayer.feed(plant, amount)\n    if plant.ripe:\n        drone.harvest(plant)\n\nfor plant in plants:\n    care_for(plant)',
  },
  conceptCardId: 'functions',
}
