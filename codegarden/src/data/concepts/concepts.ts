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
  {
    id: 'return_values',
    name: 'Return Values',
    explanation:
      'A function can send a value back with `return`. The caller gets that value and can use it in a variable or expression.',
    pythonExample: 'def water_needed(plant):\n    return 50 - plant.moisture\n\namount = water_needed(fern)',
  },
  {
    id: 'list_operations',
    name: 'List Operations',
    explanation:
      'Lists can grow! Use `.append(item)` to add items to the end of a list. Use `len(my_list)` to count how many items are in it.',
    pythonExample: 'ripe = []\nripe.append("tomato")\nprint(len(ripe))  # 1',
  },
  {
    id: 'dict_iteration',
    name: 'Dictionary Iteration',
    explanation:
      'Loop through a dictionary\'s entries with `.items()` to get both the key and the value on each pass through the loop.',
    pythonExample: 'for key, value in catalog.items():\n    print(key, value)',
  },
  {
    id: 'boolean_operators',
    name: 'Boolean Operators',
    explanation:
      'Combine conditions with `and` (both must be True) and `or` (either can be True). This lets you make more complex decisions in one line.',
    pythonExample: 'if moisture < 30 and health < 50:\n    sprinkler.water(plant)',
  },
  {
    id: 'elif',
    name: 'Elif Chains',
    explanation:
      'Use `elif` (short for "else if") to add extra branches between `if` and `else`. Python checks each condition in order and runs the first one that is True.',
    pythonExample: 'if temp > 30:\n    label = "hot"\nelif temp > 15:\n    label = "warm"\nelse:\n    label = "cold"',
  },
  {
    id: 'range_loops',
    name: 'Range Loops',
    explanation:
      '`range(n)` produces numbers from 0 up to (but not including) n. Use it in a for loop to repeat code a specific number of times, or `range(start, stop)` to count from start.',
    pythonExample: 'for i in range(5):\n    print(i)  # 0, 1, 2, 3, 4',
  },
  {
    id: 'in_operator',
    name: 'The in Operator',
    explanation:
      'Use `in` to test whether a value exists inside a list, string, or dictionary. It returns True or False. Use `not in` to check the opposite.',
    pythonExample: 'fruits = ["apple", "banana"]\nif "apple" in fruits:\n    print("Found it!")',
  },
  {
    id: 'modulo',
    name: 'Modulo Operator',
    explanation:
      'The `%` operator gives the remainder after division. `7 % 3` is 1 because 7 divided by 3 leaves a remainder of 1. It is useful for checking even/odd or repeating patterns.',
    pythonExample: 'for i in range(6):\n    if i % 2 == 0:\n        print(i, "is even")',
  },
  {
    id: 'break_continue',
    name: 'Break & Continue',
    explanation:
      '`break` exits a loop immediately — no more iterations. `continue` skips the rest of the current iteration and jumps to the next one. Both give you fine control over loops.',
    pythonExample: 'for item in items:\n    if item == "stop":\n        break\n    if item == "skip":\n        continue\n    print(item)',
  },
  {
    id: 'f_strings',
    name: 'F-Strings',
    explanation:
      'An f-string lets you embed expressions directly inside a string by putting `f` before the quote and wrapping expressions in `{curly braces}`. Python evaluates them and inserts the result.',
    pythonExample: 'name = "fern"\nhealth = 80\nlabel = f"{name} has {health} HP"',
  },
  {
    id: 'string_methods',
    name: 'String Methods',
    explanation:
      'Strings have built-in methods: `.upper()` and `.lower()` change case, `.strip()` removes whitespace, `.split(",")` breaks a string into a list, and `", ".join(list)` combines a list into a string.',
    pythonExample: 'text = "  Hello World  "\nclean = text.strip().lower()\nwords = clean.split(" ")',
  },
  {
    id: 'type_conversion',
    name: 'Type Conversion',
    explanation:
      '`int("42")` converts a string to a number. `str(42)` converts a number to a string. `float("3.14")` makes a decimal. Use these when data arrives as the wrong type.',
    pythonExample: 'age_text = "25"\nage_num = int(age_text)\nprint(age_num + 1)  # 26',
  },
  {
    id: 'enumerate_zip',
    name: 'Enumerate & Zip',
    explanation:
      '`enumerate(items)` gives you `(index, value)` pairs so you know each item\'s position. `zip(list_a, list_b)` pairs items from two lists together, walking through them side by side.',
    pythonExample: 'for i, name in enumerate(names):\n    print(i, name)\n\nfor a, b in zip(xs, ys):\n    print(a, b)',
  },
  {
    id: 'list_slicing',
    name: 'List Slicing',
    explanation:
      '`my_list[start:stop]` extracts a portion of a list. `start` is inclusive, `stop` is exclusive. Omit `start` to begin from 0, omit `stop` to go to the end.',
    pythonExample: 'nums = [10, 20, 30, 40, 50]\nfirst_two = nums[:2]   # [10, 20]\nlast_two = nums[-2:]   # [40, 50]',
  },
  {
    id: 'list_comprehensions',
    name: 'List Comprehensions',
    explanation:
      'A list comprehension builds a new list in one line: `[expression for item in collection if condition]`. It is a compact alternative to a for loop with append.',
    pythonExample: 'evens = [x for x in range(10) if x % 2 == 0]\n# [0, 2, 4, 6, 8]',
  },
  {
    id: 'nested_dictionaries',
    name: 'Nested Dictionaries',
    explanation:
      'A dictionary can contain other dictionaries as values. Access nested values with chained brackets: `data["outer"]["inner"]`. This is useful for structured records.',
    pythonExample: 'pets = {"cat": {"name": "Luna", "age": 3}}\nprint(pets["cat"]["name"])  # Luna',
  },
  {
    id: 'aggregation',
    name: 'Aggregation Functions',
    explanation:
      '`sum(list)` adds up all numbers, `min(list)` finds the smallest, `max(list)` finds the largest, and `len(list)` counts items. These work on any list of numbers.',
    pythonExample: 'scores = [85, 92, 78, 95]\ntotal = sum(scores)       # 350\nbest = max(scores)        # 95\naverage = total / len(scores)  # 87.5',
  },
  {
    id: 'sorted_key',
    name: 'Sorting with Key',
    explanation:
      '`sorted(items, key=func)` sorts a list using `func` to decide the order. The function is called on each item and the return value determines its position.',
    pythonExample: 'def by_age(person):\n    return person["age"]\n\nordered = sorted(people, key=by_age)',
  },
  {
    id: 'default_parameters',
    name: 'Default Parameters',
    explanation:
      'Give a function parameter a default value with `=`. If the caller provides a value, it is used; otherwise the default kicks in. This makes functions more flexible.',
    pythonExample: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Ash")          # Hello, Ash!\ngreet("Ash", "Hey")   # Hey, Ash!',
  },
  {
    id: 'tuple_unpacking',
    name: 'Tuple Unpacking',
    explanation:
      'A function can return multiple values separated by commas. The caller captures them with matching variables: `a, b = func()`. This is called tuple unpacking.',
    pythonExample: 'def min_max(nums):\n    return min(nums), max(nums)\n\nlo, hi = min_max([3, 1, 4, 1, 5])',
  },
  {
    id: 'accumulator_pattern',
    name: 'Accumulator Pattern',
    explanation:
      'Start with an empty result (0, "", [], or {}), then build it up step by step inside a loop. This pattern is used to count, sum, collect, or group data.',
    pythonExample: 'total = 0\nfor num in numbers:\n    total = total + num',
  },
  {
    id: 'nested_loops',
    name: 'Nested Loops',
    explanation:
      'A loop inside another loop. The inner loop runs completely for every single iteration of the outer loop. Useful for grids, combinations, or processing grouped data.',
    pythonExample: 'for row in ["A", "B"]:\n    for col in [1, 2, 3]:\n        print(row, col)',
  },
]
