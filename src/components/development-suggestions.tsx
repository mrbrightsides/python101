'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface DevelopmentSuggestionsProps {
  userProgress: {
    completedModules: string[]
    points: number
    badges: string[]
  }
}

const developmentPaths = [
  {
    id: 'web-development',
    title: '🌐 Pengembangan Web',
    description: 'Belajar membuat aplikasi web dengan Python',
    level: 'Pemula - Menengah',
    prerequisites: ['syntax', 'variables', 'functions'],
    technologies: ['Django', 'Flask', 'FastAPI', 'HTML/CSS', 'JavaScript'],
    projects: [
      'Blog pribadi dengan Django',
      'API REST dengan Flask',
      'Website portfolio',
      'Sistem login dan registrasi'
    ],
    resources: [
      'Django Documentation',
      'Flask Tutorial',
      'Python Web Development Course',
      'Full Stack Python'
    ],
    estimatedTime: '2-3 bulan',
    difficulty: 60
  },
  {
    id: 'data-science',
    title: '📊 Data Science & Analytics',
    description: 'Analisis data dan machine learning',
    level: 'Menengah',
    prerequisites: ['syntax', 'variables', 'data-structures', 'loops'],
    technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    projects: [
      'Analisis data penjualan',
      'Visualisasi data COVID-19',
      'Prediksi harga rumah',
      'Analisis sentimen media sosial'
    ],
    resources: [
      'Kaggle Learn',
      'Python for Data Analysis',
      'Coursera Data Science',
      'GitHub Data Science Projects'
    ],
    estimatedTime: '3-4 bulan',
    difficulty: 75
  },
  {
    id: 'automation',
    title: '🤖 Otomasi & Scripting',
    description: 'Automatisasi tugas sehari-hari',
    level: 'Pemula',
    prerequisites: ['syntax', 'variables', 'functions', 'input-output'],
    technologies: ['Selenium', 'BeautifulSoup', 'Requests', 'Schedule', 'OS Module'],
    projects: [
      'Bot WhatsApp otomatis',
      'Web scraping berita',
      'Backup file otomatis',
      'Email scheduler'
    ],
    resources: [
      'Automate the Boring Stuff',
      'Python Automation Cookbook',
      'Selenium Documentation',
      'Web Scraping Tutorials'
    ],
    estimatedTime: '1-2 bulan',
    difficulty: 40
  },
  {
    id: 'game-development',
    title: '🎮 Pengembangan Game',
    description: 'Membuat game sederhana dengan Python',
    level: 'Pemula - Menengah',
    prerequisites: ['syntax', 'variables', 'functions', 'loops'],
    technologies: ['Pygame', 'Turtle', 'Tkinter', 'Arcade'],
    projects: [
      'Game Snake klasik',
      'Puzzle game',
      'Platform game sederhana',
      'Quiz game interaktif'
    ],
    resources: [
      'Pygame Tutorial',
      'Real Python Game Development',
      'Python Game Programming',
      'Arcade Documentation'
    ],
    estimatedTime: '2-3 bulan',
    difficulty: 55
  },
  {
    id: 'mobile-development',
    title: '📱 Pengembangan Mobile',
    description: 'Aplikasi mobile dengan Python',
    level: 'Menengah - Lanjutan',
    prerequisites: ['functions', 'data-structures', 'loops'],
    technologies: ['Kivy', 'BeeWare', 'React Native (via bridge)', 'Flutter (via bridge)'],
    projects: [
      'Aplikasi kalkulator',
      'Todo list app',
      'Weather app',
      'Expense tracker'
    ],
    resources: [
      'Kivy Documentation',
      'BeeWare Tutorial',
      'Python Mobile Development',
      'Cross-platform Python Apps'
    ],
    estimatedTime: '3-5 bulan',
    difficulty: 80
  },
  {
    id: 'ai-ml',
    title: '🧠 Artificial Intelligence',
    description: 'Machine Learning dan AI',
    level: 'Lanjutan',
    prerequisites: ['data-structures', 'loops', 'functions'],
    technologies: ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'NLTK'],
    projects: [
      'Chatbot sederhana',
      'Image classification',
      'Recommendation system',
      'Natural Language Processing'
    ],
    resources: [
      'TensorFlow Tutorial',
      'PyTorch Documentation',
      'Machine Learning Course',
      'AI Python Projects'
    ],
    estimatedTime: '4-6 bulan',
    difficulty: 90
  }
]

const learningTips = [
  {
    title: '💡 Tips Belajar Efektif',
    suggestions: [
      'Praktik coding setiap hari minimal 30 menit',
      'Bergabung dengan komunitas Python Indonesia',
      'Buat proyek kecil untuk setiap konsep yang dipelajari',
      'Baca dokumentasi resmi Python secara berkala',
      'Ikuti tutorial YouTube dari programmer Indonesia'
    ]
  },
  {
    title: '🛠️ Tools yang Direkomendasikan',
    suggestions: [
      'Visual Studio Code + Python Extension',
      'PyCharm Community Edition',
      'Jupyter Notebook untuk data science',
      'Git untuk version control',
      'Virtual Environment untuk manage dependencies'
    ]
  },
  {
    title: '📚 Sumber Belajar Tambahan',
    suggestions: [
      'Python.org - Dokumentasi resmi',
      'Real Python - Tutorial mendalam',
      'GitHub - Belajar dari kode open source',
      'Stack Overflow - Forum tanya jawab',
      'Python Indonesia Telegram Group'
    ]
  },
  {
    title: '🎯 Roadmap Karir',
    suggestions: [
      'Junior Python Developer (0-1 tahun)',
      'Backend Developer (1-3 tahun)',
      'Data Scientist (2-4 tahun)',
      'Senior Python Developer (3-5 tahun)',
      'Technical Lead/Architect (5+ tahun)'
    ]
  }
]

export function DevelopmentSuggestions({ userProgress }: DevelopmentSuggestionsProps) {
  const completedModulesCount = userProgress.completedModules.length
  const totalModules = 8 // Assuming 8 modules total
  const progressPercentage = (completedModulesCount / totalModules) * 100

  const getRecommendedPaths = () => {
    const completed = userProgress.completedModules
    return developmentPaths.filter(path => 
      path.prerequisites.every(prereq => completed.includes(prereq))
    )
  }

  const getNextToUnlock = () => {
    const completed = userProgress.completedModules
    return developmentPaths.filter(path => 
      !path.prerequisites.every(prereq => completed.includes(prereq))
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-cyan-400">📈 Progress Belajar Anda</CardTitle>
          <CardDescription className="text-gray-300">
            Lihat kemajuan dan rekomendasi jalur pembelajaran selanjutnya
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Modul Selesai</span>
              <span className="text-cyan-400">{completedModulesCount}/{totalModules}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{userProgress.points}</div>
              <div className="text-xs text-gray-400">Total Poin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{userProgress.badges.length}</div>
              <div className="text-xs text-gray-400">Badge</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completedModulesCount}</div>
              <div className="text-xs text-gray-400">Modul</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {progressPercentage.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400">Kemajuan</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Learning Paths */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-cyan-400">🎯 Jalur Pembelajaran yang Direkomendasikan</CardTitle>
          <CardDescription className="text-gray-300">
            Berdasarkan progress Anda saat ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {getRecommendedPaths().map((path) => (
              <Card key={path.id} className="bg-gray-800/50 border-gray-600/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{path.title}</CardTitle>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      Siap!
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Kesulitan</span>
                      <span className="text-cyan-400">{path.level}</span>
                    </div>
                    <Progress value={path.difficulty} className="h-1" />
                    <div className="text-xs text-gray-500">
                      Estimasi: {path.estimatedTime}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">Teknologi:</div>
                    <div className="flex flex-wrap gap-1">
                      {path.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-cyan-400/30 text-cyan-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">Contoh Proyek:</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {path.projects.slice(0, 2).map((project, idx) => (
                        <li key={idx}>• {project}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Paths */}
      {getNextToUnlock().length > 0 && (
        <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
          <CardHeader>
            <CardTitle className="text-orange-400">🔒 Jalur yang Akan Terbuka</CardTitle>
            <CardDescription className="text-gray-300">
              Selesaikan modul prasyarat untuk membuka jalur ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getNextToUnlock().slice(0, 4).map((path) => (
                <Card key={path.id} className="bg-gray-900/50 border-gray-700/30 opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-400">{path.title}</CardTitle>
                      <Badge variant="outline" className="border-orange-400/50 text-orange-400">
                        Terkunci
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-500">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-400">Prasyarat:</div>
                      <div className="flex flex-wrap gap-1">
                        {path.prerequisites.map((prereq) => (
                          <Badge 
                            key={prereq} 
                            variant="outline" 
                            className={`text-xs ${
                              userProgress.completedModules.includes(prereq)
                                ? 'border-green-400/30 text-green-400'
                                : 'border-red-400/30 text-red-400'
                            }`}
                          >
                            {userProgress.completedModules.includes(prereq) ? '✓' : '✗'} {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        {learningTips.map((tip, index) => (
          <Card key={index} className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tip.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 text-xs">▶</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-sm border-cyan-400/30">
        <CardContent className="pt-6 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">🚀 Siap Melangkah ke Level Selanjutnya?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Dengan dasar Python yang sudah Anda pelajari, saatnya mengaplikasikan ilmu dalam proyek nyata. 
              Pilih jalur yang paling menarik dan mulai coding journey Anda!
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                💼 Cari Proyek Praktik
              </Button>
              <Button variant="outline" className="border-purple-400/50 text-purple-400 hover:bg-purple-500/20">
                🌐 Gabung Komunitas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}