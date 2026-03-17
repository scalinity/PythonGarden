import Editor, { type OnMount, type BeforeMount } from '@monaco-editor/react'
import { useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'

interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
  currentLine?: number
  errors?: Array<{ line: number; message: string }>
  fontSize?: number
}

export function CodeEditor({
  code,
  onChange,
  currentLine,
  errors,
  fontSize = 14,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const decorationsRef = useRef<editor.IEditorDecorationsCollection | null>(null)
  const monacoRef = useRef<Parameters<BeforeMount>[0] | null>(null)

  // Register custom Monaco theme before editor mounts
  const handleBeforeMount: BeforeMount = (monaco) => {
    monacoRef.current = monaco
    monaco.editor.defineTheme('codegarden-carbon', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'f59e0b', fontStyle: 'bold' },
        { token: 'string', foreground: '34d399' },
        { token: 'comment', foreground: '525252', fontStyle: 'italic' },
        { token: 'number', foreground: 'fb923c' },
      ],
      colors: {
        'editor.background': '#161616',
        'editor.foreground': '#e0e0e0',
        'editorCursor.foreground': '#f59e0b',
        'editorGutter.background': '#0c0c0c',
        'editorLineNumber.foreground': '#525252',
        'editorLineNumber.activeForeground': '#f59e0b',
        'editor.selectionBackground': '#b4530940',
        'editor.lineHighlightBackground': '#1c1c1c',
      },
    })
  }

  const handleMount: OnMount = (editorInstance) => {
    editorRef.current = editorInstance
  }

  // Highlight current executing line
  useEffect(() => {
    const ed = editorRef.current
    if (!ed) return

    if (decorationsRef.current) {
      decorationsRef.current.clear()
    }

    if (currentLine !== undefined && currentLine > 0) {
      decorationsRef.current = ed.createDecorationsCollection([
        {
          range: {
            startLineNumber: currentLine,
            startColumn: 1,
            endLineNumber: currentLine,
            endColumn: 1,
          },
          options: {
            isWholeLine: true,
            className: 'line-highlight-active',
          },
        },
      ])
    }
  }, [currentLine])

  // Show error markers
  useEffect(() => {
    const ed = editorRef.current
    const monaco = monacoRef.current
    if (!ed || !monaco) return
    const model = ed.getModel()
    if (!model) return

    if (errors && errors.length > 0) {
      monaco.editor.setModelMarkers(
        model,
        'codegarden',
        errors.map((err) => ({
          severity: monaco.MarkerSeverity.Error,
          message: err.message,
          startLineNumber: err.line,
          startColumn: 1,
          endLineNumber: err.line,
          endColumn: model.getLineMaxColumn(err.line),
        })),
      )
    } else {
      monaco.editor.setModelMarkers(model, 'codegarden', [])
    }
  }, [errors])

  return (
    <div className="h-full w-full" role="region" aria-label="Python code editor">
      <Editor
        height="100%"
        language="python"
        theme="codegarden-carbon"
        value={code}
        onChange={(value) => onChange(value ?? '')}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        loading={<div style={{ background: '#161616', width: '100%', height: '100%' }} />}
        options={{
          fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minimap: { enabled: false },
          glyphMargin: false,
          folding: false,
          lineNumbersMinChars: 2,
          lineDecorationsWidth: 10,
          lineNumbers: 'on',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          renderLineHighlight: 'line',
          padding: { top: 8 },
          ariaLabel: 'Python code editor',
        }}
      />
    </div>
  )
}
