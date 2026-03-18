import type { LevelDefinition } from '@/types/level.ts'

export const level45: LevelDefinition = {
  id: 'level-45',
  title: 'Dual Reports',
  biome: 'aurora_steppe',
  concepts: ['tuple_unpacking', 'functions', 'elif', 'f_strings'],
  order: 45,
  missionText:
    'A function can return two values at once:\n`return "ok", 42`\nCapture both with tuple unpacking:\n`status, num = my_func()`\n\nWrite a `diagnose` function that returns a status string and a priority number. Use both values to decide how to treat each plant.',
  starterCode:
    '# Write a diagnose(plant) function that returns TWO values:\n#   status (string) and priority (number)\n#   - "critical", 1 if moisture < 20 AND health < 30\n#   - "thirsty", 2 if moisture < 40\n#   - "stable", 3 otherwise\n# Then loop through plants, unpack with: status, priority = diagnose(plant)\n# Priority 1: water + feed 20. Priority 2: water only.\n# Store a label for each: "species: status"\n\n',
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
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(label)',
          description: 'Stores a label string in the storage.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'steppe_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 25,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'steppe_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 35,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'steppe_moss',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 55,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'steppe_vine',
        species: 'vine',
        position: { x: 7, y: 3 },
        moisture: 10,
        health: 20,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'steppe_herb',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 42,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 3, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 7, y: 1 } }],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'tuple_unpack' },
      description: 'Tuple unpacking is used',
    },
    {
      type: 'concept',
      params: { concept: 'return_statement' },
      description: 'A return statement is used',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'Critical fern watered (moisture >= 35)',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_0', amount: 20 },
      description: 'Critical fern fed 20',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '>=', value: 30 },
      description: 'Critical vine watered (moisture >= 30)',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_3', amount: 20 },
      description: 'Critical vine fed 20',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 55 },
      description: 'Thirsty orchid watered (moisture >= 55)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '==', value: 55 },
      description: 'Stable moss unchanged',
    },
  ],
  hints: {
    direction:
      'Your diagnose function needs if/elif/else to return two values. Then unpack them and act on the priority.',
    conceptNudge:
      'Use `return "critical", 1` (two values after return). Unpack with `status, priority = diagnose(plant)`. Then check `if priority == 1:`.',
    structuralHelp:
      'def diagnose(plant):\n    if plant.moisture < 20 and plant.health < 30:\n        return "critical", 1\n    elif plant.moisture < 40:\n        return "thirsty", 2\n    else:\n        return "stable", 3\n\nfor plant in plants:\n    status, priority = diagnose(plant)\n    if priority == 1:\n        sprinkler.water(plant)\n        sprayer.feed(plant, 20)\n    elif priority == 2:\n        sprinkler.water(plant)\n    storage.store(f"{plant.species}: {status}")',
  },
  conceptCardId: 'tuple_unpacking',
}
