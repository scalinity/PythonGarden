import type { LevelDefinition } from '@/types/level.ts'

export const level40: LevelDefinition = {
  id: 'level-40',
  title: 'Nested Records',
  biome: 'tide_pools',
  concepts: ['nested_dictionaries', 'dictionaries', 'for_loop'],
  order: 40,
  missionText:
    'A dictionary can hold another dictionary inside it:\n\n`menu = {"pizza": {"price": 12, "size": "large"}}`\n`menu["pizza"]["price"]` gives 12.\n\nEach species has a care plan. Look up the correct nutrient amount for each plant and feed it.',
  starterCode:
    '# Each species has a care plan with water and nutrient amounts\n# Access nested values: care_plans["fern"]["nutrients"] gives 10\ncare_plans = {\n    "fern":   {"water": 20, "nutrients": 10},\n    "orchid": {"water": 15, "nutrients": 25},\n    "moss":   {"water": 30, "nutrients": 5},\n    "vine":   {"water": 10, "nutrients": 12},\n}\n\n# Loop through plants, look up each one\'s care plan, feed the right amount\n\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (4).',
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
          description: 'Feeds the plant with the given nutrient amount, increasing health.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'pool_fern',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 50,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'pool_orchid',
        species: 'orchid',
        position: { x: 4, y: 3 },
        moisture: 50,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'pool_moss',
        species: 'moss',
        position: { x: 6, y: 3 },
        moisture: 50,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'pool_vine',
        species: 'vine',
        position: { x: 8, y: 3 },
        moisture: 50,
        health: 60,
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
      description: 'Uses dictionary lookup',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'health', operator: '>=', value: 70 },
      description: 'Fern fed 10 nutrients',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'health', operator: '>=', value: 85 },
      description: 'Orchid fed 25 nutrients',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'health', operator: '>=', value: 65 },
      description: 'Moss fed 5 nutrients',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'health', operator: '>=', value: 72 },
      description: 'Vine fed 12 nutrients',
    },
  ],
  hints: {
    direction:
      'Loop through each plant, use its species to look up the nested care plan, then feed the nutrient amount.',
    conceptNudge:
      'Access the nested value: `care_plans[plant.species]["nutrients"]` gives the right amount for each species.',
    structuralHelp:
      'for plant in plants:\n    amount = care_plans[plant.species]["nutrients"]\n    sprayer.feed(plant, amount)',
  },
  conceptCardId: 'nested_dictionaries',
}
