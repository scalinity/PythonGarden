import type { WorldState, EntityType } from '@/types/entities.ts'

interface StateConditionParams {
  entity: string
  id: string
  property: string
  operator: '==' | '!=' | '>' | '<' | '>=' | '<='
  value: unknown
}

export interface ConditionResult {
  passed: boolean
  description: string
}

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

export function checkStateCondition(
  params: StateConditionParams,
  world: WorldState,
  description: string,
): ConditionResult {
  const collectionKey = entityTypeMap[params.entity]
  if (!collectionKey) {
    return { passed: false, description: `Unknown entity type: ${params.entity}` }
  }

  if (collectionKey === 'weather') {
    const value = (world.weather as unknown as Record<string, unknown>)[params.property]
    return {
      passed: compare(value, params.operator, params.value),
      description,
    }
  }

  const collection = world[collectionKey] as unknown as Record<string, unknown>[]
  const entity = collection.find((e) => e['id'] === params.id)

  if (!entity) {
    return { passed: false, description: `Entity ${params.id} not found` }
  }

  const actual = entity[params.property]
  return {
    passed: compare(actual, params.operator, params.value),
    description,
  }
}
