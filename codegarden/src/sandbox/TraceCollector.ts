import type { TraceEntry, VariableSnapshot } from '@/types/execution.ts'

export class TraceCollector {
  private entries: TraceEntry[] = []

  addEntry(entry: TraceEntry): void {
    this.entries.push(entry)
  }

  getEntries(): TraceEntry[] {
    return this.entries
  }

  getVariablesAtLine(line: number): VariableSnapshot[] {
    for (let i = this.entries.length - 1; i >= 0; i--) {
      if (this.entries[i].line === line) {
        return this.entries[i].variables
      }
    }
    return []
  }

  clear(): void {
    this.entries = []
  }
}
