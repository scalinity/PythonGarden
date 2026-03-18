import type { LevelDefinition } from '@/types/level.ts'

export const level32: LevelDefinition = {
  id: 'level-32',
  title: 'Clean the Records',
  biome: 'echo_ravine',
  concepts: ['string_methods', 'for_loop'],
  order: 32,
  missionText:
    'Strings have built-in methods you can call with a dot:\n- `.strip()` removes extra whitespace from both ends\n- `.lower()` makes everything lowercase\n- `.upper()` makes everything uppercase\n\nFor example: `messy = "  HELLO "; clean = messy.strip().lower()`\n\nOld ravine records have messy text. Clean each species name and store the result.',
  starterCode:
    '# These records have extra spaces and inconsistent casing\n# Clean each one: remove spaces with .strip(), lowercase with .lower()\n# Then store the clean version\nrecords = ["  Fern ", "ORCHID  ", " moss", "  VINE "]\n\n',
  availableObjects: [
    {
      name: 'storage',
      type: 'Storage',
      methods: [
        {
          name: 'store',
          signature: 'storage.store(item)',
          description: 'Stores a cleaned string for later reference.',
        },
      ],
    },
  ],
  world: {
    storages: [{ id: 'storage', items: [], bins: {} }],
  },
  successConditions: [
    {
      type: 'action',
      params: { type: 'store_item', count: 4, countOperator: '>=' },
      description: 'At least 4 cleaned records stored',
    },
    {
      type: 'concept',
      params: { concept: 'string_method' },
      description: 'A string method is used',
    },
  ],
  hints: {
    direction:
      'Loop through the records list. For each record, call .strip() and .lower(), then store it.',
    conceptNudge:
      'You can chain methods: `clean = record.strip().lower()`. Then `storage.store(clean)`.',
    structuralHelp:
      'records = ["  Fern ", "ORCHID  ", " moss", "  VINE "]\n\nfor record in records:\n    clean = record.strip().lower()\n    storage.store(clean)',
  },
  conceptCardId: 'string_methods',
}
