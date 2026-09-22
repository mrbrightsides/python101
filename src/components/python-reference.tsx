'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

type ReferenceItem = {
  id: string
  title: string
  category: string
  description: string
  syntax: string
  example: string
  parameters?: string[]
  returns?: string
  notes?: string[]
}

const referenceData: ReferenceItem[] = [
  // Built-in Functions
  {
    id: 'print',
    title: 'print()',
    category: 'Built-in Functions',
    description: 'Prints objects to stdout with optional formatting',
    syntax: 'print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False)',
    example: `print("Hello, World!")
print("Name:", "Alice", "Age:", 25)
print("A", "B", "C", sep="-")  # A-B-C
print("Loading", end="...")     # No newline`,
    parameters: ['*objects: Values to print', 'sep: Separator between values', 'end: String appended after last value', 'file: Output stream', 'flush: Force flush buffer'],
    returns: 'None',
    notes: ['Default separator is space', 'Default end character is newline', 'Use end="" to avoid newline']
  },
  {
    id: 'input',
    title: 'input()',
    category: 'Built-in Functions',
    description: 'Reads a line from input, converts it to string',
    syntax: 'input(prompt="")',
    example: `name = input("Enter your name: ")
age = int(input("Enter your age: "))
choice = input("Continue? (y/n): ").lower()`,
    parameters: ['prompt: String printed before reading input'],
    returns: 'str: User input as string',
    notes: ['Always returns string', 'Remove trailing newline', 'Convert to other types as needed']
  },
  {
    id: 'len',
    title: 'len()',
    category: 'Built-in Functions',
    description: 'Returns the length of an object',
    syntax: 'len(obj)',
    example: `len("hello")      # 5
len([1, 2, 3])    # 3
len({"a": 1})     # 1`,
    parameters: ['obj: Object with __len__ method'],
    returns: 'int: Length of the object',
    notes: ['Works with strings, lists, tuples, dicts, sets', 'Raises TypeError if object has no __len__']
  },
  {
    id: 'type',
    title: 'type()',
    category: 'Built-in Functions',
    description: 'Returns the type of an object',
    syntax: 'type(obj)',
    example: `type(42)         # <class 'int'>
type("hello")    # <class 'str'>
type([1, 2])     # <class 'list'>
type(3.14).__name__  # 'float'`,
    parameters: ['obj: Object to check type'],
    returns: 'type: Type of the object',
    notes: ['Use isinstance() for type checking', 'type(obj).__name__ for string representation']
  },

  // String Methods
  {
    id: 'str-upper',
    title: 'str.upper()',
    category: 'String Methods',
    description: 'Returns uppercase copy of string',
    syntax: 'str.upper()',
    example: `"hello".upper()     # "HELLO"
"Hello World".upper()  # "HELLO WORLD"
name.upper()           # Uppercase version`,
    returns: 'str: Uppercase copy',
    notes: ['Original string unchanged', 'Returns new string object']
  },
  {
    id: 'str-lower',
    title: 'str.lower()',
    category: 'String Methods',
    description: 'Returns lowercase copy of string',
    syntax: 'str.lower()',
    example: `"HELLO".lower()     # "hello"
"Hello World".lower()  # "hello world"
email.lower()          # Normalize email`,
    returns: 'str: Lowercase copy',
    notes: ['Useful for case-insensitive comparisons']
  },
  {
    id: 'str-strip',
    title: 'str.strip()',
    category: 'String Methods',
    description: 'Removes leading and trailing whitespace',
    syntax: 'str.strip(chars)',
    example: `"  hello  ".strip()    # "hello"
"...hello...".strip(".")  # "hello"
user_input.strip()        # Clean input`,
    parameters: ['chars: Characters to remove (default: whitespace)'],
    returns: 'str: Stripped string',
    notes: ['Also: lstrip() (left), rstrip() (right)', 'Common for cleaning user input']
  },
  {
    id: 'str-split',
    title: 'str.split()',
    category: 'String Methods',
    description: 'Splits string into list',
    syntax: 'str.split(sep, maxsplit)',
    example: `"a,b,c".split(",")     # ["a", "b", "c"]
"hello world".split()   # ["hello", "world"]  
"a:b:c".split(":", 1)   # ["a", "b:c"]`,
    parameters: ['sep: Separator (default: whitespace)', 'maxsplit: Maximum splits'],
    returns: 'list: List of string parts',
    notes: ['Default splits on any whitespace', 'Empty string gives empty list']
  },

  // List Methods
  {
    id: 'list-append',
    title: 'list.append()',
    category: 'List Methods',
    description: 'Adds item to end of list',
    syntax: 'list.append(item)',
    example: `numbers = [1, 2, 3]
numbers.append(4)    # [1, 2, 3, 4]
names.append("Bob")  # Add to end`,
    parameters: ['item: Item to add'],
    returns: 'None (modifies list in-place)',
    notes: ['Modifies original list', 'Only adds one item at a time']
  },
  {
    id: 'list-extend',
    title: 'list.extend()',
    category: 'List Methods',
    description: 'Adds all items from iterable to list',
    syntax: 'list.extend(iterable)',
    example: `numbers = [1, 2]
numbers.extend([3, 4])  # [1, 2, 3, 4]
numbers.extend("ab")    # [1, 2, 3, 4, 'a', 'b']`,
    parameters: ['iterable: Items to add'],
    returns: 'None (modifies list in-place)',
    notes: ['Extends with each item individually', 'More efficient than multiple appends']
  },
  {
    id: 'list-remove',
    title: 'list.remove()',
    category: 'List Methods',
    description: 'Removes first occurrence of value',
    syntax: 'list.remove(value)',
    example: `numbers = [1, 2, 3, 2]
numbers.remove(2)  # [1, 3, 2] (first 2 removed)
names.remove("Alice")  # Remove name`,
    parameters: ['value: Value to remove'],
    returns: 'None (modifies list in-place)',
    notes: ['Raises ValueError if value not found', 'Only removes first occurrence']
  },

  // Dictionary Methods
  {
    id: 'dict-get',
    title: 'dict.get()',
    category: 'Dictionary Methods',
    description: 'Gets value for key, returns default if not found',
    syntax: 'dict.get(key, default)',
    example: `person = {"name": "Alice", "age": 25}
person.get("name")     # "Alice"
person.get("city")     # None
person.get("city", "Unknown")  # "Unknown"`,
    parameters: ['key: Dictionary key', 'default: Value if key not found'],
    returns: 'Value for key or default',
    notes: ['Safer than dict[key]', 'No KeyError if key missing']
  },
  {
    id: 'dict-keys',
    title: 'dict.keys()',
    category: 'Dictionary Methods',
    description: 'Returns view of dictionary keys',
    syntax: 'dict.keys()',
    example: `person = {"name": "Alice", "age": 25}
list(person.keys())    # ["name", "age"]
for key in person.keys():
    print(key)         # Iterate keys`,
    returns: 'dict_keys: View of keys',
    notes: ['Returns view object, not list', 'Use list() to convert', 'Changes with dict modifications']
  },
  {
    id: 'dict-values',
    title: 'dict.values()',
    category: 'Dictionary Methods',
    description: 'Returns view of dictionary values',
    syntax: 'dict.values()',
    example: `person = {"name": "Alice", "age": 25}
list(person.values())  # ["Alice", 25]
for value in person.values():
    print(value)       # Iterate values`,
    returns: 'dict_values: View of values',
    notes: ['Returns view object, not list', 'Use list() to convert']
  },

  // Control Flow
  {
    id: 'if-statement',
    title: 'if statement',
    category: 'Control Flow',
    description: 'Conditional execution of code blocks',
    syntax: 'if condition:\\n    # code\\nelif condition:\\n    # code\\nelse:\\n    # code',
    example: `age = 18
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")`,
    notes: ['Use elif for multiple conditions', 'else is optional', 'Indentation defines blocks']
  },
  {
    id: 'for-loop',
    title: 'for loop',
    category: 'Control Flow',
    description: 'Iterate over sequences',
    syntax: 'for item in iterable:\\n    # code',
    example: `for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for name in ["Alice", "Bob"]:
    print(f"Hello {name}")

for char in "hello":
    print(char)  # h, e, l, l, o`,
    notes: ['Works with any iterable', 'Use range() for numbers', 'enumerate() for index and value']
  },
  {
    id: 'while-loop',
    title: 'while loop',
    category: 'Control Flow',
    description: 'Repeat while condition is true',
    syntax: 'while condition:\\n    # code',
    example: `count = 0
while count < 5:
    print(count)
    count += 1

# Input validation
while True:
    user_input = input("Enter 'quit': ")
    if user_input == 'quit':
        break`,
    notes: ['Check condition each iteration', 'Use break to exit early', 'Avoid infinite loops']
  }
]

export function PythonReference() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [...new Set(referenceData.map(item => item.category))]
  
  const filteredData = referenceData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Built-in Functions': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'String Methods': 'bg-green-500/20 text-green-400 border-green-400/30',
      'List Methods': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Dictionary Methods': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
      'Control Flow': 'bg-red-500/20 text-red-400 border-red-400/30'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-400/30'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            📚 Python Reference Guide
          </CardTitle>
          <CardDescription className="text-gray-300">
            Quick reference for Python syntax, built-in functions, and common methods
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-black/60 backdrop-blur-sm border-gray-600">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search functions, methods, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-cyan-400/30 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-cyan-500 text-white' : 'border-gray-500 text-gray-300'}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-cyan-500 text-white' : 'border-gray-500 text-gray-300'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-4">
        {filteredData.length === 0 ? (
          <Card className="bg-black/60 backdrop-blur-sm border-gray-600">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">No results found for "{searchTerm}"</p>
              <Button 
                onClick={() => setSearchTerm('')}
                variant="outline"
                className="mt-4 border-cyan-400/50 text-cyan-400"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredData.map((item) => (
            <Card key={item.id} className="bg-black/60 backdrop-blur-sm border-gray-600 hover:border-cyan-400/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cyan-400 font-mono text-lg">
                    {item.title}
                  </CardTitle>
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="syntax" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                    <TabsTrigger value="syntax" className="data-[state=active]:bg-cyan-500/20">
                      Syntax
                    </TabsTrigger>
                    <TabsTrigger value="example" className="data-[state=active]:bg-cyan-500/20">
                      Example
                    </TabsTrigger>
                    <TabsTrigger value="details" className="data-[state=active]:bg-cyan-500/20">
                      Details
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="syntax" className="mt-4">
                    <div className="bg-gray-900/50 p-3 rounded-lg">
                      <pre className="text-yellow-400 text-sm font-mono whitespace-pre-wrap">
                        <code>{item.syntax}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="example" className="mt-4">
                    <div className="bg-gray-900/50 p-3 rounded-lg">
                      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                        <code>{item.example}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-3">
                      {item.parameters && (
                        <div>
                          <h4 className="text-purple-400 font-semibold mb-2">Parameters:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {item.parameters.map((param, index) => (
                              <li key={index} className="text-gray-300 text-sm">{param}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {item.returns && (
                        <div>
                          <h4 className="text-green-400 font-semibold mb-2">Returns:</h4>
                          <p className="text-gray-300 text-sm">{item.returns}</p>
                        </div>
                      )}
                      
                      {item.notes && item.notes.length > 0 && (
                        <div>
                          <h4 className="text-cyan-400 font-semibold mb-2">Notes:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {item.notes.map((note, index) => (
                              <li key={index} className="text-gray-300 text-sm">{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}