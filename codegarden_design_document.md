# CodeGarden — Comprehensive Design Document
## A Python-First Game That Teaches Basic Programming Through World Simulation

**Document Type:** Product + Game + Technical Design Specification  
**Primary Audience:** Coding agent / implementation agent  
**Secondary Audience:** Human technical lead / designer  
**Version:** 1.0  
**Status:** Ready for MVP implementation planning

---

# 1. Executive Summary

**CodeGarden** is a cozy, systems-driven educational game where players learn **real beginner Python** by restoring a failing alien ecosystem. Instead of abstract coding drills, the player writes short Python programs to control visible world systems such as irrigation, drones, pollination bots, harvest sorters, and environmental regulators.

The core product thesis is:

> **Programming concepts stick better when code visibly changes a living world.**

The game teaches Python by embedding core concepts into natural game actions:

- variables become world state
- conditionals become routing and behavior logic
- loops become automation over repeated tasks
- functions become reusable behaviors
- data structures become inventories, species registries, and system maps

The implementation must prioritize:

1. **Immediate visual feedback**
2. **Real Python syntax**
3. **Friendly debugging**
4. **Tight teaching loops**
5. **A low-friction beginner experience**
6. **A system architecture that can scale from tutorial MVP to multi-biome progression**

---

# 2. Product Vision

## 2.1 High-level vision

Build a game that feels like:

- a cozy simulation
- a puzzle game
- a programming sandbox
- an interactive tutor

The player should feel like they are **programming the world back to life** rather than completing worksheets.

## 2.2 One-line pitch

**CodeGarden** is a cozy ecosystem-restoration game where players learn real Python by programming drones, irrigation, and living systems to revive a broken alien biosphere.

## 2.3 Emotional goals

The game should make players feel:

- curious
- capable
- calm
- clever
- progressively more powerful
- unafraid of errors

The debugging loop should feel like **scientific discovery**, not punishment.

---

# 3. Goals and Non-Goals

## 3.1 Product goals

The MVP should:

- teach beginner Python fundamentals
- expose players to authentic Python syntax
- let players solve tasks by writing short programs
- provide visual cause-and-effect between code and simulation
- include a guided onboarding path
- support stepping through execution
- translate common errors into beginner-friendly language
- include at least 8–10 playable tutorial levels
- support reset / replay / rerun loops instantly

## 3.2 Learning goals

By the end of the initial tutorial arc, the player should understand and use:

- function calls
- variables
- numbers and strings
- booleans
- comparisons
- `if` / `else`
- `for` loops
- `while` loops
- functions
- lists
- simple dictionaries
- basic debugging habits

## 3.3 Non-goals for MVP

Do **not** include in MVP unless time remains:

- multiplayer
- open-world procedural generation
- unrestricted Python package imports
- advanced graphics pipeline
- complex economy system
- combat-heavy design
- machine learning integration
- user-generated level sharing
- full Python standard library
- long narrative campaign cinematics

---

# 4. Design Principles

## 4.1 Real code, not fake blocks

The player should type **actual Python**, not a block language imitation.

## 4.2 Visible causality

Every meaningful line of code should create a visible outcome in the game world.

## 4.3 Scaffolding, not hiding

The system should reduce complexity early, but not hide the fact that the player is learning transferable Python.

## 4.4 Errors are teachable events

Failures should be understandable, recoverable, and instructive.

## 4.5 Small problem, immediate loop

Each level should present a focused, comprehensible problem with fast edit-run-observe iteration.

## 4.6 Multiple valid solutions

Levels should allow more than one correct solution where possible.

---

# 5. Target Audience

## 5.1 Primary audience

- beginners learning Python for the first time
- older children, teens, college students, adults
- players intimidated by traditional coding tutorials
- players who enjoy cozy systems games, light automation, or puzzle logic

## 5.2 Secondary audience

- teachers
- parents
- self-directed learners
- coding bootcamp warm-up learners

## 5.3 Assumed prior knowledge

None.

The game must assume the player may not know:

- what a variable is
- what a loop is
- how to read an error
- what “syntax” means

---

# 6. Core Fantasy and Fiction Layer

## 6.1 Setting

The player is the newly assigned **Garden Architect** on a terraforming outpost orbiting or embedded in a damaged alien biosphere. The systems that once managed climate, water, pollination, and storage are partially broken. The only stable interface remaining is the **Garden Console**, which accepts Python commands.

## 6.2 Narrative function

Narrative exists to:

- contextualize tasks
- reward progress
- make logic feel purposeful

Narrative should not overwhelm gameplay. The game is primarily a systems-learning experience.

## 6.3 Tone

- warm
- intelligent
- optimistic
- scientific
- non-sarcastic
- never condescending

---

# 7. Core Gameplay Loop

```text
Observe environment
    ↓
Read mission objective
    ↓
Inspect available objects / API
    ↓
Write or modify Python code
    ↓
Run or step simulation
    ↓
See world react
    ↓
Use runtime feedback / errors / hints
    ↓
Revise code
    ↓
Complete level and unlock next concept
```

## 7.1 Loop quality bar

The time from “edit code” to “see consequence” should be as close to instantaneous as possible.

Target:
- rerun time under 500 ms for simple levels
- reset time effectively instant
- step-through response fluid and understandable

---

# 8. Learning Model

## 8.1 Concept progression by biome

| Biome | Theme | Concepts |
|---|---|---|
| Silent Greenhouse | wake basic systems | commands, sequencing, variables, literals |
| Thirst Fields | regulate resources | booleans, comparisons, `if`, `else` |
| Pollinator Ridge | automate traversal | `for` loops, lists |
| Root Network | persistent control | `while` loops, state |
| Archive Canopy | smarter architecture | functions, parameters, return values |
| Memory Marsh | managing knowledge | dictionaries, simple structured data |

## 8.2 Pedagogical structure per level

Each level should teach in this order:

1. **Observe the problem**
2. **Introduce one new concept**
3. **Provide a constrained API**
4. **Give a runnable starter template**
5. **Encourage experimentation**
6. **Show visible consequences**
7. **Offer a hint only after failure or stalling**
8. **Validate and explain success**

## 8.3 Instructional philosophy

The game should not explain everything up front.  
It should use:

- short mission framing
- minimal concept card
- starter code
- experimentation
- guided correction

---

# 9. Game Systems Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                        CODEGARDEN                          │
├─────────────────────────────────────────────────────────────┤
│ Narrative Layer                                             │
│  - biomes, missions, restoration, progression              │
├─────────────────────────────────────────────────────────────┤
│ Learning Layer                                              │
│  - concepts, hints, concept cards, mastery tracking        │
├─────────────────────────────────────────────────────────────┤
│ Gameplay Layer                                              │
│  - level goals, scoring, objects, simulation, validation   │
├─────────────────────────────────────────────────────────────┤
│ Coding Layer                                                │
│  - editor, execution, stepper, error translator            │
├─────────────────────────────────────────────────────────────┤
│ Engine Layer                                                │
│  - world state, sandbox, event log, rendering              │
└─────────────────────────────────────────────────────────────┘
```

---

# 10. Python Interaction Model

## 10.1 Core rule

Players write **real Python**, but only against a controlled subset of game-provided objects and functions.

## 10.2 Allowed beginner subset

MVP should support:

- variable assignment
- literals: ints, floats, strings, booleans
- function calls
- method calls
- comparisons: `<`, `>`, `<=`, `>=`, `==`, `!=`
- `if`, `elif`, `else`
- `for` loops over lists
- `while` loops
- function definitions
- `return`
- indexing for lists/dicts
- comments
- print/logging to debug panel

## 10.3 Restricted or disallowed

Disallow in MVP:

- arbitrary imports
- file system access
- network access
- recursion unless explicitly supported later
- reflection / introspection escape hatches
- uncontrolled standard library access
- mutation of protected engine internals
- eval/exec from player code
- threading / async

## 10.4 Execution philosophy

Player code should run inside a safe, deterministic sandbox.

The player is not coding the engine directly.  
They are writing logic against a game API.

---

# 11. Game API Design

The API is the bridge between Python and the world. It must be:

- small
- readable
- discoverable
- narratively meaningful
- consistent in naming

## 11.1 Example object model

### World accessors
```python
greenhouse.row("A")
garden.get_plants()
garden.get_drones()
weather.sunlight()
reservoir.level()
storage.items()
```

### Plant objects
```python
plant.name
plant.moisture()
plant.health()
plant.is_ripe()
plant.species()
plant.needs_pollination()
```

### Sprinkler objects
```python
sprinkler.on()
sprinkler.off()
sprinkler.water(plant)
sprinkler.spray(amount)
```

### Drone objects
```python
drone.move_to(target)
drone.move_forward()
drone.turn_left()
drone.turn_right()
drone.scan_moisture()
drone.pollinate(flower)
drone.harvest(plant)
drone.pick(item)
drone.drop(location)
```

### Storage / logistics
```python
storage.store(item)
storage.store_in(bin_name, item)
storage.count(item_type)
```

### Debug / utility
```python
log("Checking row A")
highlight(plant)
```

## 11.2 Naming conventions

All names should be:

- explicit
- beginner-readable
- verb-first for actions
- noun-first for containers

Bad:
```python
x.do(thing)
proc(a)
```

Good:
```python
sprinkler.water(plant)
storage.store(item)
drone.move_to(plant)
```

## 11.3 Discoverability features

The editor should expose:

- autocomplete for allowed API names
- tooltips with plain-English meaning
- inline signatures
- object inspector panel

---

# 12. World Simulation Model

## 12.1 Simulation style

The game world is a deterministic, small-scale, stateful simulation.

A level is composed of:

- objects
- initial state
- rules
- success conditions
- optional resource costs

## 12.2 State categories

Each level should track:

### Environment state
- light
- temperature
- reservoir water
- nutrient balance
- pest presence

### Entity state
- plant moisture
- plant health
- plant ripe status
- drone location
- storage contents

### Mission state
- objective satisfaction
- time elapsed
- mistakes
- resource efficiency
- concept mastery

## 12.3 Time model

MVP should support two runtime modes:

### Run mode
Code executes and the simulation plays continuously.

### Step mode
The player can step line-by-line or action-by-action and inspect state.

This is critical for teaching.

---

# 13. UX / UI Specification

## 13.1 Main screen layout

```text
┌─────────────────────────────────────────────────────────────┐
│                    WORLD / SIMULATION VIEW                  │
│  plants, drones, moisture bars, pipes, storage bins, etc.  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────┬───────────────────────────────────────┐
│ Mission Panel       │ Python Editor                         │
│ - objective         │ - code                                │
│ - concept hint      │ - syntax highlight                    │
│ - available objects │ - autocomplete                        │
│ - success checklist │ - line numbers                        │
└─────────────────────┴───────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Debug / Runtime Panel                                       │
│ - logs                                                      │
│ - variable watch                                            │
│ - current line                                              │
│ - errors in plain English                                   │
└─────────────────────────────────────────────────────────────┘
```

## 13.2 Required editor features

- syntax highlighting
- line numbers
- starter code insertion
- autocomplete for game API
- inline error underlining
- code reset to starter
- run button
- step button
- stop button
- reset world button

## 13.3 Required simulation controls

- play
- pause
- reset
- step
- speed: 1x / 2x / 4x
- replay previous run

## 13.4 Required teaching affordances

- concept card sidebar
- hint button with escalating hints
- visible object labels
- success criteria checklist
- variable watch panel
- event log

---

# 14. Error Handling and Debugging UX

## 14.1 Design principle

The player should never be abandoned with raw Python errors alone.

Every error event should have:

1. raw technical message
2. translated plain-English explanation
3. source line highlight
4. suggested next action

## 14.2 Example translations

### NameError
Raw:
```python
NameError: name 'moistuer' is not defined
```

Translated:
> You used `moistuer`, but that name does not exist here. You may have meant `moisture`.

### IndentationError
Translated:
> Python uses indentation to group logic. This line is indented differently from what the block expects.

### Infinite loop guard
Translated:
> Your code appears to be repeating without changing the condition needed to stop. Check your `while` loop.

## 14.3 Debug features

Must support:

- current executing line highlight
- variable snapshots
- object state inspection
- recent actions log
- “what changed this run?” summary

---

# 15. Progression and Scoring

## 15.1 Progression tracks

### Restoration
Unlock new areas by solving levels.

### Mastery
Track concepts learned and applied correctly.

### Elegance
Optional scoring for concise, reusable, efficient solutions.

## 15.2 MVP scoring categories

For each level:

- **Correctness**: pass/fail
- **Efficiency**: basic resource use or action count
- **Readability**: heuristic only, not too strict
- **Robustness**: later levels only

## 15.3 Player-facing principle

Early game should emphasize correctness over elegance.

Do not punish beginner verbosity.

---

# 16. Content Plan: First 10 Tutorial Levels

Below is a concrete initial curriculum the coding agent should implement.

## Level 1 — “Power the Sprinkler”
**Concepts:** command execution, sequencing  
**Goal:** turn on the sprinkler and water one plant

### Available API
```python
sprinkler.on()
sprinkler.water(plant)
```

### Starter code
```python
# Turn on the sprinkler
# Then water the seedling
```

### Success condition
- sprinkler turned on
- seedling moisture increases above threshold

---

## Level 2 — “Store the Water Value”
**Concepts:** variables, numbers  
**Goal:** save a water amount in a variable and spray that amount

### Starter code
```python
water_needed = 3
sprinkler.spray(water_needed)
```

### Success condition
- variable used
- plant moisture reaches target

---

## Level 3 — “Name the Samples”
**Concepts:** strings, variables  
**Goal:** label two plant samples correctly

### Starter code
```python
sample_a = "fern"
sample_b = "orchid"
```

### Success condition
- correct assignments made
- labels appear in world

---

## Level 4 — “Check the Dry Plant”
**Concepts:** booleans, comparisons, `if`  
**Goal:** water only if a plant is dry

### Starter code
```python
if plant.moisture() < 30:
    sprinkler.water(plant)
```

### Success condition
- dry plant watered
- wet plant untouched

---

## Level 5 — “Shade Logic”
**Concepts:** `if` / `else`  
**Goal:** open or close shade canopy based on sunlight

### Starter code
```python
if weather.sunlight() > 80:
    canopy.close()
else:
    canopy.open()
```

### Success condition
- correct branch executed

---

## Level 6 — “Water Every Plant in Row A”
**Concepts:** lists, `for` loop  
**Goal:** iterate through a row of plants and water each one

### Starter code
```python
plants = greenhouse.row("A")

for plant in plants:
    sprinkler.water(plant)
```

### Success condition
- all plants in row A watered

---

## Level 7 — “Water Only the Dry Ones”
**Concepts:** loop + conditional composition  
**Goal:** only water plants below a moisture threshold

### Starter code
```python
plants = greenhouse.row("A")

for plant in plants:
    if plant.moisture() < 30:
        sprinkler.water(plant)
```

### Success condition
- only dry plants watered

---

## Level 8 — “Pump Until Full”
**Concepts:** `while` loop, changing state  
**Goal:** keep transferring water until a reservoir reaches target level

### Starter code
```python
while reservoir.level() < 100:
    pump.transfer()
```

### Success condition
- reservoir reaches exactly or above threshold
- infinite loop protection remains inactive

---

## Level 9 — “Reusable Harvest Routine”
**Concepts:** functions, parameters  
**Goal:** define a reusable function that harvests ripe plants

### Starter code
```python
def harvest_if_ripe(plant):
    if plant.is_ripe():
        drone.harvest(plant)
```

### Success condition
- function defined
- called on multiple plants

---

## Level 10 — “Species Nutrient Map”
**Concepts:** dictionaries  
**Goal:** map species to nutrient amounts and feed accordingly

### Starter code
```python
nutrients = {
    "fern": 2,
    "orchid": 5,
    "moss": 1
}

species = plant.species()
sprayer.feed(plant, nutrients[species])
```

### Success condition
- dictionary lookup used correctly
- plants receive proper nutrient amount

---

# 17. Hint System Design

## 17.1 Hint tiers

Each level should provide 3 levels of hints:

### Hint 1: direction
> You may need to repeat the same action for more than one plant.

### Hint 2: concept nudge
> In Python, `for` loops help you do something once for every item in a list.

### Hint 3: structural help
```python
for plant in plants:
    sprinkler.water(plant)
```

## 17.2 Unlock conditions

Hints should unlock:

- after repeated failed runs
- after idle time
- when explicitly requested

---

# 18. Visual Design Requirements

## 18.1 Art direction

The look should be:

- clean
- soft sci-fi
- bioluminescent
- readable
- not cluttered

## 18.2 Important visual language mappings

Programming constructs should correspond to visual metaphors:

| Programming Concept | Visual Metaphor |
|---|---|
| variable | labeled container / counter / tag |
| if/else | split pipe / route gate |
| loop | repeated path / sweep motion |
| function | reusable tool card / behavior module |
| list | tray / row / collection |
| dict | indexed catalog / species registry |

## 18.3 Readability constraints

- objects must have clear labels
- critical world state should be color + icon + text, not color only
- current active code line should clearly correspond to current world action

---

# 19. Accessibility Requirements

Must include:

- scalable text
- high-contrast mode
- keyboard-first editor interaction
- reduced motion option
- dyslexia-friendly font option if feasible
- colorblind-friendly status encoding
- captions/transcripts for narrative text
- non-timed puzzle progression in MVP

---

# 20. Technical Architecture Recommendation

## 20.1 Recommended stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Monaco Editor** for code editing
- lightweight 2D rendering via:
  - HTML canvas, or
  - PixiJS, or
  - React + canvas abstraction

### Python execution
Choose one of:

#### Option A — Pyodide in browser
Best for:
- real Python in-browser
- fast iteration
- easier local deployment
- deterministic sandboxing

#### Option B — Backend Python sandbox
Best for:
- stricter execution control
- more scalable future architecture
- richer instrumentation
- easier secure isolation if shipping widely

**Recommendation for MVP:**  
Use **Pyodide** if building a browser-first prototype quickly.  
Use **backend sandbox** if long-term productization matters more than prototyping speed.

## 20.2 High-level system architecture

```text
┌────────────────────────────────────────────────────────────┐
│ Frontend                                                   │
│ - world renderer                                           │
│ - mission UI                                               │
│ - editor                                                   │
│ - debug panel                                              │
└───────────────┬────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────────┐
│ Game Runtime Controller                                    │
│ - level loader                                             │
│ - run / step / reset orchestration                         │
│ - event log                                                │
│ - validation                                               │
└───────────────┬────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────────┐
│ Python Sandbox                                             │
│ - restricted globals                                       │
│ - allowed API injection                                    │
│ - execution tracing                                        │
│ - error capture                                            │
└───────────────┬────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────────┐
│ Simulation Engine                                          │
│ - entities                                                 │
│ - state transitions                                        │
│ - action scheduler                                         │
│ - replay                                                   │
└────────────────────────────────────────────────────────────┘
```

---

# 21. Runtime Model

## 21.1 Execution flow

```text
Load level
   ↓
Instantiate world state
   ↓
Inject allowed game API into sandbox
   ↓
Load starter code
   ↓
Player edits code
   ↓
Player clicks Run
   ↓
Sandbox executes code
   ↓
Code emits actions / logs / errors
   ↓
Simulation applies actions
   ↓
UI animates resulting world changes
   ↓
Validator checks mission success
```

## 21.2 Action abstraction

Important design choice:

Player code should not mutate deep engine state directly where possible.  
Instead, API methods should create **validated game actions**.

Example:
```python
sprinkler.water(plant)
```

internally becomes:
```text
Action(type="water_plant", target=plant_id, amount=default)
```

This makes replay, step-through, validation, and error tracing cleaner.

---

# 22. Suggested Internal Modules

## 22.1 Frontend modules
- `AppShell`
- `WorldView`
- `MissionPanel`
- `CodeEditor`
- `DebugPanel`
- `Toolbar`
- `HintPanel`
- `ConceptCard`

## 22.2 Runtime modules
- `LevelManager`
- `SimulationEngine`
- `ExecutionController`
- `EventLog`
- `Validator`
- `ReplayManager`

## 22.3 Sandbox modules
- `PythonExecutor`
- `SafeGlobalsBuilder`
- `TraceCollector`
- `ErrorTranslator`

## 22.4 Game object modules
- `Plant`
- `Sprinkler`
- `Drone`
- `Reservoir`
- `Storage`
- `Weather`
- `Canopy`
- `Pump`

---

# 23. Data Model Specification

## 23.1 Level definition schema

Each level should be data-driven.

Example structure:

```json
{
  "id": "level_07_dry_plants",
  "title": "Water Only the Dry Ones",
  "biome": "thirst_fields",
  "concepts": ["for_loop", "if_statement"],
  "mission_text": "Water all plants in row A whose moisture is below 30.",
  "starter_code": "plants = greenhouse.row(\"A\")\n\nfor plant in plants:\n    if plant.moisture() < 30:\n        sprinkler.water(plant)\n",
  "available_objects": ["greenhouse", "sprinkler"],
  "world": {
    "plants": [
      {"id": "p1", "row": "A", "moisture": 10},
      {"id": "p2", "row": "A", "moisture": 50},
      {"id": "p3", "row": "A", "moisture": 22}
    ]
  },
  "success_conditions": [
    {"type": "water_only_below_threshold", "row": "A", "threshold": 30}
  ],
  "hints": [
    "You may need to loop through all the plants in row A.",
    "Use an if statement to check whether each plant is dry.",
    "for plant in plants: ..."
  ]
}
```

## 23.2 Entity schema example

```ts
type Plant = {
  id: string
  name: string
  species: string
  moisture: number
  health: number
  ripe: boolean
  needsPollination: boolean
  position: { x: number; y: number }
}
```

---

# 24. Validation System

## 24.1 Why validation matters

A level should not only check end-state superficially.  
It should validate whether the solution satisfies intended constraints where needed.

## 24.2 Validation types

- end-state validation
- action sequence validation
- resource efficiency validation
- concept usage validation, lightly applied

## 24.3 Important caveat

Do **not** overconstrain solutions.  
Prefer validating outcome over exact code shape unless teaching a specific syntax form.

Bad validation:
- requires exact variable name
- requires exact loop formatting

Better validation:
- dry plants got watered
- wet plants did not
- player used at least one loop if the pedagogical aim is iteration

---

# 25. Save / Progress Model

MVP should save:

- unlocked levels
- stars or mastery rating
- hint usage
- last code entered per level
- concept mastery state

Optional:
- replay best solutions
- restoration map state

---

# 26. Telemetry and Analytics Recommendations

If analytics are included, capture:

- level completion rate
- average attempts per level
- common error categories
- hint usage frequency
- editor dwell time
- step-mode usage
- concept retention patterns

These are especially valuable for improving pedagogy.

---

# 27. Security / Sandbox Requirements

This is critical.

## 27.1 Must enforce
- no arbitrary imports
- no network access
- no local file access
- no process spawning
- execution timeouts
- memory guardrails
- max loop iteration or instruction budget
- protected engine objects

## 27.2 Infinite loop strategy

Use both:
- instruction counter
- wall-clock timeout

On trigger, pause execution and surface a helpful teaching message.

---

# 28. MVP Scope Definition

## 28.1 MVP includes

- single application shell
- 2D world rendering
- code editor
- safe Python execution
- run / reset / step
- friendly error translation
- 10 tutorial levels
- concept cards
- hints
- success validation
- save progress locally

## 28.2 MVP excludes

- large narrative campaign
- advanced art polish
- audio-rich cinematic storytelling
- economy, crafting, combat
- procedural levels
- custom level editor

---

# 29. Milestone Plan

## Milestone 1 — Core sandbox prototype
Deliver:
- editor
- run Python
- inject game API
- log actions
- simple single-level simulation

## Milestone 2 — World + validation loop
Deliver:
- 2D rendering
- action playback
- level reset
- success validation
- mission UI

## Milestone 3 — Teaching UX
Deliver:
- concept cards
- error translation
- hint system
- step-through execution
- variable watch

## Milestone 4 — Tutorial content
Deliver:
- first 10 levels
- progression unlocking
- polish on pacing and clarity

## Milestone 5 — MVP polish
Deliver:
- save state
- accessibility basics
- visual refinement
- analytics hooks

---

# 30. Acceptance Criteria

The MVP is acceptable only if:

1. A beginner can load the first level and solve it with no outside documentation.
2. Player code visibly changes the game world.
3. Python errors are translated into plain English.
4. Resetting and rerunning are fast.
5. At least 10 levels can be completed in sequence.
6. The game genuinely teaches authentic transferable Python syntax.
7. The UI clearly connects code lines to world effects.
8. The sandbox cannot escape into arbitrary system access.
9. The user can step through execution in a comprehensible way.
10. Multiple levels require loops and conditionals in meaningful contexts.

---

# 31. Risks and Mitigations

## Risk 1: Too much abstraction, weak Python transfer
**Mitigation:** keep syntax real, show actual code, avoid fake DSLs.

## Risk 2: Too much Python friction for beginners
**Mitigation:** constrained APIs, starter code, autocomplete, error translation.

## Risk 3: Code feels detached from gameplay
**Mitigation:** immediate visual world consequences for every action.

## Risk 4: Sandbox complexity overwhelms project
**Mitigation:** keep MVP API narrow and data-driven.

## Risk 5: Validation becomes brittle
**Mitigation:** validate outcomes over exact code where possible.

---

# 32. Coding Agent Implementation Instructions

This section is written directly for the coding agent.

## 32.1 Core instruction set

Build the MVP in a way that prioritizes:

- deterministic behavior
- beginner clarity
- maintainable modular architecture
- data-driven levels
- strict sandboxing
- fast local iteration

## 32.2 Architectural requirements

The agent should:

- separate simulation state from rendering state
- separate player code execution from game engine mutation
- use an event/action model rather than uncontrolled direct state mutation
- make level definitions declarative and externalized
- keep object APIs small and explicit
- ensure the validator system is pluggable per level

## 32.3 Code quality requirements

- strong typing where applicable
- modular components
- clean separation between UI and logic
- no massive monolithic files
- comments only where helpful
- clear naming
- unit-testable simulation and validation logic

## 32.4 Deliverables expected from the coding agent

At minimum:

- project scaffold
- runtime architecture
- editor integration
- sandbox integration
- world renderer
- 10 tutorial levels
- validation engine
- error translator
- local persistence
- README with setup/run instructions

---

# 33. Suggested Repository Structure

```text
codegarden/
├── app/
│   ├── components/
│   │   ├── WorldView/
│   │   ├── CodeEditor/
│   │   ├── MissionPanel/
│   │   ├── DebugPanel/
│   │   └── Toolbar/
│   ├── pages/
│   ├── styles/
│   └── main.tsx
├── engine/
│   ├── simulation/
│   │   ├── entities/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── validators/
│   ├── runtime/
│   │   ├── ExecutionController.ts
│   │   ├── EventLog.ts
│   │   └── ReplayManager.ts
│   ├── levels/
│   │   ├── level_01.json
│   │   ├── level_02.json
│   │   └── ...
│   └── api/
│       ├── gameApi.ts
│       └── objectBindings.ts
├── sandbox/
│   ├── PythonExecutor.ts
│   ├── SafeGlobals.ts
│   ├── TraceCollector.ts
│   └── ErrorTranslator.ts
├── shared/
│   ├── types/
│   └── utils/
├── tests/
├── public/
├── README.md
└── package.json
```

---

# 34. Example End-to-End Level Flow

Here is the conceptual flow for a canonical level:

```text
Level loads:
- Mission: Water only dry plants in row A
- Starter code appears
- World shows 5 plants with moisture bars
- Player edits code
- Presses Run

Execution:
- Sandbox runs code
- Each sprinkler.water(plant) call emits an action
- Runtime logs actions
- World animates watering
- Moisture bars update
- Validator checks:
    - all plants below threshold were watered
    - plants above threshold were not watered

Result:
- success panel shown
- concept summary:
  "You used a loop to repeat an action and an if statement to make a decision."
```

---

# 35. Future Extensions After MVP

These are explicitly post-MVP.

## 35.1 Content extensions
- more biomes
- pests and defenses
- logistics systems
- nutrient balancing
- sorting and classification tasks
- algorithmic optimization missions

## 35.2 Learning extensions
- nested loops
- list construction
- comprehensions
- classes later, maybe
- testing and assertions
- lightweight data analysis missions

## 35.3 Product extensions
- teacher dashboard
- classroom mode
- challenge mode
- sandbox garden
- custom level editor
- community puzzle sharing

---

# 36. Final Summary for the Coding Agent

Build **CodeGarden** as a Python-teaching game where:

- the player writes real beginner Python
- the code manipulates a visible simulation
- the simulation is deterministic and easy to inspect
- the UI tightly couples code, execution, and world feedback
- the level system is data-driven
- the sandbox is safe and constrained
- the game teaches through experimentation, not lecture

The MVP should feel like a polished vertical slice of a larger educational game, not a generic code editor with plants pasted on top.

---

# 37. Compact Build Brief

Use this as the short internal brief:

> Create a browser-based MVP of **CodeGarden**, a cozy educational game that teaches beginner Python through ecosystem restoration puzzles. The player writes real Python in a constrained sandbox to control objects like sprinklers, drones, pumps, and storage systems. Build a data-driven level system with 10 tutorial levels covering variables, conditionals, loops, functions, and dictionaries. Include a code editor, 2D world simulation, step-through execution, friendly error translation, hints, level validation, and local progress saving. Prioritize immediate visual feedback, beginner clarity, deterministic runtime behavior, and clean modular architecture.
