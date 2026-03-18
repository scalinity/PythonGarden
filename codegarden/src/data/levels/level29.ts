import type { LevelDefinition } from '@/types/level.ts'

export const level29: LevelDefinition = {
  id: 'level-29',
  title: 'Skip the Dormant',
  biome: 'ember_terraces',
  concepts: ['break_continue', 'for_loop', 'if_statement'],
  order: 29,
  missionText:
    'The `continue` keyword skips the rest of the current iteration and jumps to the next one:\n```\nfor letter in mailbox:\n    if letter.is_junk:\n        continue\n    deliver(letter)\n```\nJunk mail is skipped, but everything else gets delivered.\n\nSome terrace plants are dormant (health is 0). Skip them and water everything else.',
  starterCode:
    '# Water all plants EXCEPT dormant ones (health == 0)\n# Use continue to skip over them\nfor plant in plants:\n    # Add a check here — skip dormant plants\n\n    sprinkler.water(plant)\n',
  availableObjects: [
    {
      name: 'plants',
      type: 'list',
      methods: [
        {
          name: 'length',
          signature: 'len(plants)',
          description: 'Returns the number of plants (6).',
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
        name: 'terrace_vine_0',
        species: 'vine',
        position: { x: 1, y: 3 },
        moisture: 15,
        health: 60,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_1',
        name: 'terrace_vine_1',
        species: 'vine',
        position: { x: 2, y: 3 },
        moisture: 20,
        health: 0,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_2',
        name: 'terrace_vine_2',
        species: 'vine',
        position: { x: 3, y: 3 },
        moisture: 10,
        health: 70,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_3',
        name: 'terrace_vine_3',
        species: 'vine',
        position: { x: 4, y: 3 },
        moisture: 25,
        health: 0,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_4',
        name: 'terrace_vine_4',
        species: 'vine',
        position: { x: 5, y: 3 },
        moisture: 18,
        health: 55,
        ripe: false,
        needsPollination: false,
      },
      {
        id: 'plant_5',
        name: 'terrace_vine_5',
        species: 'vine',
        position: { x: 6, y: 3 },
        moisture: 12,
        health: 0,
        ripe: false,
        needsPollination: false,
      },
    ],
    sprinklers: [{ id: 'sprinkler', position: { x: 4, y: 1 }, isOn: true }],
  },
  successConditions: [
    {
      type: 'state',
      params: { entity: 'plant_0', property: 'moisture', operator: '>=', value: 35 },
      description: 'Plant 0 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_1', property: 'moisture', operator: '==', value: 20 },
      description: 'Dormant plant 1 skipped',
    },
    {
      type: 'state',
      params: { entity: 'plant_2', property: 'moisture', operator: '>=', value: 30 },
      description: 'Plant 2 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_3', property: 'moisture', operator: '==', value: 25 },
      description: 'Dormant plant 3 skipped',
    },
    {
      type: 'state',
      params: { entity: 'plant_4', property: 'moisture', operator: '>=', value: 38 },
      description: 'Plant 4 watered',
    },
    {
      type: 'state',
      params: { entity: 'plant_5', property: 'moisture', operator: '==', value: 12 },
      description: 'Dormant plant 5 skipped',
    },
    {
      type: 'concept',
      params: { concept: 'continue_statement' },
      description: 'continue is used to skip dormant plants',
    },
  ],
  hints: {
    direction:
      'Some plants are dormant. Your loop should process only the living ones — what keyword lets you skip an iteration?',
    conceptNudge:
      'Inside the loop, add: `if plant.health == 0:` followed by `continue` on the next line.',
    structuralHelp:
      'for plant in plants:\n    if plant.health == 0:\n        continue\n    sprinkler.water(plant)',
  },
  conceptCardId: 'break_continue',
}
