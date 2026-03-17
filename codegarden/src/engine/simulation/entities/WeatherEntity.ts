import type { Weather } from '@/types/entities.ts'

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export class WeatherEntity {
  sunlight: number
  temperature: number

  constructor(state: Weather) {
    this.sunlight = clamp(state.sunlight, 0, 100)
    this.temperature = state.temperature
  }

  toState(): Weather {
    return {
      sunlight: this.sunlight,
      temperature: this.temperature,
    }
  }

  static fromState(state: Weather): WeatherEntity {
    return new WeatherEntity(state)
  }
}
