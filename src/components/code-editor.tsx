'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, RotateCcw, Loader2 } from 'lucide-react'

type CodeEditorProps = {
  initialCode: string
  readOnly?: boolean
  showOutput?: boolean
  height?: string
}

export function CodeEditor({ 
  initialCode, 
  readOnly = false, 
  showOutput = true,
  height = '300px'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [pyodideLoading, setPyodideLoading] = useState(true)
  const pyodideRef = useRef<any>(null)

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        if (typeof window !== 'undefined' && !pyodideRef.current) {
          console.log('🔄 Loading Python engine...')
          // @ts-ignore - Pyodide types
          const { loadPyodide } = await import('pyodide')
          
          // Try multiple CDN versions for reliability
          const versions = ['v0.26.4', 'v0.25.1', 'v0.24.1']
          
          for (const version of versions) {
            try {
              console.log(`Trying Pyodide ${version}...`)
              pyodideRef.current = await loadPyodide({
                indexURL: `https://cdn.jsdelivr.net/pyodide/${version}/full/`
              })
              
              // Setup stdout capture
              await pyodideRef.current.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
              `)
              
              setPyodideReady(true)
              setPyodideLoading(false)
              console.log(`✅ Python engine loaded successfully with ${version}!`)
              return
            } catch (err) {
              console.log(`Failed with ${version}, trying next...`)
            }
          }
          
          // All versions failed
          throw new Error('All Pyodide versions failed to load')
        }
      } catch (error) {
        console.error('Failed to load Python engine:', error)
        console.log('⚡ Using simulation mode for basic code execution')
        setPyodideLoading(false)
        // Don't show error in output, just use simulation mode silently
      }
    }

    initPyodide()
  }, [])

  const runCode = async () => {
    if (!code.trim()) {
      setOutput('⚠️ Tulis kode terlebih dahulu!')
      return
    }

    setIsRunning(true)
    setOutput('⏳ Menjalankan kode...')

    try {
      if (pyodideReady && pyodideRef.current) {
        // Real Python execution with Pyodide
        await pyodideRef.current.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
        `)

        await pyodideRef.current.runPythonAsync(code)
        
        const stdout = await pyodideRef.current.runPythonAsync('sys.stdout.getvalue()')
        setOutput(stdout || '✅ Kode berhasil dijalankan (tanpa output)')
      } else {
        // Fallback: Simulation mode
        simulateExecution()
      }
    } catch (error: any) {
      setOutput(`❌ Error:\n${error.message || error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const simulateExecution = () => {
    // Enhanced simulation for common Python patterns
    const lines = code.split('\n')
    let simulatedOutput = ''
    const variables: Record<string, any> = {}

    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip comments and empty lines
      if (trimmed.startsWith('#') || !trimmed) continue
      
      // Variable assignment
      const varMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/)
      if (varMatch && !trimmed.includes('print')) {
        const [, varName, value] = varMatch
        try {
          // Simple value extraction
          if (value.match(/^['"].*['"]$/)) {
            variables[varName] = value.replace(/['"]/g, '')
          } else if (!isNaN(Number(value))) {
            variables[varName] = Number(value)
          }
        } catch (e) {
          // Skip on error
        }
        continue
      }
      
      // Print statements with better parsing
      if (trimmed.startsWith('print(')) {
        const match = trimmed.match(/print\((.+)\)/)
        if (match) {
          try {
            let content = match[1]
            
            // Handle f-strings
            if (content.startsWith('f"') || content.startsWith("f'")) {
              content = content.substring(2, content.length - 1)
              // Replace {var} with values
              content = content.replace(/\{(\w+)\}/g, (_, varName) => {
                return variables[varName] !== undefined ? String(variables[varName]) : `{${varName}}`
              })
              simulatedOutput += content + '\n'
            }
            // Simple string
            else if (content.startsWith('"') || content.startsWith("'")) {
              simulatedOutput += content.replace(/['"]/g, '') + '\n'
            }
            // Variable reference
            else if (variables[content]) {
              simulatedOutput += String(variables[content]) + '\n'
            }
            // Multiple arguments
            else if (content.includes(',')) {
              const parts = content.split(',').map(p => p.trim())
              const output = parts.map(p => {
                if (p.startsWith('"') || p.startsWith("'")) {
                  return p.replace(/['"]/g, '')
                }
                return variables[p] !== undefined ? String(variables[p]) : p
              }).join(' ')
              simulatedOutput += output + '\n'
            }
            // Expression
            else {
              simulatedOutput += '[hasil ekspresi]\n'
            }
          } catch (e) {
            simulatedOutput += '[output]\n'
          }
        }
      }
    }

    if (simulatedOutput) {
      setOutput(simulatedOutput.trim())
    } else {
      setOutput('✅ Kode berhasil dijalankan (tanpa output)\n\n💡 Tip: Untuk melihat hasil, gunakan fungsi print()')
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      
      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4
      }, 0)
    }
    
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      runCode()
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className={`w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
            readOnly ? 'cursor-default' : ''
          }`}
          style={{ height }}
          spellCheck={false}
        />
        {!readOnly && (
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={resetCode}
              className="bg-gray-800 border-gray-600 hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  Jalankan
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {showOutput && (
        <Card className="bg-gray-950 border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs font-semibold text-gray-400 uppercase">Output:</div>
            {pyodideLoading && (
              <div className="text-xs text-cyan-400 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading Python engine...
              </div>
            )}
            {!pyodideLoading && pyodideReady && (
              <div className="text-xs text-green-400">✅ Python Engine Ready</div>
            )}
            {!pyodideLoading && !pyodideReady && !isRunning && (
              <div className="text-xs text-yellow-400">⚡ Simulation Mode</div>
            )}
          </div>
          <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap overflow-x-auto">
            {output || (readOnly ? '👉 Contoh kode Python' : '💡 Klik "Jalankan" atau tekan Ctrl+Enter untuk menjalankan kode')}
          </pre>
        </Card>
      )}

      {!readOnly && (
        <div className="text-xs text-gray-500">
          💡 Tips: Tekan Tab untuk indent, Ctrl+Enter untuk menjalankan kode
        </div>
      )}
    </div>
  )
}
