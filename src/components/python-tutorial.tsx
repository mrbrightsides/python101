'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { LearningModule } from '@/app/page'

interface PythonTutorialProps {
  module: LearningModule
  onComplete: () => void
  isCompleted: boolean
}

export function PythonTutorial({ module, onComplete, isCompleted }: PythonTutorialProps) {
  const [currentSection, setCurrentSection] = useState<number>(0)
  
  // Split content into sections based on paragraphs
  const sections = module.content.split('\n\n').filter(section => section.trim())

  const nextSection = (): void => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else if (!isCompleted) {
      onComplete()
    }
  }

  const prevSection = (): void => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const formatContent = (content: string): JSX.Element[] => {
    const lines = content.split('\n')
    return lines.map((line, index) => {
      // Handle code blocks
      if (line.includes('```')) {
        return <div key={index} className="my-2" />
      }
      
      // Handle code snippets
      if (line.includes('`') && !line.includes('```')) {
        const parts = line.split('`')
        return (
          <p key={index} className="text-gray-300 mb-2">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <code key={partIndex} className="bg-gray-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm">
                  {part}
                </code>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </p>
        )
      }

      // Handle headers
      if (line.startsWith('**') && line.endsWith('**')) {
        const headerText = line.slice(2, -2)
        return (
          <h3 key={index} className="text-cyan-400 font-bold text-lg mb-2 mt-4">
            {headerText}
          </h3>
        )
      }

      // Handle bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="text-gray-300 ml-4 mb-1">
            {line.slice(2)}
          </li>
        )
      }

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="text-gray-300 mb-2 leading-relaxed">
            {line}
          </p>
        )
      }

      return <div key={index} />
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Tutorial: {module.title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">
            {currentSection + 1} / {sections.length}
          </Badge>
          {isCompleted && (
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
              ✓ Selesai
            </Badge>
          )}
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-6">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {formatContent(sections[currentSection] || '')}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card className="bg-gray-900/80 border-gray-700">
        <CardContent className="p-4">
          <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
            💻 Contoh Kode
          </h4>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="text-green-400 font-mono text-sm whitespace-pre">
              {module.codeExample}
            </code>
          </pre>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevSection}
          disabled={currentSection === 0}
          className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
        >
          ← Sebelumnya
        </Button>

        <div className="flex gap-1">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentSection ? 'bg-cyan-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSection}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          {currentSection === sections.length - 1 
            ? (isCompleted ? 'Tutorial Selesai' : 'Selesaikan Tutorial')
            : 'Lanjut →'
          }
        </Button>
      </div>

      {/* Learning Tips */}
      <Card className="bg-purple-900/20 border-purple-400/30">
        <CardContent className="p-4">
          <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
            💡 Tips Belajar
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Praktek langsung setiap contoh kode yang diberikan</li>
            <li>• Jangan ragu untuk bereksperimen dengan variasi kode</li>
            <li>• Pahami konsep sebelum melanjut ke modul berikutnya</li>
            <li>• Gunakan tab "Praktek" untuk mencoba kode secara interaktif</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}