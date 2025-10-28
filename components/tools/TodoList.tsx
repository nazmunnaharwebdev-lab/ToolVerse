import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CheckSquare, Plus, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

type TodoListProps = {
  onBack: () => void;
};

export default function TodoList({ onBack }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toolverse-todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem('toolverse-todos', JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    if (!newTodo.trim()) {
      toast.error('Please enter a task');
      return;
    }

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    saveTodos([todo, ...todos]);
    setNewTodo('');
    toast.success('Task added!');
  };

  const handleToggle = (id: string) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updated);
  };

  const handleDelete = (id: string) => {
    const updated = todos.filter(todo => todo.id !== id);
    saveTodos(updated);
    toast.success('Task deleted!');
  };

  const handleClearCompleted = () => {
    const updated = todos.filter(todo => !todo.completed);
    saveTodos(updated);
    toast.success('Completed tasks cleared!');
  };

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <ToolLayout
      title="To-Do List"
      description="Basic checklist for personal productivity"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Add Todo */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex gap-3">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button
              onClick={handleAdd}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl text-gray-900 dark:text-white">{todos.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl text-[#2196F3]">{activeCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl text-[#4CAF50]">{completedCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Tasks</h3>
            {completedCount > 0 && (
              <Button
                onClick={handleClearCompleted}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear Completed
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No tasks yet. Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    todo.completed
                      ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#2196F3]'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? 'bg-[#4CAF50] border-[#4CAF50]'
                        : 'border-gray-300 dark:border-gray-600 hover:border-[#2196F3]'
                    }`}
                  >
                    {todo.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
