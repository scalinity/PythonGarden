export interface ScanResult {
  safe: boolean
  violations: string[]
}

/**
 * Pre-execution regex scan that blocks dangerous Python constructs
 * before code is sent to the Pyodide worker.
 */
export function scanCode(code: string): ScanResult {
  const violations: string[] = []
  const lines = code.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1

    // Skip lines that are entirely inside a string (rough heuristic:
    // lines starting with a quote or continuation of a triple-quote block
    // are not scanned, but single-line string contents embedded in code
    // still need scanning -- we only skip obvious full-line strings).
    const trimmed = line.trimStart()
    if (trimmed.startsWith('#')) continue // comments are safe

    // Block import statements (not inside strings)
    if (/\bimport\s+/.test(trimmed) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "import" statements are not allowed`)
    }
    if (/\bfrom\s+\S+\s+import\b/.test(trimmed) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "from ... import" statements are not allowed`)
    }

    // Block eval / exec / compile
    if (/\beval\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "eval()" is not allowed`)
    }
    if (/\bexec\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "exec()" is not allowed`)
    }
    if (/\bcompile\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "compile()" is not allowed`)
    }

    // Block dunder access
    if (/__\w+__/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: dunder ("__") access is not allowed`)
    }

    // Block open()
    if (/\bopen\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "open()" is not allowed`)
    }

    // Block getattr / setattr / delattr
    if (/\bgetattr\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "getattr()" is not allowed`)
    }
    if (/\bsetattr\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "setattr()" is not allowed`)
    }
    if (/\bdelattr\s*\(/.test(line) && !isInsideString(line)) {
      violations.push(`Line ${lineNum}: "delattr()" is not allowed`)
    }
  }

  return { safe: violations.length === 0, violations }
}

/**
 * Rough heuristic: returns true if the "interesting" part of a line
 * lives entirely inside a string literal. We check whether the code
 * portion before the first unescaped quote is empty (meaning everything
 * is inside the string).
 */
function isInsideString(line: string): boolean {
  const trimmed = line.trimStart()
  // Entire line is a string literal
  if (/^(["']{3}|["'])/.test(trimmed)) {
    // Check if line starts with a quote and is a pure string expression
    if (/^(["']{3}).*\1\s*$/.test(trimmed)) return true
    if (/^(["']).*\1\s*$/.test(trimmed)) return true
  }
  return false
}
