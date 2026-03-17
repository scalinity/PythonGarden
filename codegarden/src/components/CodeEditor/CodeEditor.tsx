import Editor, { useMonaco, type OnMount } from '@monaco-editor/react'
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
  const monaco = useMonaco()

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
            className: 'bg-cyan-900/40',
            glyphMarginClassName: 'bg-cyan-400',
          },
        },
      ])
    }
  }, [currentLine])

  // Show error markers
  useEffect(() => {
    const ed = editorRef.current
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
  }, [errors, monaco])

  return (
    <div className="h-full w-full" role="region" aria-label="Python code editor">
      <Editor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value ?? '')}
        onMount={handleMount}
        options={{
          fontSize,
          minimap: { enabled: false },
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
