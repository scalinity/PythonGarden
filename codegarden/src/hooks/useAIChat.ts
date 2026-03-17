import { useState, useCallback } from 'react'
import { useGameStore } from '@store/useGameStore.ts'
import { concepts } from '@data/concepts/concepts.ts'
import { streamChat } from '@/services/openaiService.ts'
import type { ConceptCard } from '@/types/execution.ts'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  thinking?: string // reasoning trace for assistant messages
}

function buildSystemPrompt(): string {
  // Use getState() (non-reactive) since this runs inside a callback, not at render time
  const { levelDefinition, code, status, errors, logs } = useGameStore.getState()

  if (!levelDefinition) {
    return 'You are an AI tutor for CodeGarden, a Python learning game.'
  }

  const fallbackConcept: ConceptCard = { id: '', name: '', explanation: '', pythonExample: '' }
  const conceptCard: ConceptCard =
    levelDefinition.conceptCardId != null
      ? (concepts.find((c) => c.id === levelDefinition.conceptCardId) ?? fallbackConcept)
      : fallbackConcept

  const level = levelDefinition

  const availableObjectLines = (level.availableObjects ?? []).map(
    (obj) => `  ${obj.name} (${obj.type}): ${obj.methods.map((m) => m.signature).join(', ')}`,
  )

  let prompt = `You are an AI tutor embedded in CodeGarden, a Python learning game.
Answer concisely. Guide understanding — don't give direct solutions.

## CRITICAL DIAGNOSTIC RULES
1. The variable names in "Available Objects" are the EXACT Python identifiers injected into the sandbox. If the player's code uses those names correctly and still gets a NameError, it is a GAME ENGINE BUG — not a typo. Tell them their code is correct and to report the issue.
2. Only suggest a typo or wrong name if the player used a name that is NOT listed in Available Objects.
3. Always check the player's code against the Available Objects list before suggesting any fix.

## Current Level: ${level.order}. "${level.title}"
## Mission
${level.missionText}

## Concept: ${conceptCard.name}
${conceptCard.explanation}
Example:
${conceptCard.pythonExample}

## Available Python Variables (these names are guaranteed to be in scope)
${availableObjectLines.join('\n')}

## Success Conditions
${level.successConditions.map((c) => `- ${c.description}`).join('\n')}

## Player's Current Code
\`\`\`python
${code}
\`\`\`

## Execution Status: ${status}`

  if (errors.length > 0) {
    const err = errors[0]
    prompt += `\n\n## Error\nHeadline: ${err.headline}\nDetail: ${err.explanation}`
    if (err.rawError) {
      prompt += `\nRaw Python error: ${err.rawError}`
    }
  }

  if (logs.length > 0) {
    prompt += `\n\n## Recent Output\n${logs.slice(-5).join('\n')}`
  }

  return prompt
}

export interface UseAIChatReturn {
  messages: ChatMessage[]
  isStreaming: boolean
  streamingContent: string
  streamingThinking: string
  sendMessage: (text: string) => Promise<void>
}

export function useAIChat(): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [streamingThinking, setStreamingThinking] = useState('')

  const sendMessage = useCallback(async (text: string) => {
    if (isStreaming) return

    // Add user message to history
    const userMessage: ChatMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])

    // Build context-aware system prompt from current store state
    const systemPrompt = buildSystemPrompt()

    // Snapshot the current history + new user message for the API call
    // (messages state update is async, so we build directly)
    setIsStreaming(true)
    setStreamingContent('')
    setStreamingThinking('')

    let accContent = ''
    let accThinking = ''

    // Use functional reads of accumulated state to avoid stale closure issues
    const allMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      { role: 'system', content: systemPrompt },
      // Include committed message history (before the user message we just added)
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      // Add the new user message
      { role: 'user' as const, content: text },
    ]

    const commit = (content: string, thinking: string) => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content, thinking: thinking || undefined },
      ])
      setStreamingContent('')
      setStreamingThinking('')
      setIsStreaming(false)
    }

    try {
      for await (const chunk of streamChat(allMessages)) {
        if (chunk.type === 'thinking') {
          accThinking += chunk.text
          setStreamingThinking(accThinking)
        } else if (chunk.type === 'content') {
          accContent += chunk.text
          setStreamingContent(accContent)
        } else if (chunk.type === 'done') {
          commit(accContent, accThinking)
          return
        } else if (chunk.type === 'error') {
          accContent = `Sorry, I ran into an error: ${chunk.message}`
          commit(accContent, accThinking)
          return
        }
      }
      // Stream ended without a 'done' event — commit whatever we have
      commit(accContent, accThinking)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown streaming error'
      commit(`Sorry, I ran into an error: ${message}`, accThinking)
    }
  }, [isStreaming, messages])

  return { messages, isStreaming, streamingContent, streamingThinking, sendMessage }
}
