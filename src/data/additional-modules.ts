import type { LearningModule } from '@/app/page'

// Export hanya Modul 6 untuk saat ini - nanti akan ditambah modul lainnya
export const ADDITIONAL_MODULES: LearningModule[] = [
  {
    id: 'loops',
    title: 'Perulangan (Loops)',
    description: 'Pelajari cara mengulang kode dengan for dan while',
    icon: '🔁',
    lessons: [
      {
        id: 'loops-1',
        title: 'For Loop',
        content: `# For Loop di Python

For loop digunakan untuk mengulang blok kode sejumlah tertentu.

**Syntax Dasar**
\`\`\`python
for variable in sequence:
    # kode yang diulang
\`\`\`

**Contoh Loop dengan Range**
\`\`\`python
# Loop 1 sampai 5
for i in range(1, 6):
    print(i)  # Output: 1 2 3 4 5

# Loop dengan step
for i in range(0, 10, 2):
    print(i)  # Output: 0 2 4 6 8
\`\`\`

**Loop dengan List**
\`\`\`python
buah = ["apel", "pisang", "jeruk"]
for item in buah:
    print(item)
\`\`\``,
        codeExamples: [
          {
            title: 'Contoh For Loop',
            code: `# Loop dengan range
for i in range(5):
    print(f"Angka: {i}")

# Loop dengan list
nama = ["Ali", "Budi", "Citra"]
for n in nama:
    print(f"Halo, {n}!")`,
            explanation: 'range(5) menghasilkan 0, 1, 2, 3, 4. Loop list akan iterasi tiap element.'
          }
        ],
        exercises: [
          {
            question: 'Buat loop yang print angka 1-10',
            starterCode: '# Gunakan range untuk loop 1-10\n',
            hint: 'range(1, 11) untuk 1 sampai 10',
            solution: 'for i in range(1, 11):\n    print(i)'
          },
          {
            question: 'Loop list [\'merah\', \'biru\', \'hijau\'] dan print tiap warna',
            starterCode: 'warna = ["merah", "biru", "hijau"]\n# Loop dan print\n',
            hint: 'Gunakan for item in warna',
            solution: 'warna = ["merah", "biru", "hijau"]\nfor w in warna:\n    print(w)'
          }
        ]
      },
      {
        id: 'loops-2',
        title: 'While Loop & Break/Continue',
        content: `# While Loop

While loop mengulang kode selama kondisi True.

**Syntax**
\`\`\`python
while kondisi:
    # kode yang diulang
\`\`\`

**Break & Continue**
\`\`\`python
# Break - keluar dari loop
for i in range(10):
    if i == 5:
        break
    print(i)  # Output: 0 1 2 3 4

# Continue - skip iterasi
for i in range(5):
    if i == 2:
        continue
    print(i)  # Output: 0 1 3 4
\`\`\``,
        codeExamples: [
          {
            title: 'While Loop Example',
            code: `# While loop
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1

# Break example
for i in range(10):
    if i == 7:
        break
    print(i)`,
            explanation: 'While loop perlu increment manual. Break menghentikan loop sepenuhnya.'
          }
        ],
        exercises: [
          {
            question: 'Buat while loop yang count 1-10',
            starterCode: 'count = 1\n# Buat while loop\n',
            hint: 'while count <= 10: print(count), count += 1',
            solution: 'count = 1\nwhile count <= 10:\n    print(count)\n    count += 1'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Apa output dari: for i in range(3): print(i)',
          options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'],
          correctAnswer: 0,
          explanation: 'range(3) menghasilkan 0, 1, 2 (mulai dari 0)'
        },
        {
          question: 'Apa fungsi break dalam loop?',
          options: ['Skip iterasi', 'Keluar dari loop', 'Pause loop', 'Restart loop'],
          correctAnswer: 1,
          explanation: 'break digunakan untuk keluar dari loop sepenuhnya'
        },
        {
          question: 'Bagaimana cara loop 5 kali dengan for?',
          options: ['for i in 5:', 'for i in range(5):', 'for i = 5:', 'loop 5:'],
          correctAnswer: 1,
          explanation: 'range(5) menghasilkan sequence 0-4 (5 kali)'
        },
        {
          question: 'Apa yang dilakukan continue?',
          options: ['Keluar loop', 'Skip ke iterasi berikutnya', 'Restart loop', 'Stop program'],
          correctAnswer: 1,
          explanation: 'continue skip iterasi saat ini dan lanjut ke berikutnya'
        },
        {
          question: 'While loop berhenti saat kondisi?',
          options: ['True', 'False', 'None', '0'],
          correctAnswer: 1,
          explanation: 'While loop berjalan saat True, berhenti saat False'
        }
      ]
    }
  }
]
