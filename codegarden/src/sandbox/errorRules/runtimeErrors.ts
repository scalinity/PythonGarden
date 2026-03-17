import type { FriendlyError } from '@/types/execution.ts'

const INDEX_RE = /IndexError: list index out of range/
const KEY_RE = /KeyError: ['"]?(.+?)['"]?\s*$/m
const ZERO_DIV_RE = /ZeroDivisionError/
const ATTR_RE = /AttributeError: '(\w+)' object has no attribute '(\w+)'/

export function translateRuntimeError(
  error: string,
): FriendlyError | null {
  // IndexError
  if (INDEX_RE.test(error)) {
    return {
      headline: 'List index out of range',
      explanation:
        "You tried to access a position in a list that doesn't exist. Remember, lists start counting at 0!",
      suggestedAction:
        'Use `len(your_list)` to check how many items the list has before accessing an index.',
      rawError: error,
    }
  }

  // KeyError
  const keyMatch = error.match(KEY_RE)
  if (keyMatch) {
    const key = keyMatch[1]
    return {
      headline: 'Key not found',
      explanation: `The key '${key}' doesn't exist in your dictionary.`,
      suggestedAction:
        `Check that '${key}' is spelled correctly, or use \`.get('${key}')\` to avoid the error.`,
      rawError: error,
    }
  }

  // ZeroDivisionError
  if (ZERO_DIV_RE.test(error)) {
    return {
      headline: 'Division by zero',
      explanation:
        "You're dividing by zero, which isn't allowed in math.",
      suggestedAction:
        'Add a check like `if x != 0:` before dividing.',
      rawError: error,
    }
  }

  // AttributeError
  const attrMatch = error.match(ATTR_RE)
  if (attrMatch) {
    const [, obj, attr] = attrMatch
    return {
      headline: 'Attribute not found',
      explanation: `\`${obj}\` doesn't have a \`.${attr}\` method or property.`,
      suggestedAction:
        `Check the spelling of \`.${attr}\` or look at what methods \`${obj}\` actually has.`,
      rawError: error,
    }
  }

  return null
}
