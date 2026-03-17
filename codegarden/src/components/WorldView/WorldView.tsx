import { useEffect, useRef } from 'react'
import { Application, Graphics, Text, Container } from 'pixi.js'
import type { WorldState, Plant, Sprinkler, Drone, Reservoir, Canopy, Pump } from '@/types/entities.ts'

interface WorldViewProps {
  worldState: WorldState
  activeLine?: number
}

const CELL = 48
const PADDING = 24

function drawPlant(g: Graphics, plant: Plant, x: number, y: number, active: boolean) {
  const healthRatio = plant.health / 100
  const r = Math.max(0, Math.min(1, healthRatio))
  const green = Math.round(r * 200 + 55)
  const red = Math.round((1 - r) * 200)
  const color = (red << 16) | (green << 8) | 0x20

  if (active) {
    g.circle(x, y, 18)
    g.fill({ color: 0x22d3ee, alpha: 0.3 })
  }

  g.circle(x, y, 14)
  g.fill({ color })

  // moisture bar background
  g.rect(x - 14, y + 18, 28, 4)
  g.fill({ color: 0x1a2332 })

  // moisture bar fill
  const moistureFill = Math.min(1, plant.moisture / 100)
  g.rect(x - 14, y + 18, 28 * moistureFill, 4)
  g.fill({ color: 0x38bdf8 })
}

function drawSprinkler(g: Graphics, s: Sprinkler, x: number, y: number) {
  const color = s.isOn ? 0x38bdf8 : 0x2d3a4d
  g.rect(x - 10, y - 10, 20, 20)
  g.fill({ color })
  if (s.isOn) {
    g.rect(x - 12, y - 12, 24, 24)
    g.fill({ color: 0x38bdf8, alpha: 0.2 })
  }
}

function drawDrone(g: Graphics, d: Drone, x: number, y: number) {
  const offsets: Record<string, [number, number, number, number, number, number]> = {
    north: [x, y - 10, x - 8, y + 8, x + 8, y + 8],
    south: [x, y + 10, x - 8, y - 8, x + 8, y - 8],
    east: [x + 10, y, x - 8, y - 8, x - 8, y + 8],
    west: [x - 10, y, x + 8, y - 8, x + 8, y + 8],
  }
  const [x1, y1, x2, y2, x3, y3] = offsets[d.direction] ?? offsets.north
  g.moveTo(x1, y1)
  g.lineTo(x2, y2)
  g.lineTo(x3, y3)
  g.closePath()
  g.fill({ color: 0xfbbf24 })
}

function drawReservoir(g: Graphics, r: Reservoir, x: number, y: number) {
  // tank outline
  g.rect(x - 10, y - 20, 20, 40)
  g.fill({ color: 0x1a2332 })
  g.stroke({ color: 0x2d3a4d, width: 1 })

  // fill level
  const fill = Math.min(1, r.level / r.maxLevel)
  const fillH = 38 * fill
  g.rect(x - 9, y + 19 - fillH, 18, fillH)
  g.fill({ color: 0x38bdf8, alpha: 0.7 })
}

function drawCanopy(g: Graphics, c: Canopy, x: number, y: number) {
  g.moveTo(x - 20, y + 5)
  g.quadraticCurveTo(x, c.isOpen ? y - 20 : y - 5, x + 20, y + 5)
  g.stroke({ color: c.isOpen ? 0x34d399 : 0x94a3b8, width: 3 })
}

function drawPump(g: Graphics, _p: Pump, x: number, y: number) {
  g.circle(x, y, 10)
  g.fill({ color: 0x94a3b8 })
  // gear teeth
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6
    g.rect(x + Math.cos(angle) * 10 - 2, y + Math.sin(angle) * 10 - 2, 4, 4)
    g.fill({ color: 0x94a3b8 })
  }
}

export function WorldView({ worldState, activeLine }: WorldViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const app = new Application()
    appRef.current = app
    let destroyed = false

    const init = async () => {
      await app.init({
        resizeTo: containerRef.current!,
        background: 0x0a0e17,
        antialias: true,
      })
      if (destroyed) {
        app.destroy(true)
        return
      }
      containerRef.current!.appendChild(app.canvas as HTMLCanvasElement)
    }

    init()

    return () => {
      destroyed = true
      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const app = appRef.current
    if (!app || !app.stage) return

    // Clear previous — destroy children to free GPU textures
    for (const child of app.stage.children) {
      child.destroy({ children: true })
    }
    app.stage.removeChildren()

    const scene = new Container()
    app.stage.addChild(scene)

    const g = new Graphics()
    scene.addChild(g)

    // Draw grid background lines
    const w = app.screen.width
    const h = app.screen.height
    g.setStrokeStyle({ width: 1, color: 0x1a2332 })
    for (let x = 0; x < w; x += CELL) {
      g.moveTo(x, 0)
      g.lineTo(x, h)
      g.stroke()
    }
    for (let y = 0; y < h; y += CELL) {
      g.moveTo(0, y)
      g.lineTo(w, y)
      g.stroke()
    }

    const toX = (gx: number) => PADDING + gx * CELL
    const toY = (gy: number) => PADDING + gy * CELL

    // Sprinklers
    for (const s of worldState.sprinklers ?? []) {
      drawSprinkler(g, s, toX(s.position.x), toY(s.position.y))
      const label = new Text({ text: s.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = toX(s.position.x) - label.width / 2
      label.y = toY(s.position.y) - 24
      scene.addChild(label)
    }

    // Plants — highlight only when there's an active line (execution in progress)
    const highlightPlants = activeLine !== undefined && activeLine > 0
    for (const p of worldState.plants ?? []) {
      drawPlant(g, p, toX(p.position.x), toY(p.position.y), highlightPlants)
      const label = new Text({ text: p.name || p.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = toX(p.position.x) - label.width / 2
      label.y = toY(p.position.y) - 28
      scene.addChild(label)
    }

    // Drones
    for (const d of worldState.drones ?? []) {
      drawDrone(g, d, toX(d.position.x), toY(d.position.y))
      const label = new Text({ text: d.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = toX(d.position.x) - label.width / 2
      label.y = toY(d.position.y) - 24
      scene.addChild(label)
    }

    // Reservoirs
    for (const r of worldState.reservoirs ?? []) {
      const rx = PADDING + 2 * CELL
      const ry = PADDING + 2 * CELL
      drawReservoir(g, r, rx, ry)
      const label = new Text({ text: r.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = rx - label.width / 2
      label.y = ry - 32
      scene.addChild(label)
    }

    // Canopies
    for (const c of worldState.canopies ?? []) {
      drawCanopy(g, c, w / 2, PADDING)
    }

    // Pumps
    for (const p of worldState.pumps ?? []) {
      const px = PADDING + 4 * CELL
      const py = PADDING + 2 * CELL
      drawPump(g, p, px, py)
      const label = new Text({ text: p.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = px - label.width / 2
      label.y = py - 22
      scene.addChild(label)
    }

    // Sprayers
    for (const s of worldState.sprayers ?? []) {
      g.circle(toX(s.position.x), toY(s.position.y), 8)
      g.fill({ color: 0x22d3ee })
      const label = new Text({ text: s.id, style: { fontSize: 10, fill: 0x94a3b8 } })
      label.x = toX(s.position.x) - label.width / 2
      label.y = toY(s.position.y) - 20
      scene.addChild(label)
    }
  }, [worldState, activeLine])

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ background: 'var(--color-bg-primary)' }}
    />
  )
}
