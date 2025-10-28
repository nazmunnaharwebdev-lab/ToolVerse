import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FileText, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type NotesAppProps = {
  onBack: () => void;
};

export default function NotesApp({ onBack }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('toolverse-notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem('toolverse-notes', JSON.stringify(newNotes));
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (isEditing && selectedNote) {
      const updated = notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title, content }
          : note
      );
      saveNotes(updated);
      toast.success('Note updated!');
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };
      saveNotes([newNote, ...notes]);
      toast.success('Note saved!');
    }

    setTitle('');
    setContent('');
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const updated = notes.filter(note => note.id !== id);
    saveNotes(updated);
    toast.success('Note deleted!');
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  };

  const handleNew = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
    setIsEditing(false);
  };

  return (
    <ToolLayout
      title="Notes App"
      description="Simple notes saved locally in your browser"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white">My Notes</h3>
              <Button
                onClick={handleNew}
                size="sm"
                className="bg-[#2196F3] hover:bg-[#1976D2] text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  No notes yet
                </p>
              ) : (
                notes.map((note) => (
                  <motion.div
                    key={note.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedNote?.id === note.id
                        ? 'border-[#2196F3] bg-[#2196F3]/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleEdit(note)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white truncate">
                          {note.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(note.id);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Title</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  rows={12}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#2196F3] hover:bg-[#1976D2] text-white"
                >
                  {isEditing ? 'Update Note' : 'Save Note'}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleNew}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
