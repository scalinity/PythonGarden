import type { LevelDefinition } from '@/types/level.ts'

export const level23: LevelDefinition = {
  id: 'level-23',
  title: 'Native or Invasive',
  biome: 'shifting_delta',
  concepts: ['in_operator', 'if_statement', 'for_loop'],
  order: 23,
  missionText:
    'The `in` operator checks whether a value exists inside a list (or string, or dictionary). It returns True or False:\n```\nguest_list = ["Alice", "Bob", "Carol"]\nif "Bob" in guest_list:\n    print("Welcome!")\n```\n\nSome species here are invasive! Only water the ones that appear in the native species list.',
  starterCode:
    'native_species = ["fern", "orchid", "moss"]\n\nfor plant in plants:\n    if ___:\n        sprinkler.water(plant)\n',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'wild_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'wild_orchid',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 20,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'invasive_bamboo',
        species: 'bamboo',
        position: { x: 5, y: 3 },
        moisture: 25,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'wild_moss',
        species: 'moss',
        position: { x: 7, y: 3 },
        moisture: 18,
        health: 65,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'invasive_kudzu',
        species: 'kudzu',
        position: { x: 9, y: 3 },
        moisture: 22,
        health: 85,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 35 },
      description: 'Native fern watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 40 },
      description: 'Native orchid watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 25 },
      description: 'Invasive bamboo left alone',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 38 },
      description: 'Native moss watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '==', value: 22 },
      description: 'Invasive kudzu left alone',
    },
    {
      type: 'concept',
      params: { concept: 'in_membership' },
      description: 'The in operator is used',
    },
  ],
  hints: {
    direction:
      'You need to check if the plant\'s species is in the list. Which operator tests membership?',
    conceptNudge:
      'Use `if plant.species in native_species:` to check whether the species is in the list.',
    structuralHelp:
      'native_species = ["fern", "orchid", "moss"]\n\nfor plant in plants:\n    if plant.species in native_species:\n        sprinkler.water(plant)',
  },
  conceptCardId: 'in_operator',
}
