import type { LevelDefinition } from '@/types/level.ts'

export const level03: LevelDefinition = {
  id: 'level-03',
  title: 'Name the Samples',
  biome: 'silent_greenhouse',
  concepts: ['strings', 'variables'],
  order: 3,
  missionText:
    'Label each plant sample by storing its species name in a variable, then filing it in storage.',
  starterCode:
    '# Store the species names as text\nsample_a = ___\nsample_b = ___\n\n# File them in the storage bins\nstorage.file("bin_a", sample_a)\nstorage.file("bin_b", sample_b)\n',
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
        {
          name: 'name',
          signature: 'plant_a.name',
          description: 'The name of this plant.',
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
        {
          name: 'name',
          signature: 'plant_b.name',
          description: 'The name of this plant.',
          returnType: 'string',
        },
      ],
    },
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'file',
          signature: 'storage.file(bin_name, label)',
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
      type: 'state',
      params: {
        entity: 'storage',
        property: 'bins.bin_a',
        contains: 'fern',
      },
      description: 'Bin A contains the label "fern"',
    },
    {
      type: 'state',
      params: {
        entity: 'storage',
        property: 'bins.bin_b',
        contains: 'orchid',
      },
      description: 'Bin B contains the label "orchid"',
    },
  ],
  hints: {
    direction:
      'Look at each plant\'s species and store it as a text value.',
    conceptNudge:
      'Strings are text wrapped in quotes. Try sample_a = "fern".',
    structuralHelp:
      'sample_a = "fern"\nsample_b = "orchid"\nstorage.file("bin_a", sample_a)\nstorage.file("bin_b", sample_b)',
  },
  conceptCardId: 'strings',
}
