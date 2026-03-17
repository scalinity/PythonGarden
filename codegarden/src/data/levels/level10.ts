import type { LevelDefinition } from '@/types/level.ts'

export const level10: LevelDefinition = {
  id: 'level-10',
  title: 'Species Nutrient Map',
  biome: 'memory_marsh',
  concepts: ['dictionaries'],
  order: 10,
  missionText:
    'Each species needs a different nutrient amount. Use a dictionary to map species to their feed amount, then feed each plant the right dose.',
  starterCode:
    '# Create a nutrient map\nnutrients = {\n    "fern": 10,\n    "orchid": 25,\n    "moss": 5\n}\n\n# Feed each plant the correct amount\nfor plant in plants:\n    amount = nutrients[plant.species]\n    sprayer.feed(plant, amount)\n',
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
      name: 'sprayer',
      type: 'Sprayer',
      methods: [
        {
          name: 'feed',
          signature: 'sprayer.feed(plant, amount)',
          description:
            'Feeds the plant with the given nutrient amount.',
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
      description: 'A dictionary is used to look up nutrient amounts',
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
      'A dictionary lets you look up a value by its key. Map each species to the right number.',
    conceptNudge:
      'Dictionaries use curly braces: {"key": value}. Access a value with dict["key"].',
    structuralHelp:
      'nutrients = {"fern": 10, "orchid": 25, "moss": 5}\n\nfor plant in plants:\n    amount = nutrients[plant.species]\n    sprayer.feed(plant, amount)',
  },
  conceptCardId: 'dictionaries',
}
