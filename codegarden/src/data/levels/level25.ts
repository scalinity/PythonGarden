import type { LevelDefinition } from '@/types/level.ts'

export const level25: LevelDefinition = {
  id: 'level-25',
  title: 'Delta Convergence',
  biome: 'shifting_delta',
  concepts: ['elif', 'in_operator', 'modulo', 'functions', 'return_values'],
  order: 25,
  missionText:
    'The three delta channels converge here. Write a triage function that categorizes each plant, then process every other plant. Filter out invasive species, water the critical ones, and feed the moderate ones.',
  starterCode:
    'native = ["fern", "orchid", "moss", "vine"]\n\ndef triage(plant):\n    if plant.species not in native:\n        return "skip"\n    elif plant.moisture < 20:\n        return "critical"\n    elif ___:\n        return "moderate"\n    else:\n        return "stable"\n\nfor i in range(len(plants)):\n    if i % 2 == 0:\n        level = triage(plants[i])\n        if level == "critical":\n            sprinkler.water(plants[i])\n        elif level == "moderate":\n            sprayer.feed(plants[i], 10)\n',
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
    {
      name: 'sprayer',
      type: 'Sprayer',
      methods: [
        {
          name: 'feed',
          signature: 'sprayer.feed(plant, amount)',
          description: 'Feeds the plant with the given nutrient amount.',
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
        id: 'plant_0',
        name: 'delta_fern',
        species: 'fern',
        position: { x: 1, y: 3 },
        moisture: 10,
        health: 50,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'delta_bamboo',
        species: 'bamboo',
        position: { x: 3, y: 3 },
        moisture: 40,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'delta_orchid',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 35,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'delta_kudzu',
        species: 'kudzu',
        position: { x: 7, y: 3 },
        moisture: 15,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'delta_moss',
        species: 'moss',
        position: { x: 9, y: 3 },
        moisture: 8,
        health: 40,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'delta_vine',
        species: 'vine',
        position: { x: 11, y: 3 },
        moisture: 55,
        health: 90,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_6',
        name: 'delta_fern2',
        species: 'fern',
        position: { x: 13, y: 3 },
        moisture: 45,
        health: 75,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_7',
        name: 'delta_orchid2',
        species: 'orchid',
        position: { x: 15, y: 3 },
        moisture: 12,
        health: 30,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 5, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 5, y: 5 } }],
    storages: [{ id: 'storage', items: [], bins: { log: [] } }],
  },
  successConditions: [
    {
      type: 'concept',
      params: { concept: 'elif_statement' },
      description: 'elif is used in the triage function',
    },
    {
      type: 'concept',
      params: { concept: 'function_def' },
      description: 'A triage function is defined',
    },
    {
      type: 'concept',
      params: { concept: 'modulo_operator' },
      description: 'Modulo is used for alternating',
    },
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 30 },
      description: 'Critical fern (index 0, even) watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 28 },
      description: 'Critical moss (index 4, even) watered',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_2' },
      description: 'Moderate orchid (index 2, even) fed',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 40 },
      description: 'Bamboo (index 1, odd) skipped',
    },
  ],
  hints: {
    direction:
      'What moisture range is "moderate"? Not critical (< 20) and not stable.',
    conceptNudge:
      'The blank needs a condition for moderate: try `plant.moisture < 50`.',
    structuralHelp:
      'native = ["fern", "orchid", "moss", "vine"]\n\ndef triage(plant):\n    if plant.species not in native:\n        return "skip"\n    elif plant.moisture < 20:\n        return "critical"\n    elif plant.moisture < 50:\n        return "moderate"\n    else:\n        return "stable"\n\nfor i in range(len(plants)):\n    if i % 2 == 0:\n        level = triage(plants[i])\n        if level == "critical":\n            sprinkler.water(plants[i])\n        elif level == "moderate":\n            sprayer.feed(plants[i], 10)',
  },
  conceptCardId: 'elif',
}
