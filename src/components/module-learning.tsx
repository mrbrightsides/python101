'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CodeEditor } from './code-editor'
import { QuizSection } from './quiz-section'
import type { LearningModule, UserProgress } from '@/app/page'
import { CheckCircle2, Circle, Lock, Trophy, Code, BookOpen } from 'lucide-react'

type ModuleLearningProps = {
  modules: LearningModule[]
  userProgress: UserProgress
  onCompleteLesson: (lessonId: string) => void
  onCompleteModule: (moduleId: string) => void
  onCompleteQuiz: (moduleId: string, score: number) => void
}

export function ModuleLearning({
  modules,
  userProgress,
  onCompleteLesson,
  onCompleteModule,
  onCompleteQuiz
}: ModuleLearningProps) {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0)
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'tutorial' | 'practice' | 'quiz'>('tutorial')

  const selectedModule = modules[selectedModuleIndex]
  const selectedLesson = selectedModule?.lessons[selectedLessonIndex]

  const isModuleCompleted = (moduleId: string) => {
    return userProgress.completedModules.includes(moduleId)
  }

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.completedLessons.includes(lessonId)
  }

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true
    return isModuleCompleted(modules[index - 1].id)
  }

  const getModuleProgress = (module: LearningModule) => {
    const totalLessons = module.lessons.length
    const completedLessons = module.lessons.filter(lesson => 
      isLessonCompleted(lesson.id)
    ).length
    return (completedLessons / totalLessons) * 100
  }

  const handleLessonComplete = () => {
    if (selectedLesson && !isLessonCompleted(selectedLesson.id)) {
      onCompleteLesson(selectedLesson.id)
      
      // Check if all lessons completed
      const allLessonsCompleted = selectedModule.lessons.every(lesson =>
        isLessonCompleted(lesson.id) || lesson.id === selectedLesson.id
      )
      
      if (allLessonsCompleted) {
        // Show quiz tab
        setActiveTab('quiz')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Module Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module, index) => {
          const progress = getModuleProgress(module)
          const isCompleted = isModuleCompleted(module.id)
          const isUnlocked = isModuleUnlocked(index)
          const isActive = selectedModuleIndex === index

          return (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all ${
                !isUnlocked
                  ? 'opacity-50 cursor-not-allowed'
                  : isActive
                  ? 'border-cyan-400 bg-cyan-950/30'
                  : 'border-gray-700 hover:border-cyan-500/50'
              }`}
              onClick={() => isUnlocked && setSelectedModuleIndex(index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-2">{module.icon}</div>
                  {!isUnlocked && <Lock className="w-5 h-5 text-gray-500" />}
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{Math.round(progress)}% selesai</span>
                    {userProgress.quizScores[module.id] && (
                      <span className="text-cyan-400">
                        Quiz: {userProgress.quizScores[module.id]}%
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lesson Content */}
      {selectedModule && (
        <Card className="bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-cyan-400 flex items-center gap-2">
                  {selectedModule.icon} {selectedModule.title}
                </CardTitle>
                <CardDescription className="text-gray-300 mt-1">
                  {selectedModule.description}
                </CardDescription>
              </div>
              {isModuleCompleted(selectedModule.id) && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <Trophy className="w-4 h-4 mr-1" />
                  Selesai
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Lesson Sidebar */}
              <div className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Daftar Pelajaran</h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {selectedModule.lessons.map((lesson, index) => {
                      const isCompleted = isLessonCompleted(lesson.id)
                      const isActive = selectedLessonIndex === index

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLessonIndex(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-cyan-500/20 border border-cyan-500/50'
                              : 'bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">
                                {lesson.title}
                              </div>
                              <div className="text-xs text-gray-400">
                                Pelajaran {index + 1}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-3">
                {selectedLesson && (
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                    <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                      <TabsTrigger 
                        value="tutorial"
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Tutorial
                      </TabsTrigger>
                      <TabsTrigger 
                        value="practice"
                        className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Praktik
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quiz"
                        className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Kuis
                      </TabsTrigger>
                    </TabsList>

                    {/* Tutorial Tab */}
                    <TabsContent value="tutorial" className="mt-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-4">{selectedLesson.title}</h2>
                            <div className="prose prose-invert max-w-none">
                              {selectedLesson.content.split('\n').map((paragraph, i) => {
                                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                  return (
                                    <h3 key={i} className="text-xl font-semibold text-cyan-400 mt-6 mb-3">
                                      {paragraph.replace(/\*\*/g, '')}
                                    </h3>
                                  )
                                }
                                if (paragraph.startsWith('- ')) {
                                  return (
                                    <li key={i} className="text-gray-300 ml-6">
                                      {paragraph.substring(2)}
                                    </li>
                                  )
                                }
                                if (paragraph.trim()) {
                                  return (
                                    <p key={i} className="text-gray-300 leading-relaxed mb-4">
                                      {paragraph.split('`').map((part, j) => 
                                        j % 2 === 0 ? part : <code key={j} className="bg-gray-800 px-2 py-1 rounded text-cyan-400">{part}</code>
                                      )}
                                    </p>
                                  )
                                }
                                return <br key={i} />
                              })}
                            </div>
                          </div>

                          {/* Code Examples */}
                          <div className="space-y-4">
                            {selectedLesson.codeExamples.map((example, i) => (
                              <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30">
                                <h4 className="text-lg font-semibold text-purple-400 mb-2">
                                  💡 {example.title}
                                </h4>
                                <CodeEditor
                                  initialCode={example.code}
                                  readOnly={true}
                                  showOutput={true}
                                  height="200px"
                                />
                                <p className="text-sm text-gray-400 mt-3 italic">
                                  {example.explanation}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Complete Button */}
                          <div className="flex justify-center pt-6">
                            {isLessonCompleted(selectedLesson.id) ? (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-base py-2 px-4">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                Pelajaran Selesai
                              </Badge>
                            ) : (
                              <Button
                                onClick={handleLessonComplete}
                                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                                size="lg"
                              >
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                Tandai Selesai & Lanjut Praktik
                              </Button>
                            )}
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Practice Tab */}
                    <TabsContent value="practice" className="mt-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-6">
                          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-purple-400 mb-2">
                              ✍️ Latihan Koding
                            </h3>
                            <p className="text-gray-300">
                              Coba tulis kode sendiri untuk mengasah pemahaman Anda. Klik "Jalankan" untuk melihat hasilnya!
                            </p>
                          </div>

                          {selectedLesson.exercises.map((exercise, i) => (
                            <div key={i} className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/30">
                              <div className="mb-4">
                                <h4 className="text-lg font-semibold text-white mb-2">
                                  📝 Latihan {i + 1}
                                </h4>
                                <p className="text-gray-300 mb-3">{exercise.question}</p>
                                <details className="text-sm">
                                  <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300">
                                    💡 Butuh petunjuk?
                                  </summary>
                                  <p className="mt-2 text-gray-400 italic">{exercise.hint}</p>
                                </details>
                              </div>
                              
                              <CodeEditor
                                initialCode={exercise.starterCode}
                                readOnly={false}
                                showOutput={true}
                                height="250px"
                              />
                              
                              <details className="mt-4">
                                <summary className="cursor-pointer text-green-400 hover:text-green-300 text-sm">
                                  ✅ Lihat Solusi
                                </summary>
                                <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                                  {exercise.solution}
                                </pre>
                              </details>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Quiz Tab */}
                    <TabsContent value="quiz" className="mt-6">
                      <QuizSection
                        quiz={selectedModule.quiz}
                        moduleId={selectedModule.id}
                        onComplete={(score) => {
                          onCompleteQuiz(selectedModule.id, score)
                          onCompleteModule(selectedModule.id)
                        }}
                        existingScore={userProgress.quizScores[selectedModule.id]}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
