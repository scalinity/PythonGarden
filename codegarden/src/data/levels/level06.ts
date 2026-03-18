import type { LevelDefinition } from '@/types/level.ts'

export const level06: LevelDefinition = {
  id: 'level-06',
  title: 'More Labels',
  biome: 'thirst_fields',
  concepts: ['strings', 'variables'],
  order: 6,
  missionText:
    '**Reading String Properties** — Objects can have text properties you can read and store in a variable.\n\nFor example:\n```python\ntitle = book.title\nauthor = book.author\n```\n\n**Your mission:** Three plant samples need cataloging. Read each plant\'s species and store all three in the correct bins.',
  starterCode:
    '# Read each plant\'s species and store it\nsample_a = ___\nsample_b = ___\nsample_c = ___\n\n# File each one in storage\nstorage.store_in("bin_a", sample_a)\nstorage.store_in("bin_b", sample_b)\nstorage.store_in("bin_c", sample_c)\n',
  availableObjects: [
    {
      name: 'plant_a',
      type: 'Plant',
      methods: [
        {
          name: 'species',
          signature: 'plant_a.species',
          description: 'The species of this plant (string).',
          returnType: 'string',
        },
      ],
    },
    {
      name: 'plant_b',
      type: 'Plant',
      methods: [
        {
          name: 'species',
          signature: 'plant_b.species',
          description: 'The species of this plant (string).',
          returnType: 'string',
        },
      ],
    },
    {
      name: 'plant_c',
      type: 'Plant',
      methods: [
        {
          name: 'species',
          signature: 'plant_c.species',
          description: 'The species of this plant (string).',
          returnType: 'string',
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
        id: 'plant_a',
        name: 'sample_a',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 50,
        health: 100,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_b',
        name: 'sample_b',
        species: 'orchid',
        position: { x: 4, y: 3 },
        moisture: 50,
        health: 100,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_c',
        name: 'sample_c',
        species: 'moss',
        position: { x: 6, y: 3 },
        moisture: 50,
        health: 100,
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
      description: 'Something filed in bin A',
    },
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'bin_b' },
      description: 'Something filed in bin B',
    },
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'bin_c' },
      description: 'Something filed in bin C',
    },
  ],
  hints: {
    direction:
      'Each blank should read the species from the matching plant object.',
    conceptNudge:
      'Read a property with dot notation: `sample_a = plant_a.species`.',
    structuralHelp:
      'sample_a = plant_a.species\nsample_b = plant_b.species\nsample_c = plant_c.species\nstorage.store_in("bin_a", sample_a)\nstorage.store_in("bin_b", sample_b)\nstorage.store_in("bin_c", sample_c)',
  },
  conceptCardId: 'strings',
}
