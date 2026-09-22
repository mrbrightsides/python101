'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { CodeEditor } from '@/components/code-editor'

export type Challenge = {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  problem: string
  testCases: { input: string; expectedOutput: string }[]
  hints: string[]
  points: number
  template: string
  solution: string
}

const challenges: Challenge[] = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz Classic',
    difficulty: 'Easy',
    description: 'Print angka 1-100, tapi ganti kelipatan 3 dengan "Fizz", kelipatan 5 dengan "Buzz", dan kelipatan 15 dengan "FizzBuzz"',
    problem: 'Buat program yang mencetak angka dari 1 sampai 100:\n- Jika angka kelipatan 3, print "Fizz"\n- Jika angka kelipatan 5, print "Buzz"\n- Jika angka kelipatan 3 dan 5, print "FizzBuzz"\n- Selain itu, print angkanya',
    testCases: [
      { input: '1-15', expectedOutput: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz' }
    ],
    hints: [
      'Gunakan operator modulo (%) untuk mengecek kelipatan',
      'Cek kelipatan 15 terlebih dahulu sebelum 3 atau 5',
      'Gunakan loop for dengan range(1, 101)'
    ],
    points: 50,
    template: `# FizzBuzz Challenge
# Print angka 1-100 dengan aturan khusus

for i in range(1, 101):
    # Tulis kode Anda di sini
    pass`,
    solution: `for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`
  },
  {
    id: 'palindrome',
    title: 'Palindrome Checker',
    difficulty: 'Medium',
    description: 'Cek apakah sebuah kata atau kalimat adalah palindrome (dibaca sama dari depan dan belakang)',
    problem: 'Buat fungsi yang mengecek apakah sebuah string adalah palindrome.\nIgnore spasi, tanda baca, dan besar-kecil huruf.',
    testCases: [
      { input: '"racecar"', expectedOutput: 'True' },
      { input: '"A man a plan a canal Panama"', expectedOutput: 'True' },
      { input: '"hello"', expectedOutput: 'False' }
    ],
    hints: [
      'Gunakan method .lower() dan .replace() untuk normalisasi',
      'Bandingkan string dengan reverse-nya',
      'Bisa juga pakai slicing [::-1] untuk reverse'
    ],
    points: 75,
    template: `# Palindrome Checker
def is_palindrome(text):
    # Tulis kode Anda di sini
    pass

# Test cases
print(is_palindrome("racecar"))
print(is_palindrome("A man a plan a canal Panama"))
print(is_palindrome("hello"))`,
    solution: `def is_palindrome(text):
    # Bersihkan text: lowercase dan hilangkan spasi/tanda baca
    clean_text = ''.join(char.lower() for char in text if char.isalnum())
    # Bandingkan dengan reverse
    return clean_text == clean_text[::-1]

print(is_palindrome("racecar"))
print(is_palindrome("A man a plan a canal Panama"))
print(is_palindrome("hello"))`
  },
  {
    id: 'prime-numbers',
    title: 'Prime Number Generator',
    difficulty: 'Hard',
    description: 'Generate semua bilangan prima dari 1 sampai N menggunakan Sieve of Eratosthenes',
    problem: 'Implementasikan Sieve of Eratosthenes untuk mencari semua bilangan prima hingga N.\nAlgoritma ini lebih efisien daripada cek satu-satu.',
    testCases: [
      { input: 'N=30', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]' },
      { input: 'N=10', expectedOutput: '[2, 3, 5, 7]' }
    ],
    hints: [
      'Buat array boolean untuk track angka yang bukan prima',
      'Mulai dari 2, mark semua kelipatannya sebagai bukan prima',
      'Lanjut ke angka selanjutnya yang belum di-mark',
      'Stop ketika mencapai sqrt(N)'
    ],
    points: 100,
    template: `# Sieve of Eratosthenes
import math

def sieve_of_eratosthenes(n):
    # Tulis algoritma Sieve of Eratosthenes di sini
    pass

# Test
print(sieve_of_eratosthenes(30))
print(sieve_of_eratosthenes(10))`,
    solution: `import math

def sieve_of_eratosthenes(n):
    if n < 2:
        return []
    
    # Inisialisasi array
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    # Sieve algorithm
    for i in range(2, int(math.sqrt(n)) + 1):
        if is_prime[i]:
            # Mark semua kelipatan i sebagai bukan prima
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    
    # Kumpulkan semua bilangan prima
    primes = [i for i in range(2, n + 1) if is_prime[i]]
    return primes`
  }
]

type CodeChallengeProps = {
  onComplete: (challengeId: string, points: number) => void
  completedChallenges: string[]
}

export function CodeChallenge({ onComplete, completedChallenges }: CodeChallengeProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string>('fizzbuzz')
  const [showHints, setShowHints] = useState<boolean>(false)
  const [showSolution, setShowSolution] = useState<boolean>(false)
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0)

  const currentChallenge = challenges.find(c => c.id === selectedChallenge)!
  const isCompleted = completedChallenges.includes(selectedChallenge)

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-400/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-400/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30'
    }
  }

  const completedCount = completedChallenges.length
  const totalChallenges = challenges.length
  const progressPercentage = (completedCount / totalChallenges) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🏆 Code Challenge Arena
              </CardTitle>
              <CardDescription className="text-gray-300">
                Uji kemampuan coding Anda dengan berbagai tantangan menarik!
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 font-semibold">{completedCount}/{totalChallenges} Selesai</p>
              <Progress value={progressPercentage} className="w-24 mt-1" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Challenge Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <Card 
            key={challenge.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedChallenge === challenge.id 
                ? 'bg-cyan-500/20 border-cyan-400' 
                : 'bg-black/60 border-gray-600 hover:border-cyan-400/50'
            }`}
            onClick={() => {
              setSelectedChallenge(challenge.id)
              setShowHints(false)
              setShowSolution(false)
              setCurrentHintIndex(0)
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
                {completedChallenges.includes(challenge.id) && (
                  <span className="text-green-400">✓</span>
                )}
              </div>
              <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{challenge.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-400 font-semibold">{challenge.points} points</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Challenge Details */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-400 flex items-center gap-3">
                {currentChallenge.title}
                <Badge className={getDifficultyColor(currentChallenge.difficulty)}>
                  {currentChallenge.difficulty}
                </Badge>
                {isCompleted && <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Selesai ✓</Badge>}
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                {currentChallenge.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-purple-400 font-bold text-lg">{currentChallenge.points} points</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="problem" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="problem" className="data-[state=active]:bg-cyan-500/20">
                📋 Problem
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-cyan-500/20">
                💻 Code
              </TabsTrigger>
              <TabsTrigger value="hints" className="data-[state=active]:bg-cyan-500/20">
                💡 Hints
              </TabsTrigger>
              <TabsTrigger value="solution" className="data-[state=active]:bg-cyan-500/20">
                🔑 Solution
              </TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-2">📝 Deskripsi Problem:</h4>
                  <p className="text-gray-300 whitespace-pre-line">{currentChallenge.problem}</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">🧪 Test Cases:</h4>
                  <div className="space-y-2">
                    {currentChallenge.testCases.map((test, index) => (
                      <div key={index} className="bg-black/50 p-2 rounded text-sm">
                        <p className="text-cyan-400">Input: <code>{test.input}</code></p>
                        <p className="text-green-400">Expected: <code>{test.expectedOutput}</code></p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              <div className="space-y-4">
                <CodeEditor 
                  initialCode={currentChallenge.template}
                  exercises={[
                    'Implementasikan solusi sesuai dengan deskripsi problem',
                    'Test dengan test cases yang diberikan',
                    'Pastikan output sesuai dengan yang diharapkan'
                  ]}
                />
                {!isCompleted && (
                  <Button 
                    onClick={() => onComplete(currentChallenge.id, currentChallenge.points)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    🎯 Mark as Completed (+{currentChallenge.points} points)
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="hints" className="mt-4">
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-400/30 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">💡 Hints untuk {currentChallenge.title}:</h4>
                  
                  {!showHints ? (
                    <Button 
                      onClick={() => setShowHints(true)}
                      variant="outline"
                      className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                    >
                      Show Hints
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      {currentChallenge.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                        <div key={index} className="bg-black/30 p-3 rounded border-l-4 border-yellow-400">
                          <p className="text-gray-300">💡 <strong>Hint {index + 1}:</strong> {hint}</p>
                        </div>
                      ))}
                      
                      {currentHintIndex < currentChallenge.hints.length - 1 && (
                        <Button 
                          onClick={() => setCurrentHintIndex(currentHintIndex + 1)}
                          variant="outline"
                          size="sm"
                          className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                        >
                          Next Hint ({currentHintIndex + 2}/{currentChallenge.hints.length})
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="solution" className="mt-4">
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3">🔑 Solution:</h4>
                  <p className="text-gray-300 mb-3">
                    ⚠️ Cobalah dulu sebelum melihat solusi! Belajar lebih efektif dengan trial and error.
                  </p>
                  
                  {!showSolution ? (
                    <Button 
                      onClick={() => setShowSolution(true)}
                      variant="outline"
                      className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                    >
                      Show Solution
                    </Button>
                  ) : (
                    <div className="bg-black/50 p-4 rounded-lg">
                      <pre className="text-green-400 text-sm whitespace-pre-wrap">
                        <code>{currentChallenge.solution}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}