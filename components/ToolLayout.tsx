import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

type ToolLayoutProps = {
  title: string;
  description: string;
  onBack: () => void;
  children: ReactNode;
  color?: string;
};

export default function ToolLayout({ title, description, onBack, children, color = '#2196F3' }: ToolLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen"
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            <div>
              <h1 className="text-gray-900 dark:text-white">{title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </motion.div>
  );
}
