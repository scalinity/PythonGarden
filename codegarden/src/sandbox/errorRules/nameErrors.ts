import type { FriendlyError } from '@/types/execution.ts'
import { findClosestMatch } from './fuzzyMatch.ts'

const NAME_RE = /NameError: name '(\w+)' is not defined/

const API_OBJECTS = [
  'plant', 'plants', 'sprinkler', 'sprinklers',
  'drone', 'drones', 'reservoir', 'reservoirs',
  'storage', 'pump', 'pumps', 'canopy', 'canopies',
  'sprayer', 'sprayers', 'weather', 'moisture',
  'health', 'water', 'harvest', 'pollinate',
  'move_to', 'feed', 'spray', 'open', 'close',
  'transfer', 'store', 'print', 'range', 'len',
  'True', 'False', 'None',
]

export function translateNameError(
  error: string,
): FriendlyError | null {
  const match = error.match(NAME_RE)
  if (!match) return null

  const undefinedName = match[1]
  const suggestion = findClosestMatch(undefinedName, API_OBJECTS)

  const didYouMean = suggestion
    ? ` Did you mean \`${suggestion}\`?`
    : ''

  return {
    headline: `Unknown name: \`${undefinedName}\``,
    explanation: `You used \`${undefinedName}\`, but that name doesn't exist.${didYouMean}`,
    suggestedAction: suggestion
      ? `Try replacing \`${undefinedName}\` with \`${suggestion}\`.`
      : 'Check your spelling and make sure the variable is defined before you use it.',
    rawError: error,
  }
}
