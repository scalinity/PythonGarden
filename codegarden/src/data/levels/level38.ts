import type { LevelDefinition } from '@/types/level.ts'

export const level38: LevelDefinition = {
  id: 'level-38',
  title: 'Split the Work',
  biome: 'tide_pools',
  concepts: ['list_slicing', 'for_loop'],
  order: 38,
  missionText:
    'List slicing lets you grab a portion of a list:\n\n`my_list[:3]` gives the first 3 items.\n`my_list[3:]` gives everything from position 3 onward.\n\nSplit the plants in half. Water the first group, feed the second group 15 nutrients each.',
  starterCode:
    '# Split plants into two halves using list slicing\n# plants[:n] = first n items, plants[n:] = the rest\n# Water the first half, feed the second half with 15 nutrients\n\n',
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
          description: 'Feeds the plant with the given nutrient amount, increasing health.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'pool_herb_0',
        species: 'herb',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'pool_herb_1',
        species: 'herb',
        position: { x: 3, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'pool_herb_2',
        species: 'herb',
        position: { x: 5, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'pool_herb_3',
        species: 'herb',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'pool_herb_4',
        species: 'herb',
        position: { x: 9, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'pool_herb_5',
        species: 'herb',
        position: { x: 11, y: 3 },
        moisture: 15,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 4, y: 5 } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'list_slice' },
      description: 'Uses list slicing',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'First half plant 0 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 35 },
      description: 'First half plant 1 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 35 },
      description: 'First half plant 2 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'health', operator: '>=', value: 50 },
      description: 'Second half plant 3 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'health', operator: '>=', value: 50 },
      description: 'Second half plant 4 fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'health', operator: '>=', value: 50 },
      description: 'Second half plant 5 fed',
    },
  ],
  hints: {
    direction:
      'Slice the list at position 3 to get two halves, then loop through each half separately.',
    conceptNudge:
      '`first_half = plants[:3]` and `second_half = plants[3:]` — then use a for loop on each.',
    structuralHelp:
      'first_half = plants[:3]\nsecond_half = plants[3:]\n\nfor plant in first_half:\n    sprinkler.water(plant)\n\nfor plant in second_half:\n    sprayer.feed(plant, 15)',
  },
  conceptCardId: 'list_slicing',
}
