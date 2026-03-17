import type { ConceptCard } from '@/types/execution.ts'

export const concepts: ConceptCard[] = [
  {
    id: 'commands',
    name: 'Commands',
    explanation:
      'A command is a single instruction that tells the computer to do something. Python runs commands one line at a time, from top to bottom. Each line performs one action.',
    pythonExample: 'sprinkler.on()\nsprinkler.water(plant)',
  },
  {
    id: 'variables',
    name: 'Variables',
    explanation:
      'A variable is a named container that stores a value. You create one by writing a name, an equals sign, and a value. You can use the variable name later to recall that value.',
    pythonExample: 'water_needed = 30\nsprinkler.spray(water_needed)',
  },
  {
    id: 'strings',
    name: 'Strings',
    explanation:
      'A string is a piece of text wrapped in quotes. You can use single or double quotes. Strings let you work with words, names, and labels in your code.',
    pythonExample: 'name = "fern"\nprint(name)',
  },
  {
    id: 'booleans',
    name: 'Booleans',
    explanation:
      'A boolean is a value that is either True or False. Comparisons like "x > 5" produce booleans. They are used to make decisions in your code.',
    pythonExample: 'is_dry = moisture < 30\nprint(is_dry)  # True or False',
  },
  {
    id: 'if_statement',
    name: 'If Statements',
    explanation:
      'An if statement lets your code make decisions. It checks a condition, and only runs the indented code below it when that condition is True. You can add else to handle the opposite case.',
    pythonExample: 'if plant.moisture < 30:\n    sprinkler.water(plant)\nelse:\n    print("Plant is fine")',
  },
  {
    id: 'for_loop',
    name: 'For Loops',
    explanation:
      'A for loop repeats a block of code once for each item in a collection. The loop variable takes on each value in turn, so you can process every item without writing the same code over and over.',
    pythonExample: 'for plant in row_a:\n    sprinkler.water(plant)',
  },
  {
    id: 'while_loop',
    name: 'While Loops',
    explanation:
      'A while loop repeats a block of code as long as a condition remains True. It checks the condition before each repetition and stops when it becomes False.',
    pythonExample: 'while reservoir.level < 100:\n    pump.transfer(reservoir)',
  },
  {
    id: 'functions',
    name: 'Functions',
    explanation:
      'A function is a reusable block of code with a name. You define it once with "def", then call it whenever you need it. Functions can take parameters to work with different data.',
    pythonExample: 'def harvest_if_ripe(plant):\n    if plant.ripe:\n        drone.harvest(plant)\n\nharvest_if_ripe(tomato)',
  },
  {
    id: 'dictionaries',
    name: 'Dictionaries',
    explanation:
      'A dictionary maps keys to values, like a real-world lookup table. You use curly braces to create one and square brackets to look up a value by its key.',
    pythonExample: 'nutrients = {"fern": 10, "orchid": 25}\namount = nutrients["fern"]  # 10',
  },
]
