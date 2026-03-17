import OpenAI from 'openai'
import type { ResponseFailedEvent, ResponseIncompleteEvent } from 'openai/resources/responses/responses'

const MODEL = 'gpt-5.4-mini'

// Module-level lazy singleton — avoids creating a new client (with its own HTTP internals) on every call
let _client: OpenAI | null = null

function getClient(): OpenAI {
  if (!_client) {
    const apiKey = import.meta.env.VITE_OPEN_AI_KEY
    if (!apiKey) {
      throw new Error('VITE_OPEN_AI_KEY is not set. Add it to .env.local to enable AI chat.')
    }
    _client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
  }
  return _client
}

export type StreamChunk =
  | { type: 'thinking'; text: string }
  | { type: 'content'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string }

export async function* streamChat(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
): AsyncGenerator<StreamChunk> {
  const client = getClient()
  let stream: Awaited<ReturnType<typeof client.responses.create>> | undefined
  try {
    stream = await client.responses.create({
      model: MODEL,
      input: messages,
      reasoning: { effort: 'low', summary: 'auto' },
      stream: true,
    })

    for await (const event of stream) {
      if (event.type === 'response.output_text.delta') {
        yield { type: 'content', text: event.delta }
      } else if (event.type === 'response.reasoning_summary_text.delta') {
        yield { type: 'thinking', text: event.delta }
      } else if (event.type === 'response.failed') {
        const err = (event as ResponseFailedEvent).response?.error
        yield { type: 'error', message: err?.message ?? 'Response failed' }
        return
      } else if (event.type === 'response.incomplete') {
        const reason = (event as ResponseIncompleteEvent).response?.incomplete_details?.reason
        yield { type: 'error', message: `Response incomplete: ${reason ?? 'unknown'}` }
        return
      }
    }

    yield { type: 'done' }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    yield { type: 'error', message }
  } finally {
    stream?.controller.abort()
  }
}
