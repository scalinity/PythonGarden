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

  // Actions that need a target entity
  const targetActions: ActionType[] = [
    'water_plant', 'feed_plant', 'sprinkler_on', 'sprinkler_off',
    'spray', 'canopy_open', 'canopy_close', 'store_item', 'store_in_bin',
  ]

  // Actions that need a source entity
  const sourceActions: ActionType[] = [
    'drone_move_to', 'drone_harvest', 'drone_pollinate', 'pump_transfer',
  ]

  if (targetActions.includes(action.type)) {
    if (!action.target) {
      return { valid: false, reason: `Action ${action.type} requires a target` }
    }
    if (!findEntity(world, entityType, action.target)) {
      return { valid: false, reason: `Target entity '${action.target}' not found in ${entityType}` }
    }
  }

  if (sourceActions.includes(action.type)) {
    if (!action.source) {
      return { valid: false, reason: `Action ${action.type} requires a source` }
    }
    if (!findEntity(world, entityType, action.source)) {
      return { valid: false, reason: `Source entity '${action.source}' not found in ${entityType}` }
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

  // pump_transfer needs a target reservoir
  if (action.type === 'pump_transfer') {
    if (!action.target) {
      return { valid: false, reason: 'pump_transfer requires a target reservoir' }
    }
    if (!findEntity(world, 'reservoirs', action.target)) {
      return { valid: false, reason: `Target reservoir '${action.target}' not found` }
    }
  }

  return { valid: true }
}
