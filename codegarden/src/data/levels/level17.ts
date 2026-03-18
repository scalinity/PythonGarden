import type { LevelDefinition } from '@/types/level.ts'

export const level17: LevelDefinition = {
  id: 'level-17',
  title: 'Look It Up',
  biome: 'memory_marsh',
  concepts: ['dictionaries'],
  order: 17,
  missionText:
    '**Dictionaries** — A dictionary maps keys to values, like a lookup table.\n\nFor example:\n```python\nprices = {"apple": 2, "banana": 1}\ncost = prices["apple"]  # 2\n```\n\n**Your mission:** Each species needs a different nutrient amount. Create a dictionary mapping species names to their dose, then feed each plant the right amount.',
  starterCode:
    '# Create a nutrient lookup table\nnutrients = {\n    ___\n}\n\n# Feed each plant the correct amount\nfor plant in plants:\n    amount = nutrients[plant.species]\n    sprayer.feed(plant, amount)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (3).',
          returnType: 'number',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'forest_fern',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'wild_orchid',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'cave_moss',
        species: 'moss',
        position: { x: 8, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 1 } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'dictionary_usage' },
      description: 'A dictionary is used',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_1', amount: 10 },
      description: 'Fern fed 10 nutrients',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_2', amount: 25 },
      description: 'Orchid fed 25 nutrients',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_3', amount: 5 },
      description: 'Moss fed 5 nutrients',
    },
  ],
  hints: {
    direction:
      'Fill in the dictionary with species names as keys and numbers as values.',
    conceptNudge:
      'Each entry is `"key": value`. Separate entries with commas: `"fern": 10, "orchid": 25, "moss": 5`.',
    structuralHelp:
      'nutrients = {\n    "fern": 10,\n    "orchid": 25,\n    "moss": 5\n}\n\nfor plant in plants:\n    amount = nutrients[plant.species]\n    sprayer.feed(plant, amount)',
  },
  conceptCardId: 'dictionaries',
}
