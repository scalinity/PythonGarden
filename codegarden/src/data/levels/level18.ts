import type { LevelDefinition } from '@/types/level.ts'

export const level18: LevelDefinition = {
  id: 'level-18',
  title: 'Tour the Map',
  biome: 'memory_marsh',
  concepts: ['dictionaries', 'dict_iteration'],
  order: 18,
  missionText:
    '**Dictionary Iteration** — Loop through a dictionary\'s entries with `.items()` to get both the key and value at once.\n\nFor example:\n```python\nfor country, capital in atlas.items():\n    print(country, capital)\n```\n\n**Your mission:** A catalog maps bin names to species. Iterate through it with `.items()` and store each species in the correct bin.',
  starterCode:
    '# The catalog tells you which species goes in which bin\ncatalog = {"bin_a": "fern", "bin_b": "orchid", "bin_c": "moss"}\n\n# Loop through with .items() and store each one\nfor ___, ___ in catalog.items():\n    storage.store_in(___, ___)\n',
  availableObjects: [
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
        name: 'fern_sample',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 50,
        health: 100,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_b',
        name: 'orchid_sample',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 50,
        health: 100,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_c',
        name: 'moss_sample',
        species: 'moss',
        position: { x: 8, y: 3 },
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
      type: 'concept',
      params: { concept: 'dict_items' },
      description: 'Dictionary .items() is used',
    },
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
      'The `.items()` method gives you pairs. What two variable names should you use?',
    conceptNudge:
      'Use descriptive names: `for bin_name, species in catalog.items():`. Then pass both to `store_in`.',
    structuralHelp:
      'catalog = {"bin_a": "fern", "bin_b": "orchid", "bin_c": "moss"}\n\nfor bin_name, species in catalog.items():\n    storage.store_in(bin_name, species)',
  },
  conceptCardId: 'dict_iteration',
}
