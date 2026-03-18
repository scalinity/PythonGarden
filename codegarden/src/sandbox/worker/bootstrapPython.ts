/**
 * Python code that runs inside Pyodide to set up the sandboxed execution
 * environment. Exported as template literal strings so the worker can
 * feed them to pyodide.runPython().
 */

// ---------------------------------------------------------------------------
// 1. Core safe-builtins and globals builder
// ---------------------------------------------------------------------------
export const BOOTSTRAP_SAFE_GLOBALS = `
import sys as _sys
import json as _json
import inspect as _inspect
import time as _time
import re as _re
import keyword as _keyword

# Extract what we need from inspect, then remove module reference
_currentframe = _inspect.currentframe
del _inspect

# ---- Safe builtins allow-list ------------------------------------------------
_SAFE_BUILTINS = {
    'print':      print,
    'range':      range,
    'len':        len,
    'int':        int,
    'float':      float,
    'str':        str,
    'bool':       bool,
    'list':       list,
    'dict':       dict,
    'tuple':      tuple,
    'set':        set,
    'enumerate':  enumerate,
    'zip':        zip,
    'map':        map,
    'filter':     filter,
    'sorted':     sorted,
    'reversed':   reversed,
    'min':        min,
    'max':        max,
    'sum':        sum,
    'abs':        abs,
    'round':      round,
    'isinstance': isinstance,
    'True':       True,
    'False':      False,
    'None':       None,
}

# ---- Globals ----------------------------------------------------------------
_action_queue = []
_trace_entries = []
_log_messages = []
_instruction_count = 0
_INSTRUCTION_BUDGET = 50000
_MAX_ACTIONS = 500
_MAX_TRACE_ENTRIES = 5000
_MAX_LOG_MESSAGES = 200
_step_mode = False
_interrupt_view = None          # Int32Array view set by worker

class InstructionBudgetExceeded(Exception):
    pass

class ExecutionCancelled(Exception):
    pass
`

// ---------------------------------------------------------------------------
// 2. Stub classes for game API objects
// ---------------------------------------------------------------------------
export const BOOTSTRAP_STUBS = `
def _current_line():
    """Return the line number of the caller's caller in user code."""
    frame = _currentframe()
    try:
        caller = frame.f_back.f_back  # skip _current_line -> method -> user code
        return caller.f_lineno if caller else 0
    finally:
        del frame


def _enqueue(action_type, **kwargs):
    if len(_action_queue) >= _MAX_ACTIONS:
        return
    _action_queue.append({
        'type': action_type,
        'sourceLine': kwargs.pop('_line', _current_line()),
        'timestamp': _time.time(),
        **kwargs,
    })


# ---- Plant stub --------------------------------------------------------------
class _PlantStub:
    __slots__ = ('_id', '_props', 'name')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}
        self.name = self._props.get('name', self._id)

    @property
    def moisture(self):
        return self._props.get('moisture', 0)

    @property
    def health(self):
        return self._props.get('health', 100)

    @property
    def is_ripe(self):
        return self._props.get('ripe', False)

    @property
    def ripe(self):
        return self._props.get('ripe', False)

    @property
    def species(self):
        return self._props.get('species', 'unknown')

    @property
    def needs_pollination(self):
        return self._props.get('needsPollination', False)

    def __repr__(self):
        return f"Plant({self.name!r})"


# ---- Sprinkler stub ----------------------------------------------------------
class _SprinklerStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    @property
    def isOn(self):
        return self._props.get('isOn', False)

    def on(self):
        _enqueue('sprinkler_on', source=self._id, _line=_current_line())
        self._props['isOn'] = True

    def off(self):
        _enqueue('sprinkler_off', source=self._id, _line=_current_line())
        self._props['isOn'] = False

    def water(self, plant):
        if not self._props.get('isOn', False):
            return
        target = plant._id if hasattr(plant, '_id') else str(plant)
        _enqueue('water_plant', source=self._id, target=target, _line=_current_line())
        # Mirror state change so while-loop conditions terminate correctly
        if hasattr(plant, '_props'):
            plant._props['moisture'] = min(plant._props.get('moisture', 0) + 20, 100)

    def spray(self, amount=1):
        if not self._props.get('isOn', False):
            return
        _enqueue('spray', source=self._id, amount=amount, _line=_current_line())

    def __repr__(self):
        return f"Sprinkler({self._id!r})"


# ---- Drone stub ---------------------------------------------------------------
class _DroneStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    def move_to(self, target):
        t = target._id if hasattr(target, '_id') else str(target)
        _enqueue('drone_move_to', source=self._id, target=t, _line=_current_line())

    def harvest(self, plant):
        t = plant._id if hasattr(plant, '_id') else str(plant)
        _enqueue('drone_harvest', source=self._id, target=t, _line=_current_line())

    def pollinate(self, flower):
        t = flower._id if hasattr(flower, '_id') else str(flower)
        _enqueue('drone_pollinate', source=self._id, target=t, _line=_current_line())

    def __repr__(self):
        return f"Drone({self._id!r})"


# ---- Reservoir stub -----------------------------------------------------------
class _ReservoirStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    @property
    def level(self):
        return self._props.get('level', 0)

    @property
    def max_level(self):
        return self._props.get('maxLevel', 100)

    def __repr__(self):
        return f"Reservoir({self._id!r})"


# ---- Storage stub -------------------------------------------------------------
class _StorageStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    def store(self, item):
        v = item._id if hasattr(item, '_id') else str(item)
        _enqueue('store_item', source=self._id, value=v, _line=_current_line())

    def store_in(self, bin_name, item):
        v = item._id if hasattr(item, '_id') else str(item)
        _enqueue('store_in_bin', source=self._id, target=bin_name, value=v, _line=_current_line())

    def file(self, bin_name, item):
        """Alias for store_in."""
        v = str(item) if not hasattr(item, '_id') else item._id
        _enqueue('store_in_bin', source=self._id, target=bin_name, value=v, _line=_current_line())

    @property
    def items(self):
        return list(self._props.get('items', []))

    def count(self, item_type=None):
        items_list = self._props.get('items', [])
        if item_type is None:
            return len(items_list)
        return sum(1 for i in items_list if i == item_type)

    def __repr__(self):
        return f"Storage({self._id!r})"


# ---- Weather stub -------------------------------------------------------------
class _WeatherStub:
    __slots__ = ('_props',)
    def __init__(self, descriptor):
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    @property
    def sunlight(self):
        return self._props.get('sunlight', 50)

    @property
    def temperature(self):
        return self._props.get('temperature', 20)

    def __repr__(self):
        return "Weather()"


# ---- Canopy stub --------------------------------------------------------------
class _CanopyStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    @property
    def isOpen(self):
        return self._props.get('isOpen', False)

    def open(self):
        _enqueue('canopy_open', source=self._id, _line=_current_line())

    def close(self):
        _enqueue('canopy_close', source=self._id, _line=_current_line())

    def __repr__(self):
        return f"Canopy({self._id!r})"


# ---- Pump stub ----------------------------------------------------------------
class _PumpStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    def transfer(self, target=None):
        t = target._id if target is not None and hasattr(target, '_id') else None
        _enqueue('pump_transfer', source=self._id, target=t, _line=_current_line())
        # Mirror state change so while-loop conditions terminate correctly
        if target is not None and hasattr(target, '_props'):
            rate = self._props.get('transferRate', 10)
            max_lv = target._props.get('maxLevel', 100)
            target._props['level'] = min(target._props.get('level', 0) + rate, max_lv)

    def __repr__(self):
        return f"Pump({self._id!r})"


# ---- Sprayer stub -------------------------------------------------------------
class _SprayerStub:
    __slots__ = ('_id', '_props')
    def __init__(self, descriptor):
        self._id = descriptor['id']
        self._props = {p['name']: p['value'] for p in descriptor['properties']}

    def feed(self, plant, amount=1):
        t = plant._id if hasattr(plant, '_id') else str(plant)
        _enqueue('feed_plant', source=self._id, target=t, amount=amount, _line=_current_line())

    def __repr__(self):
        return f"Sprayer({self._id!r})"


# ---- Greenhouse stub ----------------------------------------------------------
class _GreenhouseStub:
    __slots__ = ('_props', '_plants')
    def __init__(self, descriptor, all_plants):
        self._props = {p['name']: p['value'] for p in descriptor['properties']}
        self._plants = all_plants  # list of _PlantStub

    def row(self, name):
        return [p for p in self._plants if p._props.get('row') == name]

    def __repr__(self):
        return "Greenhouse()"


# ---- Stub factory -------------------------------------------------------------
_STUB_MAP = {
    'Plant':      _PlantStub,
    'Sprinkler':  _SprinklerStub,
    'Drone':      _DroneStub,
    'Reservoir':  _ReservoirStub,
    'Storage':    _StorageStub,
    'Weather':    _WeatherStub,
    'Canopy':     _CanopyStub,
    'Pump':       _PumpStub,
    'Sprayer':    _SprayerStub,
}
`

// ---------------------------------------------------------------------------
// 3. Trace function and safe-globals builder
// ---------------------------------------------------------------------------
export const BOOTSTRAP_TRACE = `
def _make_trace_fn(interrupt_view, step_mode_flag):
    """Create a sys.settrace callback."""
    global _instruction_count

    def _trace_fn(frame, event, arg):
        global _instruction_count

        # Only trace user code (filename '<exec>')
        if frame.f_code.co_filename != '<exec>':
            return _trace_fn

        if event == 'line':
            # Check interrupt flag (index 0)
            if interrupt_view is not None:
                flag = interrupt_view[0]
                if flag == 1:
                    raise ExecutionCancelled("Execution cancelled by user")

            _instruction_count += 1
            if _instruction_count > _INSTRUCTION_BUDGET:
                raise InstructionBudgetExceeded(
                    f"Code exceeded the instruction budget of {_INSTRUCTION_BUDGET} steps"
                )

            # Collect variable snapshot
            local_vars = []
            for k, v in frame.f_locals.items():
                if not k.startswith('_'):
                    try:
                        local_vars.append({
                            'name': k,
                            'value': repr(v)[:200],
                            'type': type(v).__name__,
                        })
                    except Exception:
                        pass

            if len(_trace_entries) < _MAX_TRACE_ENTRIES:
                _trace_entries.append({
                    'line': frame.f_lineno,
                    'variables': local_vars,
                    'timestamp': _time.time(),
                })

            # Step mode: pause and wait for continue signal (index 1)
            if step_mode_flag and interrupt_view is not None:
                from js import Atomics, Int32Array
                # Signal that we are paused
                interrupt_view[1] = 0
                # Post step-paused message
                from js import postMessage
                postMessage(_json.dumps({
                    'type': 'step-paused',
                    'line': frame.f_lineno,
                    'variables': local_vars,
                }))
                # Wait until index 1 is set to 1 (continue)
                Atomics.wait(interrupt_view, 1, 0)

        return _trace_fn

    return _trace_fn
`

// ---------------------------------------------------------------------------
// 4. Build safe globals and execute user code
// ---------------------------------------------------------------------------
export const BOOTSTRAP_EXECUTE = `
def _is_safe_name(name):
    """Check that a descriptor name is a safe Python identifier."""
    return (
        _re.match(r'^[a-zA-Z][a-zA-Z0-9_]*$', name) is not None
        and not name.startswith('_')
        and not _keyword.iskeyword(name)
    )


def _build_safe_globals(descriptors_json):
    """Build a restricted namespace from game object descriptors."""
    descriptors = _json.loads(descriptors_json)
    ns = dict(_SAFE_BUILTINS)
    ns['__builtins__'] = {}

    # Override print to capture logs
    def _safe_print(*args, sep=' ', end='\\n'):
        msg = sep.join(str(a) for a in args) + end
        if len(_log_messages) < _MAX_LOG_MESSAGES:
            _log_messages.append(msg.rstrip('\\n'))
    ns['print'] = _safe_print

    # Add log and highlight helpers
    def _log(message):
        if len(_log_messages) < _MAX_LOG_MESSAGES:
            _log_messages.append(str(message))
        _enqueue('log', value=str(message), _line=_current_line())
    ns['log'] = _log

    def _highlight(target):
        t = target._id if hasattr(target, '_id') else str(target)
        _enqueue('highlight', target=t, _line=_current_line())
    ns['highlight'] = _highlight

    # Build stubs
    plant_stubs = []
    all_stubs_by_type = {}  # type -> [stub, ...]
    for desc in descriptors:
        stub_cls = _STUB_MAP.get(desc['type'])
        if stub_cls is None:
            continue
        name = desc['name']
        if not _is_safe_name(name):
            continue
        if desc['type'] == 'Plant':
            stub = stub_cls(desc)
            plant_stubs.append(stub)
            ns[name] = stub
            all_stubs_by_type.setdefault('Plant', []).append(stub)
        elif desc['type'] == 'Greenhouse':
            pass  # handled below after all plants are built
        else:
            stub = stub_cls(desc)
            ns[name] = stub
            all_stubs_by_type.setdefault(desc['type'], []).append(stub)

    # Build greenhouse stub if present
    for desc in descriptors:
        if desc['type'] == 'Greenhouse':
            gh = _GreenhouseStub(desc, plant_stubs)
            ns[desc['name']] = gh
            # Also expose row shortcuts (e.g., row_a = greenhouse.row("A"))
            for row_name in desc.get('properties', []):
                if row_name.get('name') == 'rows':
                    for rn in row_name.get('value', []):
                        var_name = f"row_{rn.lower()}"
                        ns[var_name] = gh.row(rn)

    # Expose collection lists for levels that need them
    # e.g., "plants" = list of all plant stubs
    if len(plant_stubs) > 1 and 'plants' not in ns:
        ns['plants'] = list(plant_stubs)

    return ns


def _execute_user_code(code, descriptors_json, step_mode, interrupt_view):
    """Execute user code in a sandboxed namespace. Returns results as JSON."""
    global _action_queue, _trace_entries, _log_messages, _instruction_count
    _action_queue = []
    _trace_entries = []
    _log_messages = []
    _instruction_count = 0

    ns = _build_safe_globals(descriptors_json)

    trace_fn = _make_trace_fn(interrupt_view, step_mode)
    _sys.settrace(trace_fn)

    error = None
    try:
        compiled = compile(code, '<exec>', 'exec')
        exec(compiled, ns)
    except InstructionBudgetExceeded as e:
        error = {
            'headline': 'Too many instructions',
            'explanation': 'Your code ran for too long. You might have an infinite loop.',
            'suggestedAction': 'Check your loops and make sure they have a stopping condition.',
            'rawError': str(e),
        }
    except ExecutionCancelled as e:
        error = {
            'headline': 'Execution cancelled',
            'explanation': 'You stopped the code.',
            'suggestedAction': 'Click Run to try again.',
            'rawError': str(e),
        }
    except SyntaxError as e:
        error = {
            'headline': 'Syntax Error',
            'explanation': f"Python couldn't understand your code on line {e.lineno}.",
            'highlightLine': e.lineno,
            'suggestedAction': 'Check for missing colons, brackets, or typos.',
            'rawError': str(e),
        }
    except NameError as e:
        error = {
            'headline': 'Name not found',
            'explanation': str(e),
            'suggestedAction': 'Check that you spelled the variable or function name correctly.',
            'rawError': str(e),
        }
    except TypeError as e:
        error = {
            'headline': 'Type Error',
            'explanation': str(e),
            'suggestedAction': 'Check the types of your variables and function arguments.',
            'rawError': str(e),
        }
    except Exception as e:
        error = {
            'headline': type(e).__name__,
            'explanation': str(e),
            'suggestedAction': 'Read the error message and check your code.',
            'rawError': str(e),
        }
    finally:
        _sys.settrace(None)

    # Collect final variable snapshot from last trace entry
    final_vars = _trace_entries[-1]['variables'] if _trace_entries else []

    return _json.dumps({
        'success': error is None,
        'actions': _action_queue,
        'traceEntries': _trace_entries,
        'variables': final_vars,
        'error': error,
        'logs': _log_messages,
    })
`
