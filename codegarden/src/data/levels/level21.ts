import type { LevelDefinition } from '@/types/level.ts'

export const level21: LevelDefinition = {
  id: 'level-21',
  title: 'Three Channels',
  biome: 'shifting_delta',
  concepts: ['elif', 'if_statement'],
  order: 21,
  missionText:
    'When you have more than two outcomes, `elif` (short for "else if") adds extra branches between `if` and `else`. Python checks each condition in order and runs the first one that is True:\n```\nif score > 90:\n    grade = "A"\nelif score > 70:\n    grade = "B"\nelse:\n    grade = "C"\n```\n\nEach plant in the delta needs different care based on how wet it is. Water the dry ones, feed the moderate ones, and harvest the saturated ones.',
  starterCode:
    '# Each plant needs different care based on moisture\nfor plant in plants:\n    if plant.moisture < 30:\n        sprinkler.water(plant)\n    elif ___:\n        sprayer.feed(plant, 10)\n    else:\n        drone.harvest(plant)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (3).',
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
      name: 'drone',
      type: 'Drone',
      methods: [
        {
          name: 'harvest',
          signature: 'drone.harvest(plant)',
          description: 'Harvests the given plant.',
        },
      ],
    },
  ],
  world: {
    plants: [
      {
        id: 'plant_1',
        name: 'dry_fern',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 10,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'moist_orchid',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 45,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'wet_vine',
        species: 'vine',
        position: { x: 8, y: 3 },
        moisture: 85,
        health: 90,
        ripe: true,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
    sprayers: [{ id: 'sprayer', position: { x: 4, y: 5 } }],
    drones: [
      {
        id: 'drone',
        position: { x: 4, y: 0 },
        direction: 'south',
        carrying: null,
      },
    ],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Dry fern watered',
    },
    {
      type: 'action',
      params: { type: 'feed_plant', target: 'plant_2' },
      description: 'Moderate orchid fed',
    },
    {
      type: 'action',
      params: { type: 'drone_harvest', target: 'plant_3' },
      description: 'Saturated vine harvested',
    },
    {
      type: 'concept',
      params: { concept: 'elif_statement' },
      description: 'elif is used',
    },
  ],
  hints: {
    direction:
      'The middle range -- not too dry, not too wet. What moisture range is that?',
    conceptNudge:
      'elif adds another branch: `elif plant.moisture < 60:` catches the middle values.',
    structuralHelp:
      'for plant in plants:\n    if plant.moisture < 30:\n        sprinkler.water(plant)\n    elif plant.moisture < 60:\n        sprayer.feed(plant, 10)\n    else:\n        drone.harvest(plant)',
  },
  conceptCardId: 'elif',
}
