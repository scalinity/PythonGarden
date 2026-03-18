import type { LevelDefinition } from '@/types/level.ts'

export const level22: LevelDefinition = {
  id: 'level-22',
  title: 'Species Sorting',
  biome: 'shifting_delta',
  concepts: ['elif', 'for_loop', 'strings'],
  order: 22,
  missionText:
    'You can chain multiple `elif` branches to handle many cases. Python checks each one in order and runs the first match:\n```\nif color == "red":\n    bin = "warm"\nelif color == "blue":\n    bin = "cool"\nelif color == "green":\n    bin = "cool"\nelse:\n    bin = "other"\n```\n\nA mixed shipment of seedlings arrived. Sort each plant into the correct bin by species: ferns in bin_a, orchids in bin_b, everything else in bin_c.',
  starterCode:
    'for plant in plants:\n    if plant.species == "fern":\n        storage.store_in("bin_a", plant.species)\n    elif ___:\n        ___\n    else:\n        storage.store_in("bin_c", plant.species)\n',
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
      name: 'storage',
      type: 'Storage',
      methods: [
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
        id: 'plant_1',
        name: 'fern_1',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'orchid_1',
        species: 'orchid',
        position: { x: 3, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'moss_1',
        species: 'moss',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'fern_2',
        species: 'fern',
        position: { x: 7, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'orchid_2',
        species: 'orchid',
        position: { x: 9, y: 3 },
        moisture: 50,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
    storages: [{ id: 'storage', items: [], bins: { bin_a: [], bin_b: [], bin_c: [] } }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'bin_a' },
      description: 'Ferns filed in bin A',
    },
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'bin_b' },
      description: 'Orchids filed in bin B',
    },
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'bin_c' },
      description: 'Moss filed in bin C',
    },
    {
      type: 'concept',
      params: { concept: 'elif_statement' },
      description: 'elif is used',
    },
  ],
  hints: {
    direction:
      'Ferns are handled. What about orchids? They need their own elif branch.',
    conceptNudge:
      'Check the species string: `elif plant.species == "orchid":` then store in "bin_b".',
    structuralHelp:
      'for plant in plants:\n    if plant.species == "fern":\n        storage.store_in("bin_a", plant.species)\n    elif plant.species == "orchid":\n        storage.store_in("bin_b", plant.species)\n    else:\n        storage.store_in("bin_c", plant.species)',
  },
  conceptCardId: 'elif',
}
