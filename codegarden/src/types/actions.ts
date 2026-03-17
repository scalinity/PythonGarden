export type ActionType =
  | 'water_plant'
  | 'sprinkler_on'
  | 'sprinkler_off'
  | 'spray'
  | 'drone_move_to'
  | 'drone_harvest'
  | 'drone_pollinate'
  | 'pump_transfer'
  | 'canopy_open'
  | 'canopy_close'
  | 'feed_plant'
  | 'store_item'
  | 'store_in_bin'
  | 'log'
  | 'highlight'

export interface GameAction {
  type: ActionType
  source?: string
  target?: string
  amount?: number
  value?: string
  sourceLine: number
  timestamp: number
}

export interface ActionResult {
  success: boolean
  action: GameAction
  error?: string
}
