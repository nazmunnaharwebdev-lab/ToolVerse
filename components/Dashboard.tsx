import { motion } from 'motion/react';
import { Bot, Lightbulb, Image, Eraser, Droplet, QrCode, Calculator, FileText, CheckSquare, Hash, Folder, Battery, Smartphone, Wifi, Settings as SettingsIcon, Info } from 'lucide-react';
import { ToolType } from '../App';
import { useTheme } from './ThemeProvider';

type Tool = {
  id: ToolType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
};

const tools: Tool[] = [
  // AI Tools
  { id: 'ai-caption', name: 'AI Caption Generator', description: 'Generate Instagram & TikTok captions', icon: <Bot className="w-6 h-6" />, color: '#2196F3', category: 'ai' },
  { id: 'ai-quote', name: 'AI Quote Maker', description: 'Auto-generate motivational quotes', icon: <Lightbulb className="w-6 h-6" />, color: '#2196F3', category: 'ai' },
  
  // Content Tools
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images quickly', icon: <Image className="w-6 h-6" />, color: '#FF9800', category: 'content' },
  { id: 'background-remover', name: 'Background Remover', description: 'Remove image backgrounds', icon: <Eraser className="w-6 h-6" />, color: '#FF9800', category: 'content' },
  { id: 'watermark', name: 'Watermark Adder', description: 'Add text or logo watermarks', icon: <Droplet className="w-6 h-6" />, color: '#FF9800', category: 'content' },
  
  // Business Tools
  { id: 'qr-code', name: 'QR Code Generator', description: 'Generate QR codes instantly', icon: <QrCode className="w-6 h-6" />, color: '#4CAF50', category: 'business' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert currency, length & more', icon: <Calculator className="w-6 h-6" />, color: '#4CAF50', category: 'business' },
  
  // Productivity Tools
  { id: 'notes', name: 'Notes App', description: 'Simple notes saved locally', icon: <FileText className="w-6 h-6" />, color: '#2196F3', category: 'productivity' },
  { id: 'todo', name: 'To-Do List', description: 'Basic checklist for productivity', icon: <CheckSquare className="w-6 h-6" />, color: '#2196F3', category: 'productivity' },
  
  // Social Media Tools
  { id: 'hashtag', name: 'Hashtag Finder', description: 'Suggest trending hashtags', icon: <Hash className="w-6 h-6" />, color: '#FF9800', category: 'social' },
  
  // System Tools
  { id: 'file-manager', name: 'File Manager', description: 'Browse and manage files', icon: <Folder className="w-6 h-6" />, color: '#4CAF50', category: 'system' },
  { id: 'battery', name: 'Battery Info', description: 'Check battery status', icon: <Battery className="w-6 h-6" />, color: '#4CAF50', category: 'system' },
  { id: 'device', name: 'Device Info', description: 'View device specifications', icon: <Smartphone className="w-6 h-6" />, color: '#4CAF50', category: 'system' },
  { id: 'speed-test', name: 'Speed Test', description: 'Check network speed', icon: <Wifi className="w-6 h-6" />, color: '#4CAF50', category: 'system' },
];

type DashboardProps = {
  onToolSelect: (tool: ToolType) => void;
};

export default function Dashboard({ onToolSelect }: DashboardProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 dark:text-white">ToolVerse</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">All-in-one productivity toolkit</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToolSelect('settings')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <SettingsIcon className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToolSelect('about')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Info className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onToolSelect(tool.id)}
                className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 text-left group"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <div style={{ color: tool.color }}>
                      {tool.icon}
                    </div>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 dark:text-white group-hover:text-opacity-80 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
