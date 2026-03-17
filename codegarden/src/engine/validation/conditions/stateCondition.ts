import type { WorldState, EntityType } from '@/types/entities.ts'

interface StateConditionParams {
  entity: string
  id?: string
  property: string
  operator?: '==' | '!=' | '>' | '<' | '>=' | '<='
  value?: unknown
  contains?: string
}

import type { ConditionResult } from '../Validator.ts'

function compare(actual: unknown, operator: string, expected: unknown): boolean {
  switch (operator) {
    case '==': return actual === expected
    case '!=': return actual !== expected
    case '>': return (actual as number) > (expected as number)
    case '<': return (actual as number) < (expected as number)
    case '>=': return (actual as number) >= (expected as number)
    case '<=': return (actual as number) <= (expected as number)
    default: return false
  }
}

const entityTypeMap: Record<string, EntityType> = {
  plant: 'plants',
  sprinkler: 'sprinklers',
  drone: 'drones',
  reservoir: 'reservoirs',
  storage: 'storages',
  canopy: 'canopies',
  pump: 'pumps',
  sprayer: 'sprayers',
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

/**
 * Find an entity by ID across all array collections in the world state.
 */
function findEntityById(world: WorldState, id: string): { entity: Record<string, unknown>; key: string } | null {
  for (const [key, value] of Object.entries(world)) {
    if (!Array.isArray(value)) continue
    const entity = (value as Record<string, unknown>[]).find((e) => e['id'] === id)
    if (entity) return { entity, key }
  }
  return null
}

export function checkStateCondition(
  params: StateConditionParams,
  world: WorldState,
  description: string,
): ConditionResult {
  // Handle weather entity specially (singleton, not in a collection)
  if (params.entity === 'weather') {
    const value = getNestedValue(world.weather as unknown as Record<string, unknown>, params.property)
    if (params.contains !== undefined) {
      const arr = Array.isArray(value) ? value : []
      return { passed: arr.includes(params.contains), description }
    }
    const op = params.operator ?? '=='
    return { passed: compare(value, op, params.value), description }
  }

  const collectionKey = entityTypeMap[params.entity]

  let entity: Record<string, unknown> | undefined

  if (collectionKey) {
    // Known entity type - find by id or use first in collection
    const collection = world[collectionKey] as unknown as Record<string, unknown>[]
    entity = params.id
      ? collection.find((e) => e['id'] === params.id)
      : collection[0]
  } else {
    // Entity name might be an ID directly (e.g., "plant_a1")
    const found = findEntityById(world, params.entity)
    if (found) {
      entity = found.entity
    }
  }

  if (!entity) {
    return { passed: false, description: `Entity ${params.id ?? params.entity} not found` }
  }

  const actual = getNestedValue(entity, params.property)

  // Handle "contains" check for arrays
  if (params.contains !== undefined) {
    const arr = Array.isArray(actual) ? actual : []
    return { passed: arr.includes(params.contains), description }
  }

  const op = params.operator ?? '=='
  return { passed: compare(actual, op, params.value), description }
}
