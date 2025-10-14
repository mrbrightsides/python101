# 🐍 Python 101 – Dasar-dasar

<div align="center">

**Platform Pembelajaran Python Interaktif dengan Web3 Vibes**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Pyodide](https://img.shields.io/badge/Pyodide-Enabled-green?style=flat)](https://pyodide.org/)

[Demo](https://python101.elpeef.com/) · [Dokumentasi](#dokumentasi) · [Kontribusi](#kontribusi)

</div>

---

## 📖 Tentang Project

**Python 101 – Dasar-dasar** adalah platform pembelajaran interaktif yang dirancang khusus untuk pemula yang ingin menguasai fundamental Python programming. Dengan desain modern bergaya Web3, gamifikasi yang menarik, dan code editor yang menjalankan Python **real** di browser, aplikasi ini membuat belajar coding menjadi menyenangkan dan efektif.

### ✨ Kenapa Python 101?

- 🎯 **Fokus untuk Pemula** - Materi disusun step-by-step dari nol
- 💻 **Code Editor Real** - Jalankan Python langsung di browser dengan Pyodide
- 🎮 **Gamifikasi** - Sistem poin, badge, dan level untuk motivasi belajar
- 🌐 **Bahasa Indonesia** - Penjelasan lengkap dalam bahasa yang mudah dipahami
- 🎨 **Web3 Design** - Interface modern dengan animated background
- 💾 **Auto-Save** - Progress otomatis tersimpan dengan localStorage

---

## 🚀 Fitur Utama

### 📚 Modul Pembelajaran Lengkap

Aplikasi ini menyediakan **6 modul fundamental Python**:

1. **Sintaks Python** - Print statement, komentar, dan indentasi
2. **Variabel & Tipe Data** - String, integer, float, boolean
3. **Input & Output** - Fungsi input(), print(), dan f-strings
4. **Operator & Ekspresi** - Aritmatika, perbandingan, logika
5. **Kondisi (If/Elif/Else)** - Conditional statements
6. **Perulangan (Loops)** - For dan while loops

Setiap modul dilengkapi dengan:
- 📖 Tutorial komprehensif dengan contoh kode
- ✍️ Praktik coding dengan editor interaktif
- 📝 Kuis 5 soal dengan penjelasan detail

### 💻 Code Editor Interaktif

- **Real Python Execution** - Powered by Pyodide
- **Syntax Highlighting** - Kode mudah dibaca
- **Keyboard Shortcuts** - Ctrl+Enter untuk run code
- **Error Handling** - Pesan error yang jelas
- **Reset Button** - Kembali ke starter code

### 🎮 Sistem Gamifikasi

**Tracking Progress:**
- 📊 Progress bar per modul
- 🔥 Streak counter untuk konsistensi
- 📈 Level system (Pemula → Python Master)
- 💯 Total poin dan statistik pembelajaran

**Achievement Badges:**
- 🌟 **Langkah Pertama** - Selesai pelajaran pertama
- 🔥 **Dedicated Learner** - Selesai 5+ pelajaran
- 🏆 **Quiz Master** - Quiz dengan skor perfect
- 🎖️ **Module Master** - Selesai modul pertama
- ⚡ **Python Graduate** - Selesai semua modul

### 📝 Sistem Kuis Interaktif

- Multiple choice questions
- Navigation next/previous
- Visual progress indicators
- Instant scoring dan grading
- Review mode dengan penjelasan
- Retake untuk improve score
- Best score tracking

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework untuk UI |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Pyodide** | Python runtime di browser |
| **shadcn/ui** | UI component library |
| **Lucide React** | Icon library |
| **localStorage** | Client-side data persistence |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ dan npm/yarn
- Git

### Setup Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/mrbrightsides/python101.git
   cd python-101-dasar-dasar
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
npm run build
npm start
```

---

## 📁 Struktur Project

```
python-101-dasar-dasar/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main app dengan modul
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── AnimatedBackground.tsx  # Web3 particle effect
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── README.md                   # Dokumentasi ini
├── package.json                # Dependencies
└── tsconfig.json              # TypeScript config
```

---

## 🎯 Cara Penggunaan

### Untuk Learner (Pengguna)

1. **Welcome Screen**
   - Masukkan nama Anda
   - Klik "Mulai Belajar"

2. **Pilih Modul**
   - Mulai dari Modul 1 (Sintaks Python)
   - Modul selanjutnya unlock setelah menyelesaikan modul sebelumnya

3. **Belajar dengan 3 Tab**
   - **Tutorial**: Baca penjelasan dan contoh kode
   - **Praktik**: Tulis dan jalankan kode Python
   - **Kuis**: Test pemahaman dengan 5 soal

4. **Track Progress**
   - Lihat progress di sidebar kiri
   - Kumpulkan poin dan unlock badges
   - Level up dari Pemula ke Python Master

### Untuk Developer (Kontributor)

**Menambah Modul Baru:**

Edit `src/app/page.tsx` dan tambahkan object modul baru ke array `BASE_MODULES`:

```typescript
{
  id: 7,
  title: "Nama Modul Baru",
  icon: "📚",
  description: "Deskripsi singkat",
  lessons: [
    {
      title: "Pelajaran 1",
      content: "Konten markdown atau JSX",
      code: "# Contoh kode\nprint('Hello')",
      exercise: "Tugas untuk user"
    }
  ],
  quiz: [
    {
      question: "Pertanyaan quiz?",
      options: ["A", "B", "C", "D"],
      correct: 0,
      explanation: "Penjelasan jawaban"
    }
  ]
}
```

**Customize Styling:**

Edit `src/app/globals.css` untuk mengubah tema warna atau animasi.

---

## 🗺️ Roadmap

### ✅ Fase 1 - Completed
- [x] 6 modul pembelajaran dasar
- [x] Code editor dengan Pyodide
- [x] Sistem kuis interaktif
- [x] Progress tracking & gamifikasi
- [x] LocalStorage persistence
- [x] Web3 animated background

### 🔜 Fase 2 - Planned
- [ ] 10+ modul tambahan (String manipulation, List, Dict, Functions, OOP)
- [ ] Code challenges dengan auto-grading
- [ ] Mini projects dengan starter code
- [ ] Python reference & cheatsheet
- [ ] Study notes dengan markdown support

### 💡 Fase 3 - Future Ideas
- [ ] Leaderboard system
- [ ] Social sharing features
- [ ] AI learning assistant
- [ ] Certificate generation
- [ ] PWA support untuk offline mode
- [ ] Multi-language support (English)
- [ ] Dark/light mode toggle

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Baik itu bug fixes, feature requests, atau improvement ideas.

### Cara Berkontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Contribution Guidelines

- Pastikan code pass TypeScript type checking
- Follow existing code style dan conventions
- Tambahkan komentar untuk logic yang kompleks
- Test fitur baru sebelum submit PR

---

## 🐛 Bug Reports & Feature Requests

Gunakan [GitHub Issues](https://github.com/mrbrightsides/python101/issues) untuk:
- 🐛 Melaporkan bug
- 💡 Mengusulkan fitur baru
- 📝 Memberi feedback atau saran

---

## 📄 License

Project ini menggunakan [MIT License](LICENSE) - silakan gunakan, modifikasi, dan distribute secara bebas.

---

## 👨‍💻 Author

Dibuat dengan ❤️ untuk komunitas belajar Python Indonesia

**Modu AI** - Your friendly AI builder companion

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Pyodide](https://pyodide.org/) - Python in the browser
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Icon library
- Semua kontributor yang telah membantu project ini

---

## 📞 Support

Jika Anda memiliki pertanyaan atau butuh bantuan:

- 📧 Email: support@elpeef.com

---

<div align="center">

**⭐ Star project ini jika bermanfaat! ⭐**

Powered by Base ⚡

</div>
