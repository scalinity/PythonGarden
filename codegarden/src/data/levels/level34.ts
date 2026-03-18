import type { LevelDefinition } from '@/types/level.ts'

export const level34: LevelDefinition = {
  id: 'level-34',
  title: 'Sensor Readings',
  biome: 'echo_ravine',
  concepts: ['type_conversion', 'if_statement', 'for_loop'],
  order: 34,
  missionText:
    'Sometimes data arrives as the wrong type. Use conversion functions to fix it:\n- `int("42")` turns the string `"42"` into the number `42`\n- `str(42)` turns a number into text\n\nSensor readings arrived as text. Convert them to numbers and water any plant whose reading is below 30.',
  starterCode:
    '# Sensor readings are text \u2014 convert them to numbers with int()\n# Water any plant whose reading is below 30\nreadings = ["25", "10", "45"]\n\n',
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
  ],
  world: {
    plants: [
      {
        id: 'plant_0',
        name: 'sensor_fern',
        species: 'fern',
        position: { x: 2, y: 3 },
        moisture: 25,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'sensor_orchid',
        species: 'orchid',
        position: { x: 5, y: 3 },
        moisture: 10,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'sensor_moss',
        species: 'moss',
        position: { x: 8, y: 3 },
        moisture: 45,
        health: 80,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 45 },
      description: 'Fern watered (moisture 25 + 20)',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '>=', value: 30 },
      description: 'Orchid watered (moisture 10 + 20)',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '==', value: 45 },
      description: 'Moss left alone (moisture already 45)',
    },
    {
      type: 'concept',
      params: { concept: 'type_conversion' },
      description: 'Type conversion is used',
    },
  ],
  hints: {
    direction:
      'Loop through the readings and plants together. Convert each reading to a number and check if it is below 30.',
    conceptNudge:
      'Use `int(reading)` to convert text to a number. Then `if int(reading) < 30:` to decide whether to water.',
    structuralHelp:
      'readings = ["25", "10", "45"]\n\nfor i in range(len(readings)):\n    value = int(readings[i])\n    if value < 30:\n        sprinkler.water(plants[i])',
  },
  conceptCardId: 'type_conversion',
}
