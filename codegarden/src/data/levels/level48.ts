import type { LevelDefinition } from '@/types/level.ts'

export const level48: LevelDefinition = {
  id: 'level-48',
  title: 'Crater Inventory',
  biome: 'genesis_crater',
  concepts: ['accumulator_pattern', 'dictionaries', 'for_loop', 'f_strings'],
  order: 48,
  missionText:
    'Survey the crater. Count how many plants of each species exist, determine which is most common, and file your findings.\n\nYou have 8 plants across several species. Build a count of each, figure out the winner, and store a report string.',
  starterCode:
    '# Count how many plants of each species exist\n# Find which species is most common\n# Store the result: "Most common: <species>"\n\n',
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
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(item)',
          description: 'Stores an item (string or plant) in general storage.',
        },
        {
          name: 'store_in',
          signature: 'storage.store_in(bin_name, label)',
          description: 'Files a label string into the named bin.',
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
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'crater_orchid_1',
        species: 'orchid',
        position: { x: 3, y: 2 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'crater_fern_2',
        species: 'fern',
        position: { x: 5, y: 2 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'crater_moss_1',
        species: 'moss',
        position: { x: 7, y: 2 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'crater_orchid_2',
        species: 'orchid',
        position: { x: 1, y: 4 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'crater_fern_3',
        species: 'fern',
        position: { x: 3, y: 4 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'crater_vine_1',
        species: 'vine',
        position: { x: 5, y: 4 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_7',
        name: 'crater_orchid_3',
        species: 'orchid',
        position: { x: 7, y: 4 },
        moisture: 50,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
    ],
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_item' },
      description: 'A result was stored',
    },
    {
      type: 'concept',
      params: { concept: 'dictionary_usage' },
      description: 'Dictionary access is used',
    },
    {
      type: 'concept',
      params: { concept: 'f_string' },
      description: 'An f-string is used',
    },
  ],
  hints: {
    direction:
      'You need a dictionary to count. Start with an empty one and loop through plants.',
    conceptNudge:
      'Check if species is already in the dict. If yes, add 1. If no, set it to 1.',
    structuralHelp:
      'inventory = {}\nfor plant in plants:\n    s = plant.species\n    if s in inventory:\n        inventory[s] = inventory[s] + 1\n    else:\n        inventory[s] = 1\n\nbest = ""\nbest_count = 0\nfor species in inventory:\n    if inventory[species] > best_count:\n        best = species\n        best_count = inventory[species]\n\nstorage.store(f"Most common: {best}")',
  },
  conceptCardId: 'accumulator_pattern',
}
