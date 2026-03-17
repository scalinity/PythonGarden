import { produce } from 'immer'
import type { GameAction } from '@/types/actions.ts'
import type { WorldState } from '@/types/entities.ts'

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export function applyAction(world: WorldState, action: GameAction): WorldState {
  return produce(world, (draft) => {
    switch (action.type) {
      case 'water_plant': {
        const plant = draft.plants.find((p) => p.id === action.target)
        if (plant) {
          plant.moisture = clamp(plant.moisture + (action.amount ?? 20), 0, 100)
          plant.health = clamp(plant.health + 5, 0, 100)
        }
        break
      }

      case 'sprinkler_on': {
        const sprinkler = draft.sprinklers.find((s) => s.id === action.target)
        if (sprinkler) sprinkler.isOn = true
        break
      }

      case 'sprinkler_off': {
        const sprinkler = draft.sprinklers.find((s) => s.id === action.target)
        if (sprinkler) sprinkler.isOn = false
        break
      }

      case 'spray': {
        const sprinkler = draft.sprinklers.find((s) => s.id === action.target)
        if (sprinkler) {
          for (const plant of draft.plants) {
            if (distance(sprinkler.position, plant.position) <= 2) {
              plant.moisture = clamp(plant.moisture + (action.amount ?? 15), 0, 100)
            }
          }
        }
        break
      }

      case 'drone_move_to': {
        const drone = draft.drones.find((d) => d.id === action.source)
        if (drone && action.target) {
          // Find target entity position across all collections
          for (const key of Object.keys(draft) as (keyof WorldState)[]) {
            if (key === 'weather') continue
            const collection = draft[key]
            if (!Array.isArray(collection)) continue
            const entity = (collection as { id: string; position?: { x: number; y: number } }[])
              .find((e) => e.id === action.target)
            if (entity?.position) {
              drone.position = { ...entity.position }
              break
            }
          }
        }
        break
      }

      case 'drone_harvest': {
        const drone = draft.drones.find((d) => d.id === action.source)
        const plant = draft.plants.find((p) => p.id === action.target)
        if (drone && plant && plant.ripe) {
          plant.ripe = false
          drone.carrying = plant.species
        }
        break
      }

      case 'drone_pollinate': {
        const plant = draft.plants.find((p) => p.id === action.target)
        if (plant) plant.needsPollination = false
        break
      }

      case 'pump_transfer': {
        const pump = draft.pumps.find((p) => p.id === action.source)
        const reservoir = draft.reservoirs.find((r) => r.id === action.target)
        if (pump && reservoir) {
          reservoir.level = clamp(reservoir.level + pump.transferRate, 0, reservoir.maxLevel)
        }
        break
      }

      case 'canopy_open': {
        const canopy = draft.canopies.find((c) => c.id === action.target)
        if (canopy) canopy.isOpen = true
        break
      }

      case 'canopy_close': {
        const canopy = draft.canopies.find((c) => c.id === action.target)
        if (canopy) canopy.isOpen = false
        break
      }

      case 'feed_plant': {
        const plant = draft.plants.find((p) => p.id === action.target)
        if (plant) {
          plant.health = clamp(plant.health + (action.amount ?? 10), 0, 100)
        }
        break
      }

      case 'store_item': {
        const storage = draft.storages.find((s) => s.id === action.target)
        if (storage && action.value) {
          storage.items.push(action.value)
        }
        break
      }

      case 'store_in_bin': {
        const storage = draft.storages.find((s) => s.id === action.target)
        if (storage && action.value && action.source) {
          const binName = action.source
          if (!storage.bins[binName]) {
            storage.bins[binName] = []
          }
          storage.bins[binName].push(action.value)
        }
        break
      }

      case 'log':
      case 'highlight':
        // No world state changes for these
        break
    }
  })
}
