import type { LevelDefinition } from '@/types/level.ts'

export const level35: LevelDefinition = {
  id: 'level-35',
  title: 'Echo Archive',
  biome: 'echo_ravine',
  concepts: ['f_strings', 'string_methods', 'type_conversion'],
  order: 35,
  missionText:
    'The ravine archive needs updating. Parse messy field notes: split, clean, convert numbers, and file formatted labels.\n\nThis level combines everything from the act:\n- `.strip()` and `.lower()` to clean text\n- `.split()` to break strings apart\n- `int()` to convert text to numbers\n- f-strings to build formatted output',
  starterCode:
    '# Parse these messy field notes into clean data\n# Each entry is "Species:amount" \u2014 split, clean, convert, and store\nfield_notes = "  Fern:10, ORCHID:25, moss:5  "\n\n# Step 1: Strip outer whitespace and split by ", "\n# Step 2: For each entry, split by ":" to get species and dose\n# Step 3: Clean the species name (strip + lower)\n# Step 4: Convert dose to a number with int()\n# Step 5: Store a formatted label in the "log" bin using f-string\n\n',
  availableObjects: [
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store_in',
          signature: 'storage.store_in(bin_name, item)',
          description: 'Files a string into the named bin.',
        },
      ],
    },
  ],
  world: {
    storages: [{ id: 'storage', items: [], bins: { log: [] } }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_in_bin', target: 'log', count: 3, countOperator: '>=' },
      description: 'At least 3 entries filed in log',
    },
    {
      type: 'concept',
      params: { concept: 'f_string' },
      description: 'An f-string is used',
    },
    {
      type: 'concept',
      params: { concept: 'string_method' },
      description: 'A string method is used',
    },
    {
      type: 'concept',
      params: { concept: 'type_conversion' },
      description: 'Type conversion is used',
    },
  ],
  hints: {
    direction:
      'Start by stripping and splitting the big string. Then loop through each entry, split on ":", clean the pieces, and build an f-string label.',
    conceptNudge:
      'Try `entries = field_notes.strip().split(", ")`. Then for each entry: `parts = entry.split(":")`, clean with `.strip().lower()`, and convert with `int()`.',
    structuralHelp:
      'field_notes = "  Fern:10, ORCHID:25, moss:5  "\n\nentries = field_notes.strip().split(", ")\nfor entry in entries:\n    parts = entry.split(":")\n    species = parts[0].strip().lower()\n    dose = int(parts[1])\n    label = f"{species}: {dose} units"\n    storage.store_in("log", label)',
  },
  conceptCardId: 'type_conversion',
}
