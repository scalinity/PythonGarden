import type { GameAction, ActionType } from '@/types/actions.ts'
import type { WorldState, EntityType } from '@/types/entities.ts'

interface ValidationResult {
  valid: boolean
  reason?: string
}

const actionEntityMap: Record<ActionType, EntityType | null> = {
  water_plant: 'plants',
  feed_plant: 'plants',
  sprinkler_on: 'sprinklers',
  sprinkler_off: 'sprinklers',
  spray: 'sprinklers',
  drone_move_to: 'drones',
  drone_harvest: 'drones',
  drone_pollinate: 'drones',
  pump_transfer: 'pumps',
  canopy_open: 'canopies',
  canopy_close: 'canopies',
  store_item: 'storages',
  store_in_bin: 'storages',
  log: null,
  highlight: null,
}

function findEntity(world: WorldState, entityType: EntityType, id: string): boolean {
  const collection = world[entityType] as { id: string }[]
  return collection.some((e) => e.id === id)
}

export function validateAction(action: GameAction, world: WorldState): ValidationResult {
  if (action.type === 'log' || action.type === 'highlight') {
    return { valid: true }
  }

  const entityType = actionEntityMap[action.type]
  if (!entityType) {
    return { valid: false, reason: `Unknown action type: ${action.type}` }
  }

  // Self-targeting actions: entity ID is in source (the entity acts on itself)
  const selfActions: ActionType[] = [
    'sprinkler_on', 'sprinkler_off', 'spray',
    'canopy_open', 'canopy_close',
    'store_item', 'store_in_bin',
  ]

  if (selfActions.includes(action.type)) {
    if (!action.source) {
      return { valid: false, reason: `Action ${action.type} requires a source entity` }
    }
    if (!findEntity(world, entityType, action.source)) {
      return { valid: false, reason: `Source entity '${action.source}' not found in ${entityType}` }
    }
  }

  // Actions targeting another entity: entity ID is in source, target is the other entity
  if (action.type === 'water_plant' || action.type === 'feed_plant') {
    if (!action.target) {
      return { valid: false, reason: `Action ${action.type} requires a target plant` }
    }
    if (!findEntity(world, 'plants', action.target)) {
      return { valid: false, reason: `Target plant '${action.target}' not found` }
    }
  }

  // Drone actions need source drone
  if (action.type === 'drone_move_to' || action.type === 'drone_harvest' || action.type === 'drone_pollinate') {
    if (!action.source) {
      return { valid: false, reason: `Action ${action.type} requires a source drone` }
    }
    if (!findEntity(world, 'drones', action.source)) {
      return { valid: false, reason: `Source drone '${action.source}' not found` }
    }
  }

  // drone_harvest and drone_pollinate also need a target plant
  if (action.type === 'drone_harvest' || action.type === 'drone_pollinate') {
    if (!action.target) {
      return { valid: false, reason: `Action ${action.type} requires a target plant` }
    }
    if (!findEntity(world, 'plants', action.target)) {
      return { valid: false, reason: `Target plant '${action.target}' not found` }
    }
  }

  // drone_move_to needs a target entity (any type)
  if (action.type === 'drone_move_to' && action.target) {
    const found = (Object.keys(world) as EntityType[]).some((key) => {
      if (key === 'weather') return false
      const collection = world[key]
      if (!Array.isArray(collection)) return false
      return (collection as { id: string }[]).some((e) => e.id === action.target)
    })
    if (!found) {
      return { valid: false, reason: `Move target '${action.target}' not found in any entity collection` }
    }
  }

  // pump_transfer needs a source pump; target reservoir is optional (falls back to first)
  if (action.type === 'pump_transfer') {
    if (!action.source) {
      return { valid: false, reason: 'pump_transfer requires a source pump' }
    }
    if (!findEntity(world, 'pumps', action.source)) {
      return { valid: false, reason: `Source pump '${action.source}' not found` }
    }
    if (action.target && !findEntity(world, 'reservoirs', action.target)) {
      return { valid: false, reason: `Target reservoir '${action.target}' not found` }
    }
  }

  return { valid: true }
}
