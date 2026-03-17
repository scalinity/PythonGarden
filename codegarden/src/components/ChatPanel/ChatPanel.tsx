import { useState, useId } from 'react'
import { useAIChat } from '@hooks/useAIChat.ts'
import type { ChatMessage } from '@hooks/useAIChat.ts'

interface ChatPanelProps {
  onClose: () => void
}

// ── Thinking trace sub-component ──────────────────────────────────────────────
interface ThinkingTraceProps {
  thinking: string
  defaultOpen?: boolean
}

function ThinkingTrace({ thinking, defaultOpen = false }: ThinkingTraceProps) {
  const [open, setOpen] = useState(defaultOpen)
  const regionId = useId()

  return (
    <div style={{ marginTop: '4px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: 'var(--color-accent-dim)',
          fontSize: '0.7rem',
          fontVariant: 'small-caps',
          letterSpacing: '0.05em',
        }}
        aria-expanded={open}
        aria-controls={regionId}
      >
        {open ? '▼ Reasoning' : '▶ Reasoning'}
      </button>
      <div
        id={regionId}
        role="region"
        aria-label="Reasoning trace"
        hidden={!open}
        style={{
          fontStyle: 'italic',
          fontFamily: 'var(--font-code)',
          fontSize: '0.7rem',
          color: 'var(--color-text-secondary)',
          borderLeft: '2px solid var(--color-accent-dim)',
          paddingLeft: '8px',
          marginTop: '6px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {thinking}
      </div>
    </div>
  )
}

// ── User message bubble ───────────────────────────────────────────────────────
function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div
      className="ml-auto"
      style={{
        maxWidth: '85%',
        background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
        borderRadius: '6px',
        padding: '8px 10px',
        fontSize: '0.8rem',
        color: 'var(--color-text-primary)',
      }}
    >
      {message.content}
    </div>
  )
}

// ── AI message bubble ─────────────────────────────────────────────────────────
function AssistantBubble({
  content,
  thinking,
  thinkingDefaultOpen = false,
  showCursor = false,
}: {
  content: string
  thinking?: string
  thinkingDefaultOpen?: boolean
  showCursor?: boolean
}) {
  return (
    <div
      style={{
        maxWidth: '95%',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        padding: '8px 10px',
        fontSize: '0.8rem',
        color: 'var(--color-text-primary)',
      }}
    >
      {thinking && <ThinkingTrace thinking={thinking} defaultOpen={thinkingDefaultOpen} />}
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {content}
        {showCursor && (
          <span
            style={{
              animation: 'blink 1s step-start infinite',
              color: 'var(--color-accent)',
            }}
          >
            █
          </span>
        )}
      </span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isStreaming, streamingContent, streamingThinking, sendMessage } = useAIChat()
  const [inputValue, setInputValue] = useState('')
  const [closeHover, setCloseHover] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const hasApiKey = Boolean(import.meta.env.VITE_OPENAI_API_KEY)

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text || isStreaming) return
    setInputValue('')
    void sendMessage(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const showEmpty = messages.length === 0 && !isStreaming

  return (
    <div
      style={{
        width: '300px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderLeft: '3px solid var(--color-accent-dim)',
        background: 'var(--color-bg-panel)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontVariant: 'small-caps',
            color: 'var(--color-text-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          AI Tutor
        </span>
        <button
          onClick={onClose}
          aria-label="Close AI chat"
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          style={{
            color: closeHover ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            padding: '2px 4px',
          }}
        >
          ×
        </button>
      </div>

      {/* Message list */}
      <div
        className="flex flex-col gap-3 p-3"
        role="log"
        aria-live="polite"
        aria-label="Chat history"
        style={{
          flex: '1 1 0',
          overflowY: 'auto',
        }}
      >
        {/* API key missing warning */}
        {!hasApiKey && (
          <p
            style={{
              color: 'var(--color-accent)',
              fontSize: '0.75rem',
              margin: 0,
            }}
          >
            ⚠ Add VITE_OPENAI_API_KEY to .env.local to enable AI chat.
          </p>
        )}

        {/* Empty state suggestions */}
        {hasApiKey && showEmpty && (
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
            <p style={{ margin: '0 0 6px 0' }}>Ask me anything about this level:</p>
            <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: 1.6 }}>
              <li>&quot;Why isn&apos;t my code working?&quot;</li>
              <li>&quot;What does sprinkler.water() do?&quot;</li>
              <li>&quot;How do I write a for loop?&quot;</li>
            </ul>
          </div>
        )}

        {/* Committed messages */}
        {messages.map((msg, i) =>
          msg.role === 'user' ? (
            <UserBubble key={i} message={msg} />
          ) : (
            <AssistantBubble key={i} content={msg.content} thinking={msg.thinking} />
          ),
        )}

        {/* Live streaming bubble */}
        {isStreaming && (
          <AssistantBubble
            content={streamingContent}
            thinking={streamingThinking || undefined}
            thinkingDefaultOpen={true}
            showCursor={streamingContent.length > 0}
          />
        )}

        {/* Auto-scroll anchor — key changes only when messages arrive or streaming toggles,
            so the ref callback fires exactly then (not on every keystroke). */}
        <div
          key={`scroll-${messages.length}-${isStreaming ? 'streaming' : 'idle'}`}
          ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
        />
      </div>

      {/* Input row */}
      <div
        className="flex gap-2 px-3 py-2"
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
          flexShrink: 0,
        }}
      >
        <input
          className="flex-1"
          aria-label="Chat message input"
          type="text"
          placeholder="Ask about this level..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          style={{
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '0.8rem',
            color: 'var(--color-text-primary)',
            outline: inputFocused ? '2px solid var(--color-accent)' : 'none',
            outlineOffset: '0',
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          disabled={isStreaming || !inputValue.trim()}
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            cursor: isStreaming || !inputValue.trim() ? 'not-allowed' : 'pointer',
            opacity: isStreaming || !inputValue.trim() ? 0.5 : 1,
          }}
        >
          →
        </button>
      </div>
    </div>
  )
}
