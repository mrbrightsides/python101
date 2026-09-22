'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

type StudyNote = {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
  favorite: boolean
}

type StudyNotesProps = {
  userName: string
}

export function StudyNotes({ userName }: StudyNotesProps) {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  
  // Form state
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [category, setCategory] = useState<string>('General')

  const categories = ['General', 'Syntax', 'Functions', 'Data Types', 'Control Flow', 'Debugging', 'Tips & Tricks']

  useEffect(() => {
    const savedNotes = localStorage.getItem('pythonStudyNotes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (newNotes: StudyNote[]): void => {
    setNotes(newNotes)
    localStorage.setItem('pythonStudyNotes', JSON.stringify(newNotes))
  }

  const createNote = (): void => {
    if (!title.trim() || !content.trim()) return

    const newNote: StudyNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false
    }

    saveNotes([newNote, ...notes])
    resetForm()
    setIsCreating(false)
  }

  const updateNote = (): void => {
    if (!editingNote || !title.trim() || !content.trim()) return

    const updatedNote = {
      ...editingNote,
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category,
      updatedAt: new Date().toISOString()
    }

    const updatedNotes = notes.map(note => 
      note.id === editingNote.id ? updatedNote : note
    )

    saveNotes(updatedNotes)
    resetForm()
    setEditingNote(null)
  }

  const deleteNote = (id: string): void => {
    const updatedNotes = notes.filter(note => note.id !== id)
    saveNotes(updatedNotes)
    setDeleteConfirm(null)
  }

  const toggleFavorite = (id: string): void => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    )
    saveNotes(updatedNotes)
  }

  const resetForm = (): void => {
    setTitle('')
    setContent('')
    setTags('')
    setCategory('General')
  }

  const startEdit = (note: StudyNote): void => {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.content)
    setTags(note.tags.join(', '))
    setCategory(note.category)
    setIsCreating(true)
  }

  const cancelEdit = (): void => {
    setEditingNote(null)
    setIsCreating(false)
    resetForm()
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory
    const matchesFavorite = !showFavorites || note.favorite
    
    return matchesSearch && matchesCategory && matchesFavorite
  })

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'General': 'bg-gray-500/20 text-gray-400 border-gray-400/30',
      'Syntax': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'Functions': 'bg-green-500/20 text-green-400 border-green-400/30',
      'Data Types': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Control Flow': 'bg-red-500/20 text-red-400 border-red-400/30',
      'Debugging': 'bg-orange-500/20 text-orange-400 border-orange-400/30',
      'Tips & Tricks': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-400/30'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                📝 Study Notes
              </CardTitle>
              <CardDescription className="text-gray-300">
                Personal notes untuk {userName} - Catat dan organize pembelajaran Python Anda
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 font-semibold">{notes.length} notes</p>
              <p className="text-purple-400 text-sm">{notes.filter(n => n.favorite).length} favorites</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Create/Edit Note */}
      {isCreating && (
        <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">
              {editingNote ? '✏️ Edit Note' : '📝 Create New Note'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-200 text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="mt-1 bg-gray-800 border-cyan-400/30 text-white"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-200 text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 p-2 bg-gray-800 border border-cyan-400/30 rounded text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-gray-200 text-sm font-medium">Tags (comma separated)</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="python, basics, syntax"
                  className="mt-1 bg-gray-800 border-cyan-400/30 text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="text-gray-200 text-sm font-medium">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes here... You can include code examples, explanations, tips, etc."
                className="mt-1 bg-gray-800 border-cyan-400/30 text-white min-h-32"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={editingNote ? updateNote : createNote}
                disabled={!title.trim() || !content.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {editingNote ? '💾 Update Note' : '📝 Create Note'}
              </Button>
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="bg-black/60 backdrop-blur-sm border-gray-600">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search notes by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-cyan-400/30 text-white"
                />
              </div>
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                📝 New Note
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-cyan-500 text-white' : 'border-gray-500 text-gray-300'}
              >
                All Categories
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-cyan-500 text-white' : 'border-gray-500 text-gray-300'}
                >
                  {cat}
                </Button>
              ))}
              <Button
                variant={showFavorites ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavorites(!showFavorites)}
                className={showFavorites ? 'bg-yellow-500 text-white' : 'border-gray-500 text-gray-300'}
              >
                ⭐ Favorites
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <Card className="bg-black/60 backdrop-blur-sm border-gray-600">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400">
              {notes.length === 0 ? (
                <div>
                  <p className="text-lg mb-2">📝 No notes yet!</p>
                  <p className="mb-4">Start creating your first study note to organize your Python learning journey.</p>
                  <Button 
                    onClick={() => setIsCreating(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    Create First Note
                  </Button>
                </div>
              ) : (
                <div>
                  <p>No notes match your search criteria</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setShowFavorites(false)
                    }}
                    variant="outline"
                    className="mt-4 border-cyan-400/50 text-cyan-400"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="bg-black/60 backdrop-blur-sm border-gray-600 hover:border-cyan-400/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-cyan-400 text-lg line-clamp-2">
                      {note.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoryColor(note.category)}>
                        {note.category}
                      </Badge>
                      {note.favorite && (
                        <span className="text-yellow-400">⭐</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-500 text-gray-400 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm line-clamp-4 mb-4">
                  {note.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {note.createdAt !== note.updatedAt ? 'Updated' : 'Created'}: {formatDate(note.updatedAt)}
                  </span>
                </div>
                
                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(note)}
                    className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFavorite(note.id)}
                    className={`border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 ${
                      note.favorite ? 'bg-yellow-400/10' : ''
                    }`}
                  >
                    {note.favorite ? '⭐' : '☆'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteConfirm(note.id)}
                    className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                  >
                    🗑️
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent className="bg-black/90 border-red-400/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">🗑️ Delete Note</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to delete this note? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-500 text-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirm && deleteNote(deleteConfirm)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}