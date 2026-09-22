'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { UserProgress, LearningModule } from '@/app/page'
import { Trophy, Flame, Star, Target, Award, RotateCcw, Zap } from 'lucide-react'

type ProgressTrackerProps = {
  userProgress: UserProgress
  modules: LearningModule[]
  onResetProgress: () => void
}

const BADGE_INFO: Record<string, { name: string; icon: React.ReactNode; color: string }> = {
  'first-steps': {
    name: 'Langkah Pertama',
    icon: <Star className="w-4 h-4" />,
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
  },
  'dedicated': {
    name: 'Dedicated Learner',
    icon: <Flame className="w-4 h-4" />,
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/50'
  },
  'quiz-master': {
    name: 'Quiz Master',
    icon: <Trophy className="w-4 h-4" />,
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/50'
  },
  'module-master': {
    name: 'Module Master',
    icon: <Award className="w-4 h-4" />,
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
  },
  'python-graduate': {
    name: 'Python Graduate',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-green-500/20 text-green-400 border-green-500/50'
  }
}

export function ProgressTracker({ userProgress, modules, onResetProgress }: ProgressTrackerProps) {
  const totalModules = modules.length
  const completedModules = userProgress.completedModules.length
  const overallProgress = (completedModules / totalModules) * 100

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completedLessons = userProgress.completedLessons.length
  const lessonProgress = (completedLessons / totalLessons) * 100

  const getLevel = (points: number) => {
    if (points >= 2000) return { level: 5, name: 'Python Master', color: 'text-purple-400' }
    if (points >= 1500) return { level: 4, name: 'Advanced', color: 'text-blue-400' }
    if (points >= 1000) return { level: 3, name: 'Intermediate', color: 'text-green-400' }
    if (points >= 500) return { level: 2, name: 'Beginner+', color: 'text-yellow-400' }
    return { level: 1, name: 'Pemula', color: 'text-gray-400' }
  }

  const currentLevel = getLevel(userProgress.points)
  const nextLevel = getLevel(userProgress.points + 1)
  const pointsToNextLevel = nextLevel.level > currentLevel.level 
    ? [500, 1000, 1500, 2000][currentLevel.level - 1] - userProgress.points
    : 0

  return (
    <div className="space-y-4">
      {/* Level Card */}
      <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">Level Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-1">
              {currentLevel.level}
            </div>
            <div className={`text-lg font-semibold ${currentLevel.color}`}>
              {currentLevel.name}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{userProgress.points} poin</span>
              {pointsToNextLevel > 0 && (
                <span>{pointsToNextLevel} lagi</span>
              )}
            </div>
            <Progress 
              value={pointsToNextLevel > 0 ? ((userProgress.points % 500) / 500) * 100 : 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">Statistik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Modules Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Modul</span>
              <span className="text-sm font-semibold text-cyan-400">
                {completedModules}/{totalModules}
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          {/* Lessons Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Pelajaran</span>
              <span className="text-sm font-semibold text-purple-400">
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <Progress value={lessonProgress} className="h-2" />
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-300">Streak</span>
            </div>
            <span className="text-xl font-bold text-orange-400">
              {userProgress.currentStreak} 🔥
            </span>
          </div>

          {/* Total Points */}
          <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-300">Total Poin</span>
            </div>
            <span className="text-xl font-bold text-cyan-400">
              {userProgress.points}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Badges Card */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Badge ({userProgress.badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userProgress.badges.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">
              Selesaikan modul untuk mendapat badge!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userProgress.badges.map((badgeId) => {
                const badge = BADGE_INFO[badgeId]
                if (!badge) return null
                
                return (
                  <Badge
                    key={badgeId}
                    className={`${badge.color} flex items-center gap-1`}
                  >
                    {badge.icon}
                    <span className="text-xs">{badge.name}</span>
                  </Badge>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Scores */}
      {Object.keys(userProgress.quizScores).length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Skor Kuis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(userProgress.quizScores).map(([moduleId, score]) => {
                const module = modules.find(m => m.id === moduleId)
                if (!module) return null
                
                return (
                  <div key={moduleId} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 truncate">{module.title}</span>
                    <span className={`font-semibold ${
                      score >= 80 ? 'text-green-400' : 
                      score >= 60 ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}>
                      {score}%
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Target Selanjutnya
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {completedModules < totalModules && (
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-cyan-400">•</span>
              <span>Selesaikan modul {completedModules + 1}/{totalModules}</span>
            </div>
          )}
          {userProgress.badges.length < 5 && (
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>Kumpulkan {5 - userProgress.badges.length} badge lagi</span>
            </div>
          )}
          {pointsToNextLevel > 0 && (
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-yellow-400">•</span>
              <span>Dapatkan {pointsToNextLevel} poin untuk level up</span>
            </div>
          )}
          {completedModules === totalModules && (
            <div className="text-center text-green-400 py-2">
              🎉 Semua target tercapai!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={onResetProgress}
        variant="outline"
        size="sm"
        className="w-full bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset Progress
      </Button>
    </div>
  )
}
