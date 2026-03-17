import type { GameAction, ActionResult } from '@/types/actions.ts'
import type { WorldState } from '@/types/entities.ts'
import type { LevelDefinition } from '@/types/level.ts'
import {
  PlantEntity,
  SprinklerEntity,
  DroneEntity,
  ReservoirEntity,
  StorageEntity,
  WeatherEntity,
  CanopyEntity,
  PumpEntity,
  SprayerEntity,
} from './entities/index.ts'
import { validateAction } from './actions/ActionValidator.ts'
import { applyAction } from './actions/ActionApplicator.ts'

const DEFAULT_WEATHER = { sunlight: 50, temperature: 22 }

export class SimulationEngine {
  private plants: PlantEntity[] = []
  private sprinklers: SprinklerEntity[] = []
  private drones: DroneEntity[] = []
  private reservoirs: ReservoirEntity[] = []
  private storages: StorageEntity[] = []
  private weather: WeatherEntity = new WeatherEntity(DEFAULT_WEATHER)
  private canopies: CanopyEntity[] = []
  private pumps: PumpEntity[] = []
  private sprayers: SprayerEntity[] = []

  private initialSnapshot: WorldState | null = null

  loadLevel(def: LevelDefinition): void {
    const w = def.world
    this.plants = (w.plants ?? []).map(PlantEntity.fromState)
    this.sprinklers = (w.sprinklers ?? []).map(SprinklerEntity.fromState)
    this.drones = (w.drones ?? []).map(DroneEntity.fromState)
    this.reservoirs = (w.reservoirs ?? []).map(ReservoirEntity.fromState)
    this.storages = (w.storages ?? []).map(StorageEntity.fromState)
    this.weather = new WeatherEntity(w.weather ?? DEFAULT_WEATHER)
    this.canopies = (w.canopies ?? []).map(CanopyEntity.fromState)
    this.pumps = (w.pumps ?? []).map(PumpEntity.fromState)
    this.sprayers = (w.sprayers ?? []).map(SprayerEntity.fromState)

    this.initialSnapshot = this.getWorldState()
  }

  applyAction(action: GameAction): ActionResult {
    const world = this.getWorldState()
    const validation = validateAction(action, world)

    if (!validation.valid) {
      return { success: false, action, error: validation.reason }
    }

    const newWorld = applyAction(world, action)
    this.loadWorldState(newWorld)

    return { success: true, action }
  }

  getWorldState(): WorldState {
    return {
      plants: this.plants.map((p) => p.toState()),
      sprinklers: this.sprinklers.map((s) => s.toState()),
      drones: this.drones.map((d) => d.toState()),
      reservoirs: this.reservoirs.map((r) => r.toState()),
      storages: this.storages.map((s) => s.toState()),
      weather: this.weather.toState(),
      canopies: this.canopies.map((c) => c.toState()),
      pumps: this.pumps.map((p) => p.toState()),
      sprayers: this.sprayers.map((s) => s.toState()),
    }
  }

  getInitialWorldState(): WorldState | null {
    return this.initialSnapshot
  }

  reset(): void {
    if (this.initialSnapshot) {
      this.loadWorldState(this.initialSnapshot)
    }
  }

  private loadWorldState(state: WorldState): void {
    this.plants = state.plants.map(PlantEntity.fromState)
    this.sprinklers = state.sprinklers.map(SprinklerEntity.fromState)
    this.drones = state.drones.map(DroneEntity.fromState)
    this.reservoirs = state.reservoirs.map(ReservoirEntity.fromState)
    this.storages = state.storages.map(StorageEntity.fromState)
    this.weather = WeatherEntity.fromState(state.weather)
    this.canopies = state.canopies.map(CanopyEntity.fromState)
    this.pumps = state.pumps.map(PumpEntity.fromState)
    this.sprayers = state.sprayers.map(SprayerEntity.fromState)
  }
}
