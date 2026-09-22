'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react'

type Quiz = {
  questions: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}

type QuizSectionProps = {
  quiz: Quiz
  moduleId: string
  onComplete: (score: number) => void
  existingScore?: number
}

export function QuizSection({ quiz, moduleId, onComplete, existingScore }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const totalQuestions = quiz.questions.length
  const currentQ = quiz.questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]

  const handleSelectAnswer = (answerIndex: number) => {
    if (!hasSubmitted) {
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestion] = answerIndex
      setSelectedAnswers(newAnswers)
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const answeredAll = selectedAnswers.every(answer => answer !== null)
    
    if (!answeredAll) {
      alert('Mohon jawab semua pertanyaan sebelum submit!')
      return
    }

    setHasSubmitted(true)
    setShowResults(true)
    
    // Calculate score
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === quiz.questions[index].correctAnswer
    ).length
    
    const score = Math.round((correctCount / totalQuestions) * 100)
    onComplete(score)
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quiz.questions.length).fill(null))
    setShowResults(false)
    setHasSubmitted(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreMessage = (score: number) => {
    if (score === 100) return 'Perfect! Luar biasa! 🎉'
    if (score >= 80) return 'Excellent! Sangat bagus! 👏'
    if (score >= 60) return 'Good job! Cukup baik! 👍'
    return 'Keep practicing! Tetap semangat! 💪'
  }

  if (showResults) {
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === quiz.questions[index].correctAnswer
    ).length
    const score = Math.round((correctCount / totalQuestions) * 100)

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 border-green-500/30">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white mb-2">Kuis Selesai!</h2>
            <p className={`text-5xl font-bold mb-3 ${getScoreColor(score)}`}>
              {score}%
            </p>
            <p className="text-xl text-gray-300 mb-6">{getScoreMessage(score)}</p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{correctCount}</div>
                <div className="text-sm text-gray-400">Benar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{totalQuestions - correctCount}</div>
                <div className="text-sm text-gray-400">Salah</div>
              </div>
            </div>
            <Button
              onClick={handleRetake}
              className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Coba Lagi
            </Button>
          </CardContent>
        </Card>

        {/* Review Answers */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">📝 Review Jawaban:</h3>
          {quiz.questions.map((q, index) => {
            const userAnswer = selectedAnswers[index]
            const isCorrect = userAnswer === q.correctAnswer

            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Pertanyaan {index + 1}: {q.question}
                      </h4>
                      
                      <div className="space-y-2 mb-4">
                        {q.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex
                          const isCorrectAnswer = q.correctAnswer === optionIndex
                          
                          let bgColor = 'bg-gray-700/50'
                          let borderColor = 'border-gray-600'
                          let textColor = 'text-gray-300'
                          
                          if (isCorrectAnswer) {
                            bgColor = 'bg-green-500/20'
                            borderColor = 'border-green-500'
                            textColor = 'text-green-400'
                          } else if (isUserAnswer && !isCorrect) {
                            bgColor = 'bg-red-500/20'
                            borderColor = 'border-red-500'
                            textColor = 'text-red-400'
                          }

                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${bgColor} ${borderColor}`}
                            >
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                {isUserAnswer && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                                <span className={textColor}>{option}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                        <p className="text-sm text-cyan-300">
                          <strong>💡 Penjelasan:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">
            Pertanyaan {currentQuestion + 1} dari {totalQuestions}
          </span>
          {existingScore && (
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
              Skor terbaik: {existingScore}%
            </Badge>
          )}
        </div>
        <Progress 
          value={((currentQuestion + 1) / totalQuestions) * 100} 
          className="h-2"
        />
      </div>

      {/* Question Card */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            {currentQ.question}
          </h3>

          <RadioGroup
            value={selectedAnswer?.toString() ?? ''}
            onValueChange={(value) => handleSelectAnswer(parseInt(value))}
          >
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedAnswer === index
                      ? 'bg-cyan-500/20 border-cyan-500'
                      : 'bg-gray-700/30 border-gray-600 hover:border-cyan-500/50'
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-${index}`} />
                  <Label
                    htmlFor={`q${currentQuestion}-${index}`}
                    className="flex-1 text-white cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="bg-gray-800 border-gray-600 hover:bg-gray-700"
        >
          Sebelumnya
        </Button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                selectedAnswers[index] !== null
                  ? 'bg-cyan-500'
                  : index === currentQuestion
                  ? 'bg-gray-500'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {currentQuestion === totalQuestions - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Submit Kuis
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        💡 Pilih jawaban sebelum melanjutkan
      </div>
    </div>
  )
}
