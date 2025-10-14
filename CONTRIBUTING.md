# 🤝 Contributing to Python 101 – Dasar-dasar

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini akan membantu Anda memulai.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Cara Berkontribusi](#cara-berkontribusi)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

Project ini mengadopsi code of conduct untuk memastikan lingkungan yang welcome untuk semua kontributor:

- ✅ Gunakan bahasa yang ramah dan inklusif
- ✅ Hormati sudut pandang dan pengalaman berbeda
- ✅ Terima kritik konstruktif dengan lapang dada
- ✅ Fokus pada apa yang terbaik untuk komunitas
- ❌ Jangan gunakan bahasa atau imagery yang tidak pantas
- ❌ Jangan melakukan trolling, insulting, atau harassment

---

## 🚀 Cara Berkontribusi

Ada banyak cara untuk berkontribusi:

### 1. 🐛 Melaporkan Bug

Jika menemukan bug, buat issue dengan:
- Deskripsi jelas tentang masalahnya
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (jika applicable)
- Environment info (browser, OS, dll)

### 2. 💡 Mengusulkan Fitur

Buat issue dengan label "enhancement":
- Deskripsi fitur yang diusulkan
- Use case atau problem yang diselesaikan
- Mockups atau examples (jika ada)

### 3. 📝 Improve Dokumentasi

- Perbaiki typo atau grammar
- Tambah penjelasan yang lebih jelas
- Buat tutorial atau guides
- Translate ke bahasa lain

### 4. 💻 Kontribusi Kode

- Fix bugs yang ada di issues
- Implement fitur baru
- Improve performance
- Add tests
- Refactor code

### 5. 📚 Kontribusi Konten Pembelajaran

- Tambah modul baru
- Improve materi existing
- Tambah contoh kode
- Buat quiz questions

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- Git

### Local Setup

```bash
# 1. Fork repository di GitHub

# 2. Clone fork Anda
git clone https://github.com/mrbrightsides/python101.git
cd python-101-dasar-dasar

# 3. Add upstream remote
git remote add upstream https://github.com/mrbrightsides/python101.git

# 4. Install dependencies
npm install

# 5. Buat branch baru
git checkout -b feature/nama-fitur

# 6. Run development server
npm run dev

# 7. Buka http://localhost:3000
```

### Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 📏 Coding Standards

### TypeScript

- ✅ Gunakan **strict typing** - no implicit `any`
- ✅ Define interfaces untuk object types
- ✅ Use `type` imports: `import type { Foo } from 'bar'`
- ✅ Proper error handling dengan try/catch

### React Components

- ✅ Use functional components dengan hooks
- ✅ Proper prop typing dengan interfaces
- ✅ Use client components (`'use client'`) jika perlu state/effects
- ✅ Extract reusable logic ke custom hooks

### Styling

- ✅ Gunakan Tailwind CSS utility classes
- ✅ Follow existing color scheme (cyan/purple Web3 theme)
- ✅ Ensure responsive design (mobile-first)
- ✅ Test di multiple screen sizes

### File Organization

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   └── ui/          # Reusable UI components
└── lib/             # Utility functions
```

### Code Quality

```bash
# Run TypeScript type checking
npm run build

# Format code (jika ada prettier setup)
npm run format

# Lint code (jika ada eslint setup)
npm run lint
```

---

## 📝 Commit Guidelines

Gunakan **conventional commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting, missing semicolons, dll
- `refactor`: Code refactoring
- `test`: Tambah atau update tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(modules): add string manipulation module

- Add lesson about string methods
- Include 5 quiz questions
- Add practice exercises

fix(quiz): correct answer validation logic

The quiz was not properly validating answers with special characters.
This commit adds proper escaping.

Fixes #123
```

### Best Practices

- ✅ Use present tense ("add" not "added")
- ✅ Use imperative mood ("move" not "moves")
- ✅ Limit first line to 72 characters
- ✅ Reference issues: "Fixes #123" atau "Closes #456"

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Update dokumentasi jika perlu
2. ✅ Run `npm run build` untuk check TypeScript errors
3. ✅ Test fitur secara manual di browser
4. ✅ Ensure responsive design works
5. ✅ Check console untuk errors

### Submitting PR

1. **Push ke branch Anda**
   ```bash
   git push origin feature/nama-fitur
   ```

2. **Buat Pull Request di GitHub**
   - Clear title yang describe changes
   - Detailed description tentang what & why
   - Screenshots atau GIFs (jika UI changes)
   - Link ke related issues

3. **Template PR** (gunakan ini):
   ```markdown
   ## 📋 Description
   Brief description of changes

   ## 🎯 Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## ✅ Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Commented complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   - [ ] Tested on multiple browsers

   ## 📸 Screenshots
   (if applicable)

   ## 🔗 Related Issues
   Fixes #123
   ```

### Review Process

- Maintainers akan review PR Anda
- Mungkin ada request untuk changes
- Respond to feedback dengan update
- Setelah approved, PR akan di-merge

### After Merge

- Delete branch Anda (optional)
- Update local repo:
  ```bash
  git checkout main
  git pull upstream main
  ```

---

## 🎨 Menambah Modul Pembelajaran

Jika ingin menambah modul baru, ikuti struktur ini:

```typescript
{
  id: 7, // Next available ID
  title: "Judul Modul",
  icon: "📚", // Emoji yang relevan
  description: "Deskripsi singkat modul",
  lessons: [
    {
      title: "Nama Pelajaran 1",
      content: `
        ## Heading

        Penjelasan dengan markdown.

        \`\`\`python
        # Contoh kode
        print("Hello World")
        \`\`\`
      `,
      code: "# Starter code untuk editor\nprint('Hello')",
      exercise: "Tugas: Modifikasi code untuk..."
    },
    {
      title: "Nama Pelajaran 2",
      // ... struktur sama
    }
  ],
  quiz: [
    {
      question: "Pertanyaan quiz?",
      options: [
        "Pilihan A",
        "Pilihan B", 
        "Pilihan C",
        "Pilihan D"
      ],
      correct: 0, // Index jawaban benar (0-3)
      explanation: "Penjelasan kenapa jawaban ini benar..."
    },
    // Minimal 5 soal per modul
  ]
}
```

---

## 💬 Komunikasi

- **GitHub Issues**: Bug reports & feature requests
- **Pull Requests**: Code discussions
- **Discussions**: General questions & ideas

---

## 🙏 Thank You!

Setiap kontribusi, sekecil apapun, sangat berarti untuk project ini. Terima kasih telah menjadi bagian dari komunitas Python 101! 🎉

---

<div align="center">

**Happy Coding! 🐍💙**

</div>
