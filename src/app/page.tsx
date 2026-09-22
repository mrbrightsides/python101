'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Web3Background } from '@/components/web3-background'
import { ModuleLearning } from '@/components/module-learning'
import { ProgressTracker } from '@/components/progress-tracker'
import { sdk } from "@farcaster/miniapp-sdk"
// import { ADDITIONAL_MODULES } from '@/data/additional-modules'

export type UserProgress = {
  completedModules: string[]
  points: number
  badges: string[]
  currentStreak: number
  quizScores: { [key: string]: number }
  lastVisit: string
  completedLessons: string[]
}

export type LearningModule = {
  id: string
  title: string
  description: string
  icon: string
  lessons: {
    id: string
    title: string
    content: string
    codeExamples: {
      title: string
      code: string
      explanation: string
    }[]
    exercises: {
      question: string
      starterCode: string
      hint: string
      solution: string
    }[]
  }[]
  quiz: {
    questions: {
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }[]
  }
}

const BASE_MODULES: LearningModule[] = [
  // Base modules go here
  {
    id: 'syntax',
    title: 'Sintaks Python',
    description: 'Pelajari struktur dasar dan aturan penulisan kode Python',
    icon: '📝',
    lessons: [
      {
        id: 'syntax-1',
        title: 'Pengenalan Python dan Print Statement',
        content: `Python adalah bahasa pemrograman yang mudah dipelajari dan sangat powerful. Python digunakan untuk web development, data science, AI, automation, dan banyak lagi!

**Mengapa Python?**
- Sintaks yang mudah dibaca (seperti bahasa Inggris)
- Komunitas besar dan banyak library
- Cocok untuk pemula hingga professional
- Digunakan oleh Google, Netflix, NASA, dan perusahaan besar lainnya

**Print Statement**
Fungsi \`print()\` digunakan untuk menampilkan output ke layar. Ini adalah fungsi paling dasar yang akan sering Anda gunakan.`,
        codeExamples: [
          {
            title: 'Print Sederhana',
            code: `print("Hello, World!")
print("Saya belajar Python")
print("Python itu mudah!")`,
            explanation: 'Setiap baris print() akan menampilkan teks di layar. Teks harus diapit dengan tanda kutip (single \' atau double ").'
          },
          {
            title: 'Print dengan Angka',
            code: `print("Umur saya:", 25)
print(100 + 50)
print("Hasil:", 10 * 5)`,
            explanation: 'Print bisa menampilkan teks dan angka. Python otomatis menghitung operasi matematika.'
          }
        ],
        exercises: [
          {
            question: 'Tampilkan nama Anda menggunakan print()',
            starterCode: '# Tulis kode Anda di sini\n',
            hint: 'Gunakan print("Nama Anda")',
            solution: 'print("Budi Santoso")'
          },
          {
            question: 'Hitung dan tampilkan hasil 25 + 17',
            starterCode: '# Tulis kode untuk menghitung 25 + 17\n',
            hint: 'Gunakan print(25 + 17)',
            solution: 'print(25 + 17)'
          }
        ]
      },
      {
        id: 'syntax-2',
        title: 'Komentar dan Indentasi',
        content: `**Komentar**
Komentar adalah teks yang tidak dijalankan oleh Python. Berguna untuk menjelaskan kode atau membuat catatan.

**Indentasi**
Python menggunakan indentasi (spasi di awal baris) untuk mengelompokkan kode. Ini sangat penting dan membuat kode Python terlihat rapi!`,
        codeExamples: [
          {
            title: 'Cara Membuat Komentar',
            code: `# Ini adalah komentar satu baris
print("Hello")  # Komentar di akhir baris

"""
Ini adalah komentar multi-baris
Bisa untuk dokumentasi panjang
"""`,
            explanation: 'Gunakan # untuk komentar satu baris, atau triple quotes untuk komentar panjang.'
          },
          {
            title: 'Pentingnya Indentasi',
            code: `# Tanpa indentasi (flat code)
print("Baris 1")
print("Baris 2")

# Dengan indentasi (akan dipelajari nanti untuk if/loop)
# Indentasi biasanya 4 spasi atau 1 tab`,
            explanation: 'Indentasi akan sangat penting saat belajar if statement dan loop. Python strict soal ini!'
          }
        ],
        exercises: [
          {
            question: 'Buat komentar yang menjelaskan kode print Anda',
            starterCode: '# Tulis komentar di sini\nprint("Hello")',
            hint: 'Tambahkan # di atas atau di samping print',
            solution: '# Menampilkan sapaan\nprint("Hello")'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Apa fungsi dari print() dalam Python?',
          options: [
            'Mencetak dokumen ke printer',
            'Menampilkan output ke layar',
            'Menyimpan file',
            'Menghapus data'
          ],
          correctAnswer: 1,
          explanation: 'Fungsi print() digunakan untuk menampilkan output/hasil ke layar atau console. Ini adalah cara Python berkomunikasi dengan user.'
        },
        {
          question: 'Mana penulisan komentar yang BENAR di Python?',
          options: [
            '// Ini komentar',
            '/* Ini komentar */',
            '# Ini komentar',
            '-- Ini komentar'
          ],
          correctAnswer: 2,
          explanation: 'Di Python, komentar satu baris menggunakan tanda #. Tanda // digunakan di JavaScript/Java, /* */ di C/Java, dan -- di SQL.'
        },
        {
          question: 'Apa yang terjadi jika Anda menulis print("Hello) tanpa tanda kutip penutup?',
          options: [
            'Kode akan jalan normal',
            'Python akan melanjutkan ke baris berikutnya',
            'Akan terjadi Syntax Error',
            'Tidak ada yang terjadi'
          ],
          correctAnswer: 2,
          explanation: 'String di Python harus memiliki tanda kutip pembuka dan penutup yang match. Jika tidak, Python akan menunjukkan Syntax Error.'
        },
        {
          question: 'Mengapa indentasi penting dalam Python?',
          options: [
            'Hanya untuk membuat kode terlihat rapi',
            'Python menggunakan indentasi untuk mengelompokkan kode',
            'Tidak penting, hanya opsional',
            'Hanya untuk komentar'
          ],
          correctAnswer: 1,
          explanation: 'Berbeda dengan bahasa lain yang menggunakan {}, Python menggunakan indentasi (spasi/tab) untuk menentukan block kode. Ini wajib dan mempengaruhi cara kode dijalankan!'
        },
        {
          question: 'Mana output dari: print("Python", 2024)?',
          options: [
            'Python2024',
            'Python 2024',
            'Error',
            'Python'
          ],
          correctAnswer: 1,
          explanation: 'Fungsi print() bisa menerima multiple arguments yang dipisah koma. Python otomatis menambahkan spasi antar arguments.'
        }
      ]
    }
  },
  {
    id: 'variables',
    title: 'Variabel & Tipe Data',
    description: 'Memahami cara menyimpan dan mengelola data dalam Python',
    icon: '📦',
    lessons: [
      {
        id: 'variables-1',
        title: 'Pengenalan Variabel',
        content: `**Apa itu Variabel?**
Variabel adalah "kotak" untuk menyimpan data. Bayangkan seperti label pada botol yang berisi sesuatu.

**Aturan Penamaan Variabel:**
- Harus dimulai dengan huruf atau underscore (_)
- Bisa mengandung huruf, angka, dan underscore
- Case-sensitive (nama dan Nama adalah berbeda)
- Tidak boleh pakai kata kunci Python (if, for, while, dll)`,
        codeExamples: [
          {
            title: 'Membuat Variabel',
            code: `# Variabel untuk menyimpan nama
nama = "Budi"
print(nama)

# Variabel untuk menyimpan umur
umur = 25
print("Umur:", umur)

# Variabel bisa diubah
umur = 26
print("Umur sekarang:", umur)`,
            explanation: 'Gunakan tanda = untuk assign nilai ke variabel. Tidak perlu deklarasi tipe, Python otomatis detect!'
          },
          {
            title: 'Multiple Assignment',
            code: `# Assign beberapa variabel sekaligus
x, y, z = 10, 20, 30
print(x, y, z)

# Assign nilai yang sama
a = b = c = 100
print(a, b, c)`,
            explanation: 'Python memungkinkan assign multiple variabel dalam satu baris untuk efisiensi.'
          }
        ],
        exercises: [
          {
            question: 'Buat variabel "kota" berisi nama kota Anda, lalu print',
            starterCode: '# Buat variabel kota\n',
            hint: 'kota = "NamaKota" lalu print(kota)',
            solution: 'kota = "Jakarta"\nprint(kota)'
          },
          {
            question: 'Buat 3 variabel: nama, umur, hobi. Lalu print semuanya',
            starterCode: '# Buat 3 variabel\n',
            hint: 'Gunakan format: nama = "...", umur = ..., hobi = "..."',
            solution: 'nama = "Andi"\numur = 20\nhobi = "Coding"\nprint(nama, umur, hobi)'
          }
        ]
      },
      {
        id: 'variables-2',
        title: 'Tipe Data Dasar',
        content: `Python memiliki beberapa tipe data built-in yang paling sering digunakan:

**1. String (str)** - Teks, diapit tanda kutip
**2. Integer (int)** - Angka bulat
**3. Float (float)** - Angka desimal
**4. Boolean (bool)** - True atau False

Python otomatis mendeteksi tipe data (dynamic typing).`,
        codeExamples: [
          {
            title: 'Macam-macam Tipe Data',
            code: `# String
nama = "Python"
greeting = 'Hello World'

# Integer
umur = 25
tahun = 2024

# Float
tinggi = 175.5
nilai = 95.7

# Boolean
is_student = True
is_graduated = False

# Cek tipe data
print(type(nama))      # <class 'str'>
print(type(umur))      # <class 'int'>
print(type(tinggi))    # <class 'float'>
print(type(is_student)) # <class 'bool'>`,
            explanation: 'Gunakan fungsi type() untuk mengecek tipe data sebuah variabel. Sangat berguna untuk debugging!'
          },
          {
            title: 'Konversi Tipe Data',
            code: `# String ke Integer
age_str = "25"
age_int = int(age_str)
print(age_int + 5)  # Output: 30

# Integer ke String
number = 100
text = str(number)
print("Nomor: " + text)

# String ke Float
price_str = "99.99"
price_float = float(price_str)
print(price_float * 2)`,
            explanation: 'Type casting berguna saat Anda perlu mengubah tipe data, misalnya input user yang selalu string.'
          }
        ],
        exercises: [
          {
            question: 'Buat variabel dengan semua tipe data (string, int, float, bool)',
            starterCode: '# Buat 4 variabel dengan tipe berbeda\n',
            hint: 'nama = "...", umur = ..., berat = ..., aktif = True/False',
            solution: 'nama = "Ali"\numur = 22\nberat = 65.5\naktif = True\nprint(nama, umur, berat, aktif)'
          },
          {
            question: 'Konversi string "50" menjadi integer dan tambahkan 25',
            starterCode: 'angka_str = "50"\n# Konversi dan tambahkan 25\n',
            hint: 'Gunakan int() untuk konversi',
            solution: 'angka_str = "50"\nangka_int = int(angka_str)\nhasil = angka_int + 25\nprint(hasil)'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Mana nama variabel yang VALID di Python?',
          options: [
            '2nama',
            'nama-lengkap',
            'nama_lengkap',
            'nama lengkap'
          ],
          correctAnswer: 2,
          explanation: 'Variabel di Python harus dimulai dengan huruf atau underscore, dan bisa mengandung angka. nama_lengkap adalah format valid (snake_case).'
        },
        {
          question: 'Apa tipe data dari variabel: x = 3.14?',
          options: [
            'integer',
            'float',
            'string',
            'boolean'
          ],
          correctAnswer: 1,
          explanation: 'Angka dengan titik desimal di Python secara otomatis ditentukan sebagai tipe float (floating-point number).'
        },
        {
          question: 'Bagaimana cara mengecek tipe data sebuah variabel?',
          options: [
            'typeof(x)',
            'type(x)',
            'datatype(x)',
            'check(x)'
          ],
          correctAnswer: 1,
          explanation: 'Gunakan fungsi type() untuk mengecek tipe data variabel di Python. Contoh: type(nama) akan return <class \'str\'>'
        },
        {
          question: 'Apa hasil dari: print("5" + "5")?',
          options: [
            '10',
            '55',
            'Error',
            '5 5'
          ],
          correctAnswer: 1,
          explanation: 'Karena kedua nilai adalah string, operator + akan menggabungkan (concatenate) string tersebut menjadi "55", bukan menjumlahkan angka.'
        },
        {
          question: 'Mana statement yang BENAR tentang Boolean?',
          options: [
            'Boolean hanya bisa True atau False',
            'Boolean bisa berisi angka',
            'Boolean ditulis dengan huruf kecil (true/false)',
            'Boolean adalah tipe data string'
          ],
          correctAnswer: 0,
          explanation: 'Boolean di Python hanya memiliki dua nilai: True atau False (huruf besar T dan F). Ini digunakan untuk logika kondisional.'
        }
      ]
    }
  },
  {
    id: 'input-output',
    title: 'Input & Output',
    description: 'Belajar cara berinteraksi dengan user melalui input dan output',
    icon: '💬',
    lessons: [
      {
        id: 'io-1',
        title: 'Fungsi Input',
        content: `**Input dari User**
Fungsi \`input()\` memungkinkan program Anda berinteraksi dengan user. Program akan menunggu user mengetik sesuatu dan menekan Enter.

**Penting:** Hasil dari input() selalu bertipe string! Jika butuh angka, harus dikonversi dengan int() atau float().`,
        codeExamples: [
          {
            title: 'Input Sederhana',
            code: `# Meminta input dari user
nama = input("Siapa nama Anda? ")
print("Halo, " + nama + "!")

# Input dengan prompt yang jelas
kota = input("Kota asal: ")
print("Anda dari", kota)`,
            explanation: 'Teks dalam input() adalah prompt yang ditampilkan ke user. Hasil input disimpan dalam variabel.'
          },
          {
            title: 'Input Angka',
            code: `# Input harus dikonversi untuk operasi matematika
umur_str = input("Berapa umur Anda? ")
umur = int(umur_str)
print("5 tahun lagi Anda berusia", umur + 5)

# Atau langsung konversi
tinggi = float(input("Tinggi badan (cm): "))
print("Tinggi Anda:", tinggi, "cm")`,
            explanation: 'Gunakan int() untuk angka bulat dan float() untuk angka desimal. Jika tidak dikonversi, tidak bisa dihitung!'
          }
        ],
        exercises: [
          {
            question: 'Buat program yang meminta nama user dan menyapa dengan nama tersebut',
            starterCode: '# Minta input nama\n# Tampilkan sapaan\n',
            hint: 'Gunakan input() untuk nama, lalu print dengan nama tersebut',
            solution: 'nama = input("Nama Anda: ")\nprint("Halo,", nama, "!")'
          },
          {
            question: 'Minta 2 angka dari user dan tampilkan hasil penjumlahannya',
            starterCode: '# Minta 2 angka\n# Hitung dan tampilkan hasilnya\n',
            hint: 'Jangan lupa konversi ke int() sebelum dijumlahkan',
            solution: 'angka1 = int(input("Angka 1: "))\nangka2 = int(input("Angka 2: "))\nhasil = angka1 + angka2\nprint("Hasil:", hasil)'
          }
        ]
      },
      {
        id: 'io-2',
        title: 'F-Strings dan Format Output',
        content: `**F-Strings (Format Strings)**
Cara modern dan mudah untuk menggabungkan variabel dengan string di Python 3.6+. Gunakan prefix f sebelum string dan {} untuk variabel.

**Kenapa F-String?**
- Lebih mudah dibaca
- Lebih cepat
- Bisa langsung evaluasi ekspresi dalam {}`,
        codeExamples: [
          {
            title: 'F-String Basics',
            code: `nama = "Budi"
umur = 25

# Cara lama (concatenation)
print("Nama: " + nama + ", Umur: " + str(umur))

# Cara modern (f-string)
print(f"Nama: {nama}, Umur: {umur}")

# Bisa langsung hitung dalam f-string
print(f"5 tahun lagi umur saya {umur + 5}")`,
            explanation: 'F-string membuat kode lebih clean dan mudah dibaca. Tinggal letakkan variabel atau ekspresi dalam {}.'
          },
          {
            title: 'Format Angka dengan F-String',
            code: `harga = 25000.5
diskon = 0.15

# Format angka dengan 2 desimal
print(f"Harga: Rp {harga:.2f}")

# Hitung langsung
total = harga * (1 - diskon)
print(f"Setelah diskon: Rp {total:.2f}")

# Format dengan separator ribuan
nilai_besar = 1000000
print(f"Nilai: Rp {nilai_besar:,}")`,
            explanation: 'Format :.2f untuk 2 angka desimal, :, untuk separator ribuan. Sangat berguna untuk output yang rapi!'
          }
        ],
        exercises: [
          {
            question: 'Minta nama dan umur user, tampilkan dengan f-string',
            starterCode: '# Input nama dan umur\n# Tampilkan dengan f-string\n',
            hint: 'Gunakan f"..." dan {variabel} untuk menampilkan',
            solution: 'nama = input("Nama: ")\numur = int(input("Umur: "))\nprint(f"Halo {nama}, umur Anda {umur} tahun")'
          },
          {
            question: 'Hitung luas persegi panjang dari input user dengan output rapi menggunakan f-string',
            starterCode: '# Input panjang dan lebar\n# Hitung dan tampilkan luas\n',
            hint: 'Luas = panjang * lebar, gunakan f-string untuk output',
            solution: 'panjang = float(input("Panjang: "))\nlebar = float(input("Lebar: "))\nluas = panjang * lebar\nprint(f"Luas persegi panjang: {luas:.2f}")'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Apa tipe data yang dikembalikan oleh fungsi input()?',
          options: [
            'integer',
            'float',
            'string',
            'boolean'
          ],
          correctAnswer: 2,
          explanation: 'Fungsi input() SELALU mengembalikan string, tidak peduli apa yang user ketik. Jika butuh angka, harus dikonversi dengan int() atau float().'
        },
        {
          question: 'Bagaimana cara mengkonversi input menjadi integer?',
          options: [
            'umur = input("Umur: ")',
            'umur = int(input("Umur: "))',
            'umur = str(input("Umur: "))',
            'umur = float(input("Umur: "))'
          ],
          correctAnswer: 1,
          explanation: 'Wrap fungsi input() dengan int() untuk langsung konversi ke integer: int(input("..."))'
        },
        {
          question: 'Apa perbedaan utama f-string dengan concatenation biasa?',
          options: [
            'F-string lebih lambat',
            'F-string tidak bisa pakai variabel',
            'F-string lebih mudah dibaca dan lebih cepat',
            'F-string hanya untuk angka'
          ],
          correctAnswer: 2,
          explanation: 'F-string (f"...") lebih mudah dibaca, lebih cepat, dan memungkinkan evaluasi ekspresi langsung dalam {}. Lebih modern daripada concatenation dengan +.'
        },
        {
          question: 'Mana syntax f-string yang BENAR?',
          options: [
            'print("Nama: {nama}")',
            'print(f"Nama: {nama}")',
            'print("Nama: " + {nama})',
            'print(f(Nama: nama))'
          ],
          correctAnswer: 1,
          explanation: 'F-string harus diawali dengan huruf f, lalu string dalam tanda kutip, dan variabel dalam {}. Format: f"text {variable}"'
        },
        {
          question: 'Apa yang terjadi jika: print("5" + 5)?',
          options: [
            '10',
            '55',
            'Error: cannot concatenate str and int',
            '"5" 5'
          ],
          correctAnswer: 2,
          explanation: 'Python tidak bisa concatenate string dan integer secara langsung. Harus konversi dulu: "5" + str(5) atau int("5") + 5.'
        }
      ]
    }
  },
  {
    id: 'operators',
    title: 'Operator & Ekspresi',
    description: 'Menguasai operator matematika, perbandingan, dan logika',
    icon: '🔢',
    lessons: [
      {
        id: 'operators-1',
        title: 'Operator Aritmatika',
        content: `**Operator Matematika Dasar**
Python mendukung semua operasi matematika standar dan lebih!

**Operator Aritmatika:**
- \`+\` Penjumlahan
- \`-\` Pengurangan
- \`*\` Perkalian
- \`/\` Pembagian (hasil float)
- \`//\` Pembagian bulat (floor division)
- \`%\` Modulo (sisa bagi)
- \`**\` Pangkat`,
        codeExamples: [
          {
            title: 'Operasi Matematika Dasar',
            code: `# Penjumlahan dan pengurangan
print(10 + 5)   # 15
print(10 - 5)   # 5

# Perkalian dan pembagian
print(10 * 5)   # 50
print(10 / 3)   # 3.3333...

# Pembagian bulat (hasil integer)
print(10 // 3)  # 3

# Modulo (sisa bagi)
print(10 % 3)   # 1

# Pangkat
print(2 ** 3)   # 8 (2 pangkat 3)
print(5 ** 2)   # 25 (5 pangkat 2)`,
            explanation: 'Operator // membuang angka desimal, % memberikan sisa bagi, ** untuk pangkat. Penting untuk matematika!'
          },
          {
            title: 'Urutan Operasi (PEMDAS)',
            code: `# Python mengikuti urutan matematika
# Parentheses, Exponents, Multiply/Divide, Add/Subtract

hasil1 = 2 + 3 * 4      # 14 (bukan 20!)
hasil2 = (2 + 3) * 4    # 20 (pakai kurung)

print(f"2 + 3 * 4 = {hasil1}")
print(f"(2 + 3) * 4 = {hasil2}")

# Contoh kompleks
hitung = 10 + 5 * 2 ** 3 - 4 / 2
print(f"Hasil: {hitung}")  # 10 + 5*8 - 2 = 48`,
            explanation: 'Gunakan kurung () untuk mengatur urutan operasi. Kalau ragu, pakai kurung!'
          }
        ],
        exercises: [
          {
            question: 'Hitung luas lingkaran dengan jari-jari 7 (π ≈ 3.14)',
            starterCode: '# Luas = π * r^2\n',
            hint: 'Gunakan ** untuk pangkat',
            solution: 'pi = 3.14\nr = 7\nluas = pi * r ** 2\nprint(f"Luas lingkaran: {luas}")'
          },
          {
            question: 'Cek apakah 17 habis dibagi 5 atau ada sisa (gunakan modulo)',
            starterCode: '# Gunakan operator %\n',
            hint: 'Jika 17 % 5 hasilnya 0, berarti habis dibagi',
            solution: 'sisa = 17 % 5\nprint(f"Sisa bagi: {sisa}")\nif sisa == 0:\n    print("Habis dibagi")\nelse:\n    print("Tidak habis dibagi")'
          }
        ]
      },
      {
        id: 'operators-2',
        title: 'Operator Perbandingan dan Logika',
        content: `**Operator Perbandingan**
Digunakan untuk membandingkan nilai, hasilnya selalu Boolean (True/False).

**Operator Perbandingan:**
- \`==\` Sama dengan
- \`!=\` Tidak sama dengan
- \`>\` Lebih besar
- \`<\` Lebih kecil
- \`>=\` Lebih besar sama dengan
- \`<=\` Lebih kecil sama dengan

**Operator Logika**
Untuk menggabungkan kondisi:
- \`and\` Keduanya harus True
- \`or\` Salah satu True
- \`not\` Membalik nilai Boolean`,
        codeExamples: [
          {
            title: 'Operator Perbandingan',
            code: `umur = 20
tinggi = 170

# Perbandingan
print(umur == 20)    # True
print(umur != 25)    # True
print(tinggi > 160)  # True
print(tinggi < 160)  # False
print(tinggi >= 170) # True
print(tinggi <= 180) # True

# Hati-hati: == vs =
# == untuk membandingkan
# = untuk assign nilai`,
            explanation: 'Operator perbandingan menghasilkan True atau False. Sangat berguna untuk kondisi if statement!'
          },
          {
            title: 'Operator Logika',
            code: `umur = 20
punya_sim = True

# AND - semua harus True
bisa_nyetir = umur >= 17 and punya_sim
print(f"Bisa nyetir: {bisa_nyetir}")

# OR - salah satu True
is_weekend = False
is_holiday = True
bisa_libur = is_weekend or is_holiday
print(f"Bisa libur: {bisa_libur}")

# NOT - membalik nilai
aktif = True
tidak_aktif = not aktif
print(f"Tidak aktif: {tidak_aktif}")`,
            explanation: 'and, or, not digunakan untuk logika kompleks. Sangat powerful untuk kondisi yang rumit!'
          }
        ],
        exercises: [
          {
            question: 'Cek apakah angka 15 berada di antara 10 dan 20 (inklusif)',
            starterCode: 'angka = 15\n# Cek apakah 10 <= angka <= 20\n',
            hint: 'Gunakan operator >= dan <=',
            solution: 'angka = 15\nhasil = angka >= 10 and angka <= 20\nprint(f"15 di antara 10-20: {hasil}")'
          },
          {
            question: 'Cek apakah user eligible untuk diskon (umur < 18 ATAU umur > 60)',
            starterCode: 'umur = 65\n# Cek eligibility\n',
            hint: 'Gunakan operator or',
            solution: 'umur = 65\neligible = umur < 18 or umur > 60\nprint(f"Eligible diskon: {eligible}")'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Apa hasil dari: 10 // 3?',
          options: [
            '3.333',
            '3',
            '4',
            '1'
          ],
          correctAnswer: 1,
          explanation: 'Operator // adalah floor division (pembagian bulat). 10 // 3 = 3, membuang angka desimal.'
        },
        {
          question: 'Apa hasil dari: 17 % 5?',
          options: [
            '3',
            '2',
            '3.4',
            '12'
          ],
          correctAnswer: 1,
          explanation: 'Operator % (modulo) memberikan SISA hasil bagi. 17 dibagi 5 = 3 sisa 2. Jadi 17 % 5 = 2.'
        },
        {
          question: 'Apa perbedaan antara == dan =?',
          options: [
            'Tidak ada perbedaan',
            '== untuk assign, = untuk compare',
            '== untuk compare, = untuk assign',
            'Keduanya untuk compare'
          ],
          correctAnswer: 2,
          explanation: '== adalah operator perbandingan (cek apakah sama), = adalah assignment operator (assign nilai ke variabel). Jangan tertukar!'
        },
        {
          question: 'Apa hasil dari: True and False?',
          options: [
            'True',
            'False',
            'Error',
            'None'
          ],
          correctAnswer: 1,
          explanation: 'Operator AND hanya menghasilkan True jika KEDUA nilai adalah True. True and False = False.'
        },
        {
          question: 'Kapan operator OR menghasilkan True?',
          options: [
            'Hanya jika kedua nilai True',
            'Jika salah satu atau keduanya True',
            'Tidak pernah True',
            'Hanya jika kedua nilai False'
          ],
          correctAnswer: 1,
          explanation: 'Operator OR menghasilkan True jika SALAH SATU atau KEDUANYA True. Hanya False jika keduanya False.'
        }
      ]
    }
  },
  {
    id: 'conditions',
    title: 'Kondisi (If/Elif/Else)',
    description: 'Belajar membuat keputusan dalam kode dengan conditional statements',
    icon: '🔀',
    lessons: [
      {
        id: 'conditions-1',
        title: 'If Statement',
        content: `**Conditional Statement**
If statement memungkinkan program membuat keputusan berdasarkan kondisi tertentu.

**Struktur If:**
Gunakan if untuk menjalankan kode hanya jika kondisi terpenuhi.

**Penting:** Perhatikan indentasi (4 spasi atau 1 tab)! Python sangat strict soal ini.`,
        codeExamples: [
          {
            title: 'If Sederhana',
            code: `umur = 20

if umur >= 17:
    print("Anda sudah boleh punya SIM")

# Multiple conditions
nilai = 85

if nilai >= 80:
    print("Nilai bagus!")
    print("Pertahankan!")`,
            explanation: 'Kode di dalam if hanya dijalankan jika kondisi True. Perhatikan indentasi untuk menandai blok kode if.'
          },
          {
            title: 'If-Else',
            code: `password = "python123"
input_password = "python123"

if input_password == password:
    print("Login berhasil")
else:
    print("Password salah")

# Cek genap/ganjil
angka = 7

if angka % 2 == 0:
    print("Bilangan genap")
else:
    print("Bilangan ganjil")`,
            explanation: 'Else dijalankan jika kondisi if False. Hanya ada dua pilihan: True atau False.'
          }
        ],
        exercises: [
          {
            question: 'Buat program cek apakah angka positif atau negatif',
            starterCode: 'angka = -5\n# Cek apakah positif atau negatif\n',
            hint: 'Gunakan if angka >= 0 untuk positif, else untuk negatif',
            solution: 'angka = -5\nif angka >= 0:\n    print("Positif")\nelse:\n    print("Negatif")'
          }
        ]
      },
      {
        id: 'conditions-2',
        title: 'If-Elif-Else',
        content: `**Multiple Conditions**
Elif (else if) memungkinkan kita cek beberapa kondisi secara berurutan.

Gunakan elif untuk membuat multiple choices dalam program Anda.`,
        codeExamples: [
          {
            title: 'Grading System',
            code: `nilai = 85

if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
elif nilai >= 60:
    grade = "D"
else:
    grade = "E"

print("Nilai Anda:", grade)`,
            explanation: 'Python cek dari atas ke bawah. Begitu ada kondisi yang True, blok itu dijalankan dan yang lain di-skip.'
          }
        ],
        exercises: [
          {
            question: 'Buat sistem kategori suhu (Dingin < 20, Normal 20-30, Panas > 30)',
            starterCode: 'suhu = 25\n# Kategorikan suhu\n',
            hint: 'Gunakan if-elif-else untuk 3 kategori',
            solution: 'suhu = 25\nif suhu < 20:\n    print("Dingin")\nelif suhu <= 30:\n    print("Normal")\nelse:\n    print("Panas")'
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Apa yang terjadi jika kondisi if adalah False dan tidak ada else?',
          options: [
            'Error',
            'Kode di dalam if tetap dijalankan',
            'Kode di dalam if di-skip, program lanjut',
            'Program berhenti'
          ],
          correctAnswer: 2,
          explanation: 'Jika kondisi if False dan tidak ada else, Python simply skip blok if dan lanjut ke kode berikutnya. Tidak ada error.'
        },
        {
          question: 'Apa perbedaan antara elif dan else?',
          options: [
            'Tidak ada perbedaan',
            'elif perlu kondisi, else tidak',
            'else perlu kondisi, elif tidak',
            'elif dan else sama-sama perlu kondisi'
          ],
          correctAnswer: 1,
          explanation: 'elif memerlukan kondisi untuk di-cek (elif kondisi:), sedangkan else tidak (else:). Elif adalah "else if".'
        },
        {
          question: 'Berapa kali maksimal blok else bisa ada dalam satu if statement?',
          options: [
            'Tidak terbatas',
            '2 kali',
            '1 kali',
            '0 kali (opsional)'
          ],
          correctAnswer: 2,
          explanation: 'Hanya boleh ada SATU else dalam satu if statement, dan harus di paling akhir. Tapi elif bisa banyak.'
        },
        {
          question: 'Mengapa indentasi penting dalam if statement?',
          options: [
            'Hanya untuk keindahan kode',
            'Python tidak peduli indentasi',
            'Python menggunakan indentasi untuk menentukan blok kode',
            'Indentasi opsional'
          ],
          correctAnswer: 2,
          explanation: 'Indentasi adalah WAJIB dan menentukan mana kode yang masuk dalam blok if. Tanpa indentasi yang benar, Python akan error.'
        },
        {
          question: 'Apa output dari kode: x = 10, if x > 5: print("A"), elif x > 8: print("B")?',
          options: [
            'A',
            'B',
            'A B',
            'Tidak ada output'
          ],
          correctAnswer: 0,
          explanation: 'Output: A. Karena x > 5 adalah True, blok pertama dijalankan dan elif di-skip.'
        }
      ]
    }
  }
]

// Use BASE_MODULES as MODULES for now
const MODULES: LearningModule[] = BASE_MODULES

export default function Page() {
  const [userName, setUserName] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedModules: [],
    points: 0,
    badges: [],
    currentStreak: 0,
    quizScores: {},
    lastVisit: new Date().toISOString(),
    completedLessons: []
  })

  // Load progress dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem('pythonProgress')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUserProgress(parsed)
        
        // Update streak
        const lastVisit = new Date(parsed.lastVisit)
        const today = new Date()
        const dayDiff = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))
        
        if (dayDiff === 1) {
          // Consecutive day
          updateProgress({ currentStreak: parsed.currentStreak + 1 })
        } else if (dayDiff > 1) {
          // Streak broken
          updateProgress({ currentStreak: 1 })
        }
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
  }, [])

  // Simpan progress ke localStorage setiap kali berubah
  useEffect(() => {
    if (hasStarted) {
      localStorage.setItem('pythonProgress', JSON.stringify(userProgress))
    }
  }, [userProgress, hasStarted])

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await sdk.actions.ready()
        console.log("Farcaster SDK initialized")
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error)
      }
    }
    initializeFarcaster()
  }, [])

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({
      ...prev,
      ...updates,
      lastVisit: new Date().toISOString()
    }))
  }

  const completeLesson = (lessonId: string) => {
    if (!userProgress.completedLessons.includes(lessonId)) {
      const newPoints = userProgress.points + 50
      const newLessons = [...userProgress.completedLessons, lessonId]
      
      // Check for new badges
      const newBadges = [...userProgress.badges]
      if (newLessons.length === 1 && !newBadges.includes('first-steps')) {
        newBadges.push('first-steps')
      }
      if (newLessons.length >= 5 && !newBadges.includes('dedicated')) {
        newBadges.push('dedicated')
      }
      
      updateProgress({
        completedLessons: newLessons,
        points: newPoints,
        badges: newBadges
      })
    }
  }

  const completeModule = (moduleId: string) => {
    if (!userProgress.completedModules.includes(moduleId)) {
      const newPoints = userProgress.points + 100
      const newModules = [...userProgress.completedModules, moduleId]
      
      const newBadges = [...userProgress.badges]
      if (newModules.length === 1 && !newBadges.includes('module-master')) {
        newBadges.push('module-master')
      }
      if (newModules.length === 4 && !newBadges.includes('python-graduate')) {
        newBadges.push('python-graduate')
      }
      
      updateProgress({
        completedModules: newModules,
        points: newPoints,
        badges: newBadges
      })
    }
  }

  const completeQuiz = (moduleId: string, score: number) => {
    const newScores = { ...userProgress.quizScores, [moduleId]: score }
    const pointsEarned = Math.floor(score * 2) // Max 200 points for perfect quiz
    const newPoints = userProgress.points + pointsEarned
    
    const newBadges = [...userProgress.badges]
    if (score === 100 && !newBadges.includes('quiz-master')) {
      newBadges.push('quiz-master')
    }
    
    updateProgress({
      quizScores: newScores,
      points: newPoints,
      badges: newBadges
    })
  }

  const startLearning = () => {
    if (userName.trim()) {
      setHasStarted(true)
      localStorage.setItem('pythonUserName', userName)
    }
  }

  useEffect(() => {
    const savedName = localStorage.getItem('pythonUserName')
    if (savedName) {
      setUserName(savedName)
      setHasStarted(true)
    }
  }, [])

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Web3Background />
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-sm border-cyan-400/30 relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Python 101 – Dasar-dasar
            </CardTitle>
            <CardDescription className="text-gray-300">
              Mulai perjalanan belajar Python Anda dengan Web3 vibes! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userName" className="text-gray-200">Nama Anda</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="mt-1 bg-gray-800 border-cyan-400/30 text-white"
                onKeyDown={(e) => e.key === 'Enter' && startLearning()}
              />
            </div>
            <Button 
              onClick={startLearning} 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              disabled={!userName.trim()}
            >
              Mulai Belajar 🎯
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Web3Background />
      
      <div className="relative z-10 container mx-auto p-4 pt-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Python 101 – Dasar-dasar
          </h1>
          <p className="text-gray-300">Halo {userName}! Mari belajar Python dengan pendekatan Web3 🌐</p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Progress Tracker Sidebar */}
          <div className="lg:col-span-1">
            <ProgressTracker
              userProgress={userProgress}
              modules={MODULES}
              onResetProgress={() => {
                if (confirm('Reset semua progress? Tindakan ini tidak bisa dibatalkan!')) {
                  const resetProgress: UserProgress = {
                    completedModules: [],
                    points: 0,
                    badges: [],
                    currentStreak: 0,
                    quizScores: {},
                    lastVisit: new Date().toISOString(),
                    completedLessons: []
                  }
                  setUserProgress(resetProgress)
                  localStorage.setItem('pythonProgress', JSON.stringify(resetProgress))
                }
              }}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
              <CardContent className="p-6">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-gray-800/50 mb-6">
                    <TabsTrigger value="about" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      ℹ️ Tentang
                    </TabsTrigger>
                    <TabsTrigger value="modules" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      📚 Modul
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      💡 Saran
                    </TabsTrigger>
                    <TabsTrigger value="reference" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      📖 Referensi
                    </TabsTrigger>
                  </TabsList>

                  {/* About Tab */}
                  <TabsContent value="about">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-cyan-400 mb-4">🚀 Selamat Datang di Python 101!</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Platform pembelajaran Python interaktif dengan sentuhan Web3 yang modern. Pelajari fundamental Python dari nol hingga mahir!
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                          <h4 className="font-semibold text-cyan-400 mb-2">🎮 Gamifikasi</h4>
                          <p className="text-gray-400 text-sm">Sistem poin, badge, dan tracking progress yang memotivasi</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                          <h4 className="font-semibold text-purple-400 mb-2">💻 Code Editor</h4>
                          <p className="text-gray-400 text-sm">Praktek langsung dengan Python executor real-time</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
                          <h4 className="font-semibold text-green-400 mb-2">📚 Materi Lengkap</h4>
                          <p className="text-gray-400 text-sm">Tutorial, latihan, dan kuis untuk pemahaman optimal</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-semibold text-yellow-400 mb-2">🌐 Web3 Vibes</h4>
                          <p className="text-gray-400 text-sm">Interface modern dengan animasi blockchain</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 rounded-lg border border-cyan-400/30">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">🗺️ Cara Menggunakan</h3>
                        <ol className="space-y-2 text-gray-300">
                          <li><strong className="text-cyan-400">1.</strong> Pilih tab "📚 Modul" untuk memulai pembelajaran</li>
                          <li><strong className="text-cyan-400">2.</strong> Ikuti 3 tahap: Tutorial → Praktik → Kuis</li>
                          <li><strong className="text-cyan-400">3.</strong> Kumpulkan poin dan badge dengan menyelesaikan modul</li>
                          <li><strong className="text-cyan-400">4.</strong> Progress otomatis tersimpan, belajar sesuai tempo Anda!</li>
                        </ol>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg">
                        <h4 className="text-xl font-bold text-cyan-400 mb-2">Siap Memulai? 🚀</h4>
                        <p className="text-gray-300">Klik tab "Modul" dan mulai perjalanan Python Anda!</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Modules Tab */}
                  <TabsContent value="modules">
                    <ModuleLearning
                      modules={MODULES}
                      userProgress={userProgress}
                      onCompleteLesson={completeLesson}
                      onCompleteModule={completeModule}
                      onCompleteQuiz={completeQuiz}
                    />
                  </TabsContent>

                  {/* Suggestions Tab */}
                  <TabsContent value="suggestions">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-cyan-400">💡 Saran Pengembangan</h2>
                      
                      <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">Langkah Selanjutnya</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span><strong>Setelah modul dasar:</strong> Pelajari control flow (if, for, while)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span><strong>Data structures:</strong> Lists, dictionaries, tuples, sets</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span><strong>Functions:</strong> Buat kode yang reusable dengan functions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span><strong>File handling:</strong> Baca dan tulis file</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span><strong>OOP:</strong> Object-Oriented Programming dengan classes</span>
                          </li>
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
                          <h4 className="font-semibold text-green-400 mb-2">🌐 Web Development</h4>
                          <p className="text-gray-400 text-sm">Django, Flask, FastAPI untuk backend web</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
                          <h4 className="font-semibold text-blue-400 mb-2">📊 Data Science</h4>
                          <p className="text-gray-400 text-sm">Pandas, NumPy, Matplotlib untuk analisis data</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                          <h4 className="font-semibold text-purple-400 mb-2">🤖 AI & ML</h4>
                          <p className="text-gray-400 text-sm">TensorFlow, PyTorch, scikit-learn</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-semibold text-yellow-400 mb-2">⚙️ Automation</h4>
                          <p className="text-gray-400 text-sm">Selenium, BeautifulSoup untuk web scraping</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Reference Tab */}
                  <TabsContent value="reference">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-cyan-400">📖 Referensi Cepat Python</h2>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/20">
                          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Built-in Functions</h3>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <code className="text-green-400">print() - Tampilkan output</code>
                            <code className="text-green-400">input() - Terima input user</code>
                            <code className="text-green-400">type() - Cek tipe data</code>
                            <code className="text-green-400">len() - Panjang string/list</code>
                            <code className="text-green-400">int() - Konversi ke integer</code>
                            <code className="text-green-400">float() - Konversi ke float</code>
                            <code className="text-green-400">str() - Konversi ke string</code>
                            <code className="text-green-400">range() - Generate sequence</code>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                          <h3 className="text-lg font-semibold text-purple-400 mb-2">String Methods</h3>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <code className="text-purple-400">.upper() - UPPERCASE</code>
                            <code className="text-purple-400">.lower() - lowercase</code>
                            <code className="text-purple-400">.strip() - Hapus spasi</code>
                            <code className="text-purple-400">.split() - Pisah string</code>
                            <code className="text-purple-400">.replace() - Ganti teks</code>
                            <code className="text-purple-400">.find() - Cari substring</code>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20">
                          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Common Errors</h3>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div><code className="text-red-400">SyntaxError</code> - Typo atau format salah</div>
                            <div><code className="text-red-400">NameError</code> - Variabel belum didefinisikan</div>
                            <div><code className="text-red-400">TypeError</code> - Operasi tidak cocok dengan tipe data</div>
                            <div><code className="text-red-400">ValueError</code> - Nilai tidak valid untuk operasi</div>
                            <div><code className="text-red-400">IndentationError</code> - Indentasi salah</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
