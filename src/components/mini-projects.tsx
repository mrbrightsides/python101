'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { CodeEditor } from '@/components/code-editor'

export type MiniProject = {
  id: string
  title: string
  category: string
  description: string
  objective: string
  features: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  skills: string[]
  starter: string
  solution: string
  points: number
}

const projects: MiniProject[] = [
  {
    id: 'calculator',
    title: 'Simple Calculator',
    category: 'Math & Logic',
    description: 'Buat kalkulator sederhana yang bisa melakukan operasi aritmatika dasar',
    objective: 'Membangun kalkulator yang dapat menerima input dari user dan melakukan perhitungan.',
    features: [
      'Penjumlahan, pengurangan, perkalian, pembagian',
      'Input validation untuk mencegah error',
      'Menu untuk multiple calculations',
      'History perhitungan terakhir'
    ],
    difficulty: 'Beginner',
    estimatedTime: '30-45 menit',
    skills: ['Functions', 'Input/Output', 'Error Handling', 'Loops'],
    starter: `# Simple Calculator Project
# Buat kalkulator yang bisa melakukan operasi dasar

def add(x, y):
    # Implementasikan penjumlahan
    pass

def subtract(x, y):
    # Implementasikan pengurangan  
    pass

def multiply(x, y):
    # Implementasikan perkalian
    pass

def divide(x, y):
    # Implementasikan pembagian (handle divide by zero)
    pass

def calculator():
    print("=== Simple Calculator ===")
    print("Operations: +, -, *, /")
    print("Type 'quit' to exit")
    
    while True:
        # Implement calculator logic here
        pass

# Run calculator
if __name__ == "__main__":
    calculator()`,
    solution: `def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error: Cannot divide by zero!"
    return x / y

def calculator():
    print("=== Simple Calculator ===")
    print("Operations: +, -, *, /")
    print("Type 'quit' to exit")
    
    history = []
    
    while True:
        try:
            operation = input("\\nEnter operation (+, -, *, /) or 'quit': ").strip()
            
            if operation.lower() == 'quit':
                print("Thanks for using the calculator!")
                break
            
            if operation not in ['+', '-', '*', '/']:
                print("Invalid operation! Use +, -, *, /")
                continue
            
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
            
            if operation == '+':
                result = add(num1, num2)
            elif operation == '-':
                result = subtract(num1, num2)
            elif operation == '*':
                result = multiply(num1, num2)
            elif operation == '/':
                result = divide(num1, num2)
            
            calculation = f"{num1} {operation} {num2} = {result}"
            print(f"Result: {calculation}")
            history.append(calculation)
            
            if len(history) > 5:
                history = history[-5:]  # Keep last 5 calculations
                
        except ValueError:
            print("Invalid input! Please enter valid numbers.")
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    calculator()`,
    points: 150
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    category: 'Security & Utility',
    description: 'Generator password yang aman dengan berbagai opsi customization',
    objective: 'Membuat tool yang bisa generate password kuat dengan kriteria yang bisa disesuaikan.',
    features: [
      'Customizable password length',
      'Include/exclude uppercase, lowercase, numbers, symbols',
      'Password strength indicator',
      'Generate multiple passwords sekaligus',
      'Copy-friendly output format'
    ],
    difficulty: 'Intermediate',
    estimatedTime: '45-60 menit',
    skills: ['Random module', 'String manipulation', 'Functions', 'User input validation'],
    starter: `# Password Generator Project
import random
import string

def generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols):
    # Implement password generation logic
    pass

def check_password_strength(password):
    # Implement password strength checker
    pass

def password_generator():
    print("=== Secure Password Generator ===")
    
    while True:
        # Implement main program logic
        pass

# Run password generator
if __name__ == "__main__":
    password_generator()`,
    solution: `import random
import string

def generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols):
    characters = ""
    
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if not characters:
        return "Error: No character types selected!"
    
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def check_password_strength(password):
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Use at least 8 characters")
    
    if any(c.islower() for c in password):
        score += 1
    else:
        feedback.append("Add lowercase letters")
    
    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("Add uppercase letters")
    
    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("Add numbers")
    
    if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        score += 1
    else:
        feedback.append("Add symbols")
    
    strength_levels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    strength = strength_levels[min(score, 4)]
    
    return strength, feedback

def password_generator():
    print("=== Secure Password Generator ===")
    
    while True:
        try:
            print("\\n--- Configuration ---")
            length = int(input("Password length (minimum 4): "))
            if length < 4:
                print("Password too short! Minimum 4 characters.")
                continue
            
            print("\\nCharacter types to include:")
            use_lowercase = input("Lowercase letters (a-z)? [Y/n]: ").lower() != 'n'
            use_uppercase = input("Uppercase letters (A-Z)? [Y/n]: ").lower() != 'n'
            use_numbers = input("Numbers (0-9)? [Y/n]: ").lower() != 'n'
            use_symbols = input("Symbols (!@#$...)? [Y/n]: ").lower() != 'n'
            
            count = int(input("How many passwords to generate? [1]: ") or "1")
            
            print(f"\\n--- Generated Passwords ---")
            for i in range(count):
                password = generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols)
                if password.startswith("Error"):
                    print(password)
                    break
                
                strength, feedback = check_password_strength(password)
                print(f"{i+1:2d}. {password} [{strength}]")
            
            if not password.startswith("Error"):
                print(f"\\n--- Password Analysis ---")
                strength, feedback = check_password_strength(password)
                print(f"Strength: {strength}")
                if feedback:
                    print("Suggestions:", ", ".join(feedback))
            
            continue_gen = input("\\nGenerate more passwords? [y/N]: ").lower()
            if continue_gen != 'y':
                print("Thanks for using Password Generator!")
                break
                
        except ValueError:
            print("Invalid input! Please enter valid numbers.")
        except KeyboardInterrupt:
            print("\\nGoodbye!")
            break

if __name__ == "__main__":
    password_generator()`,
    points: 200
  },
  {
    id: 'todo-manager',
    title: 'Todo List Manager',
    category: 'Productivity',
    description: 'Aplikasi manajemen task dengan fitur CRUD dan persistence',
    objective: 'Membuat aplikasi todo list yang bisa menyimpan, mengubah, dan mengelola tasks.',
    features: [
      'Add, view, edit, delete tasks',
      'Mark tasks as complete/incomplete',
      'Priority levels (High, Medium, Low)',
      'Due date tracking',
      'Save to file and load on startup'
    ],
    difficulty: 'Advanced',
    estimatedTime: '60-90 menit',
    skills: ['File I/O', 'JSON handling', 'DateTime', 'Class/Objects', 'Data structures'],
    starter: `# Todo List Manager Project
import json
from datetime import datetime, timedelta

class TodoManager:
    def __init__(self):
        self.todos = []
        self.filename = "todos.json"
        # Load existing todos
        pass
    
    def add_todo(self, task, priority="Medium", due_date=None):
        # Implement add functionality
        pass
    
    def view_todos(self):
        # Implement view functionality
        pass
    
    def complete_todo(self, todo_id):
        # Implement complete functionality
        pass
    
    def delete_todo(self, todo_id):
        # Implement delete functionality
        pass
    
    def save_todos(self):
        # Implement save to file
        pass
    
    def load_todos(self):
        # Implement load from file
        pass

def main():
    todo_manager = TodoManager()
    
    while True:
        print("\\n=== Todo List Manager ===")
        print("1. Add Task")
        print("2. View Tasks") 
        print("3. Complete Task")
        print("4. Delete Task")
        print("5. Quit")
        
        # Implement main menu logic
        pass

if __name__ == "__main__":
    main()`,
    solution: `import json
from datetime import datetime, timedelta

class TodoManager:
    def __init__(self):
        self.todos = []
        self.filename = "todos.json"
        self.load_todos()
    
    def add_todo(self, task, priority="Medium", due_date=None):
        todo = {
            "id": len(self.todos) + 1,
            "task": task,
            "priority": priority,
            "due_date": due_date,
            "completed": False,
            "created_at": datetime.now().isoformat()
        }
        self.todos.append(todo)
        self.save_todos()
        print(f"✅ Added task: {task}")
    
    def view_todos(self):
        if not self.todos:
            print("📝 No tasks found!")
            return
        
        print(f"\\n📋 Your Tasks ({len(self.todos)} total):")
        print("-" * 80)
        
        # Sort by priority and completion status
        priorities = {"High": 3, "Medium": 2, "Low": 1}
        sorted_todos = sorted(self.todos, key=lambda x: (x["completed"], -priorities.get(x["priority"], 2)))
        
        for todo in sorted_todos:
            status = "✅" if todo["completed"] else "⏳"
            priority_emoji = {"High": "🔴", "Medium": "🟡", "Low": "🟢"}
            
            due_info = ""
            if todo["due_date"]:
                due_date = datetime.fromisoformat(todo["due_date"])
                days_left = (due_date - datetime.now()).days
                if days_left < 0:
                    due_info = f"(⚠️  Overdue by {abs(days_left)} days)"
                elif days_left == 0:
                    due_info = f"(🔥 Due today!)"
                else:
                    due_info = f"(📅 Due in {days_left} days)"
            
            print(f"{todo['id']:2d}. {status} {priority_emoji[todo['priority']]} {todo['task']} {due_info}")
    
    def complete_todo(self, todo_id):
        for todo in self.todos:
            if todo["id"] == todo_id:
                todo["completed"] = True
                self.save_todos()
                print(f"✅ Completed: {todo['task']}")
                return
        print("❌ Task not found!")
    
    def delete_todo(self, todo_id):
        self.todos = [todo for todo in self.todos if todo["id"] != todo_id]
        # Reassign IDs
        for i, todo in enumerate(self.todos, 1):
            todo["id"] = i
        self.save_todos()
        print("🗑️  Task deleted!")
    
    def save_todos(self):
        try:
            with open(self.filename, 'w') as f:
                json.dump(self.todos, f, indent=2)
        except Exception as e:
            print(f"Error saving todos: {e}")
    
    def load_todos(self):
        try:
            with open(self.filename, 'r') as f:
                self.todos = json.load(f)
        except FileNotFoundError:
            print("📝 Starting with empty todo list")
        except Exception as e:
            print(f"Error loading todos: {e}")

def main():
    todo_manager = TodoManager()
    
    while True:
        print("\\n=== 📋 Todo List Manager ===")
        print("1. ➕ Add Task")
        print("2. 📄 View Tasks") 
        print("3. ✅ Complete Task")
        print("4. 🗑️  Delete Task")
        print("5. 🚪 Quit")
        
        try:
            choice = input("\\nChoose an option (1-5): ").strip()
            
            if choice == '1':
                task = input("Enter task: ").strip()
                if not task:
                    print("❌ Task cannot be empty!")
                    continue
                
                priority = input("Priority (High/Medium/Low) [Medium]: ").strip() or "Medium"
                if priority not in ["High", "Medium", "Low"]:
                    priority = "Medium"
                
                due_input = input("Due date (YYYY-MM-DD) [optional]: ").strip()
                due_date = None
                if due_input:
                    try:
                        due_date = datetime.strptime(due_input, "%Y-%m-%d").isoformat()
                    except ValueError:
                        print("⚠️  Invalid date format, no due date set")
                
                todo_manager.add_todo(task, priority, due_date)
            
            elif choice == '2':
                todo_manager.view_todos()
            
            elif choice == '3':
                todo_manager.view_todos()
                if todo_manager.todos:
                    try:
                        todo_id = int(input("Enter task ID to complete: "))
                        todo_manager.complete_todo(todo_id)
                    except ValueError:
                        print("❌ Invalid ID!")
            
            elif choice == '4':
                todo_manager.view_todos()
                if todo_manager.todos:
                    try:
                        todo_id = int(input("Enter task ID to delete: "))
                        confirm = input("Are you sure? (y/N): ").lower()
                        if confirm == 'y':
                            todo_manager.delete_todo(todo_id)
                    except ValueError:
                        print("❌ Invalid ID!")
            
            elif choice == '5':
                print("👋 Goodbye! Your tasks are saved.")
                break
            
            else:
                print("❌ Invalid choice! Please select 1-5.")
                
        except KeyboardInterrupt:
            print("\\n👋 Goodbye! Your tasks are saved.")
            break
        except Exception as e:
            print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    main()`,
    points: 300
  }
]

type MiniProjectsProps = {
  onComplete: (projectId: string, points: number) => void
  completedProjects: string[]
}

export function MiniProjects({ onComplete, completedProjects }: MiniProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<string>('calculator')

  const currentProject = projects.find(p => p.id === selectedProject)!
  const isCompleted = completedProjects.includes(selectedProject)

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-400/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-400/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30'
    }
  }

  const completedCount = completedProjects.length
  const totalProjects = projects.length
  const progressPercentage = (completedCount / totalProjects) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🛠️ Mini Projects
              </CardTitle>
              <CardDescription className="text-gray-300">
                Build real applications and strengthen your Python skills!
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 font-semibold">{completedCount}/{totalProjects} Completed</p>
              <Progress value={progressPercentage} className="w-24 mt-1" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Project Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedProject === project.id 
                ? 'bg-cyan-500/20 border-cyan-400' 
                : 'bg-black/60 border-gray-600 hover:border-cyan-400/50'
            }`}
            onClick={() => setSelectedProject(project.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getDifficultyColor(project.difficulty)}>
                  {project.difficulty}
                </Badge>
                {completedProjects.includes(project.id) && (
                  <span className="text-green-400">✓</span>
                )}
              </div>
              <h3 className="font-semibold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-purple-400 mb-2">{project.category}</p>
              <p className="text-sm text-gray-300 mb-3">{project.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-cyan-400">{project.estimatedTime}</span>
                <span className="text-yellow-400 font-semibold">{project.points} pts</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Project Details */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-400 flex items-center gap-3">
                {currentProject.title}
                <Badge className={getDifficultyColor(currentProject.difficulty)}>
                  {currentProject.difficulty}
                </Badge>
                {isCompleted && <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Completed ✓</Badge>}
              </CardTitle>
              <p className="text-purple-400 text-sm mt-1">{currentProject.category}</p>
              <CardDescription className="text-gray-300 mt-2">
                {currentProject.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 font-bold text-lg">{currentProject.points} points</p>
              <p className="text-gray-400 text-sm">{currentProject.estimatedTime}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                📋 Overview
              </TabsTrigger>
              <TabsTrigger value="starter" className="data-[state=active]:bg-cyan-500/20">
                🚀 Starter Code
              </TabsTrigger>
              <TabsTrigger value="solution" className="data-[state=active]:bg-cyan-500/20">
                💡 Solution
              </TabsTrigger>
              <TabsTrigger value="build" className="data-[state=active]:bg-cyan-500/20">
                🛠️ Build
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-2">🎯 Project Objective:</h4>
                  <p className="text-gray-300">{currentProject.objective}</p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">✨ Features to Implement:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {currentProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-semibold mb-2">🧠 Skills You'll Practice:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-cyan-400/30 text-cyan-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="starter" className="mt-4">
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-400/30 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">🚀 Starter Template:</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Use this template as your starting point. Fill in the missing functions and logic.
                  </p>
                </div>
                <CodeEditor 
                  initialCode={currentProject.starter}
                  exercises={[
                    'Analyze the starter code structure',
                    'Implement the missing functions',
                    'Test each feature as you build it',
                    'Add error handling and user-friendly messages'
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="solution" className="mt-4">
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3">💡 Complete Solution:</h4>
                  <p className="text-gray-300 mb-3">
                    ⚠️ Try implementing the project yourself first! Learning happens through struggle and discovery.
                  </p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg max-h-96 overflow-auto">
                  <pre className="text-green-400 text-xs whitespace-pre-wrap">
                    <code>{currentProject.solution}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="build" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-3">🛠️ Ready to Build?</h4>
                  <p className="text-gray-300 mb-4">
                    Follow these steps to complete your project:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                    <li>Study the project overview and understand the requirements</li>
                    <li>Start with the starter code template</li>
                    <li>Implement features one by one, test as you go</li>
                    <li>Add error handling and improve user experience</li>
                    <li>Compare with the solution (only after trying!)</li>
                    <li>Mark as completed to earn points</li>
                  </ol>
                </div>
                
                <div className="flex gap-3">
                  {!isCompleted ? (
                    <Button 
                      onClick={() => onComplete(currentProject.id, currentProject.points)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      🎯 Mark as Completed (+{currentProject.points} points)
                    </Button>
                  ) : (
                    <Button disabled className="bg-gray-600">
                      ✅ Project Completed!
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10"
                  >
                    📤 Share Your Project
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}