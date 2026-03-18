import type { LevelDefinition } from '@/types/level.ts'

export const level05: LevelDefinition = {
  id: 'level-05',
  title: 'Text Labels',
  biome: 'thirst_fields',
  concepts: ['strings', 'variables'],
  order: 5,
  missionText:
    '**Strings** — A string is text wrapped in quotes. You can store text in a variable just like numbers.\n\nFor example:\n```python\ncity = "Tokyo"\ngreeting = "Hello"\n```\n\n**Your mission:** Two plant samples need labeling. Store each species name as a string, then file them in the correct storage bins.',
  starterCode:
    '# Store the species names as text strings\nsample_a = ___\nsample_b = ___\n\n# File them in the storage bins\nstorage.store_in("bin_a", sample_a)\nstorage.store_in("bin_b", sample_b)\n',
  availableObjects: [
    {
      name: 'plant_a',
      type: 'Plant',
      methods: [
        {
          name: 'species',
          signature: 'plant_a.species',
          description: 'The species of this plant: "fern".',
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
          description: 'The species of this plant: "orchid".',
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
          description:
            'Files a label string into the named bin for later reference.',
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
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 100,
        ripe: false,
        needsPollination: false,
      },
    ],
    storages: [{ id: 'storage', items: [], bins: { bin_a: [], bin_b: [] } }],
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
  ],
  hints: {
    direction:
      'Each blank needs a species name. What text should go in quotes?',
    conceptNudge:
      'Strings are text wrapped in quotes. Try `sample_a = "fern"`.',
    structuralHelp:
      'sample_a = "fern"\nsample_b = "orchid"\nstorage.store_in("bin_a", sample_a)\nstorage.store_in("bin_b", sample_b)',
  },
  conceptCardId: 'strings',
}
