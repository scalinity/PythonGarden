import type { LevelDefinition } from '@/types/level.ts'

export const level49: LevelDefinition = {
  id: 'level-49',
  title: 'Ecosystem Balancer',
  biome: 'genesis_crater',
  concepts: ['sorted_key', 'break_continue', 'nested_dictionaries', 'functions'],
  order: 49,
  missionText:
    'Balance the crater ecosystem within a limited budget. You have 10 plants with varying moisture and health levels, but you can only perform 30 actions total.\n\nPrioritize the most urgent plants, treat them with species-specific care, and fill the reservoir to full capacity.',
  starterCode:
    '# Balance the ecosystem within a limited action budget\n# Species data: fern(feed:10, priority:2), orchid(feed:25, priority:1),\n#   moss(feed:5, priority:3), vine(feed:12, priority:2), herb(feed:8, priority:1)\n# 1. Build a config dict with feed amounts and base priorities\n# 2. Calculate urgency: base priority + bonus for low moisture\n# 3. Sort plants by urgency, treat the top 6 only (use break)\n# 4. Fill the reservoir\n\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (10).',
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
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(item)',
          description: 'Stores an item (string or plant) in general storage.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'crater_fern_1',
        species: 'fern',
        position: { x: 1, y: 2 },
        moisture: 15,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'crater_orchid_1',
        species: 'orchid',
        position: { x: 2, y: 2 },
        moisture: 40,
        health: 30,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'crater_moss_1',
        species: 'moss',
        position: { x: 3, y: 2 },
        moisture: 8,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'crater_vine_1',
        species: 'vine',
        position: { x: 4, y: 2 },
        moisture: 50,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'crater_herb_1',
        species: 'herb',
        position: { x: 5, y: 2 },
        moisture: 22,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'crater_fern_2',
        species: 'fern',
        position: { x: 6, y: 2 },
        moisture: 35,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'crater_orchid_2',
        species: 'orchid',
        position: { x: 7, y: 2 },
        moisture: 12,
        health: 25,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_7',
        name: 'crater_moss_2',
        species: 'moss',
        position: { x: 8, y: 2 },
        moisture: 45,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_8',
        name: 'crater_vine_2',
        species: 'vine',
        position: { x: 9, y: 2 },
        moisture: 18,
        health: 35,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_9',
        name: 'crater_herb_2',
        species: 'herb',
        position: { x: 10, y: 2 },
        moisture: 55,
        health: 75,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 5 } }],
    drones: [
      {
        id: 'drone',
        position: { x: 5, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
    reservoirs: [{ id: 'reservoir', level: 20, maxLevel: 100 }],
    pumps: [{ id: 'pump', transferRate: 10 }],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'resource',
      params: { maxActions: 30 },
      description: 'Completed within 30 actions',
    },
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
    {
      type: 'concept',
      params: { concept: 'sorted_key' },
      description: 'sorted() with key= is used',
    },
    {
      type: 'concept',
      params: { concept: 'break_statement' },
      description: 'break is used to limit treatment',
    },
  ],
  hints: {
    direction:
      'Build a config dict mapping species to feed amount and priority. Then score each plant by urgency and sort.',
    conceptNudge:
      'Use sorted(plants, key=lambda p: ...) to rank by urgency. Loop through the sorted list and break after 6.',
    structuralHelp:
      'config = {\n    "fern":   {"feed": 10, "priority": 2},\n    "orchid": {"feed": 25, "priority": 1},\n    "moss":   {"feed": 5,  "priority": 3},\n    "vine":   {"feed": 12, "priority": 2},\n    "herb":   {"feed": 8,  "priority": 1},\n}\n\ndef urgency(plant):\n    base = config[plant.species]["priority"]\n    bonus = 3 if plant.moisture < 20 else 0\n    return base + bonus\n\nranked = sorted(plants, key=urgency, reverse=True)\ncount = 0\nfor plant in ranked:\n    if count >= 6:\n        break\n    sprinkler.water(plant)\n    amt = config[plant.species]["feed"]\n    sprayer.feed(plant, amt)\n    count = count + 1\n\nwhile reservoir.level < reservoir.max_level:\n    pump.transfer(reservoir)',
  },
  conceptCardId: 'sorted_key',
}
