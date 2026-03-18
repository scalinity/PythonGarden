import type { LevelDefinition } from '@/types/level.ts'

export const level33: LevelDefinition = {
  id: 'level-33',
  title: 'Split and Sort',
  biome: 'echo_ravine',
  concepts: ['string_methods', 'for_loop'],
  order: 33,
  missionText:
    'Two powerful string methods work as opposites:\n- `.split(",")` breaks `"a,b,c"` into the list `["a", "b", "c"]`\n- `", ".join(my_list)` combines `["a", "b", "c"]` back into `"a, b, c"`\n\nThe expedition log is one long comma-separated string. Break it apart, store each species separately, then create a clean formatted version and file it in the archive.',
  starterCode:
    '# This log has species names separated by commas\n# Split it into a list with .split(",")\n# Store each species separately\n# Then rejoin them with " | " using " | ".join(list) and store in "archive"\nlog = "fern,orchid,moss,vine,herb"\n\n',
  availableObjects: [
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(item)',
          description: 'Stores a string in the general items list.',
        },
        {
          name: 'store_in',
          signature: 'storage.store_in(bin_name, item)',
          description: 'Files a string into the named bin.',
        },
      ],
    },
  ],
  world: {
    storages: [{ id: 'storage', items: [], bins: { archive: [] } }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_item', count: 5, countOperator: '>=' },
      description: 'At least 5 species stored individually',
    },
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'archive' },
      description: 'Formatted list filed in archive',
    },
    {
      type: 'concept',
      params: { concept: 'string_method' },
      description: 'A string method is used',
    },
  ],
  hints: {
    direction:
      'First split the log into a list. Loop through the list and store each species. Then join them with " | " and store_in the archive.',
    conceptNudge:
      'Use `species_list = log.split(",")` to break it apart. Then `formatted = " | ".join(species_list)` to rejoin.',
    structuralHelp:
      'log = "fern,orchid,moss,vine,herb"\n\nspecies_list = log.split(",")\nfor species in species_list:\n    storage.store(species)\n\nformatted = " | ".join(species_list)\nstorage.store_in("archive", formatted)',
  },
  conceptCardId: 'string_methods',
}
