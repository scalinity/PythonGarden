import type { languages } from 'monaco-editor'
import type { AvailableObject } from '@/types/level.ts'

export function createCompletionProvider(
  availableObjects: AvailableObject[],
): languages.CompletionItemProvider {
  return {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }

      const lineContent = model.getLineContent(position.lineNumber)
      const textBefore = lineContent.substring(0, position.column - 1)

      const suggestions: languages.CompletionItem[] = []

      // Check if user typed "object."
      const dotMatch = textBefore.match(/(\w+)\.\s*$/)

      if (dotMatch) {
        const objName = dotMatch[1]
        const obj = availableObjects.find((o) => o.name === objName)
        if (obj) {
          for (const method of obj.methods) {
            const isProperty = !method.signature.includes('(')
            suggestions.push({
              label: method.name,
              kind: isProperty ? 9 : 0, // Property : Method
              insertText: isProperty
                ? method.name
                : method.signature.replace(`${objName}.`, ''),
              detail: method.description,
              documentation: method.description,
              range,
            } as languages.CompletionItem)
          }
        }
      } else {
        // Suggest object names
        for (const obj of availableObjects) {
          suggestions.push({
            label: obj.name,
            kind: 5, // Variable
            insertText: obj.name,
            detail: `${obj.type} object`,
            documentation: `Available methods: ${obj.methods.map((m) => m.name).join(', ')}`,
            range,
          } as languages.CompletionItem)
        }

        // Python keywords
        const keywords = [
          'if',
          'else',
          'elif',
          'for',
          'while',
          'def',
          'return',
          'True',
          'False',
          'None',
          'and',
          'or',
          'not',
          'in',
          'print',
        ]
        for (const kw of keywords) {
          suggestions.push({
            label: kw,
            kind: 17, // Keyword
            insertText: kw,
            range,
          } as languages.CompletionItem)
        }
      }

      return { suggestions }
    },
  }
}
