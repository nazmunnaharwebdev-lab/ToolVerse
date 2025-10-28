import { motion } from 'motion/react';
import ToolLayout from './ToolLayout';
import { Sparkles, Code, Heart, Github, Globe, Mail } from 'lucide-react';
import { Button } from './ui/button';

type AboutProps = {
  onBack: () => void;
};

export default function About({ onBack }: AboutProps) {
  const features = [
    {
      category: 'AI Tools',
      count: 2,
      items: ['Caption Generator', 'Quote Maker'],
      color: '#2196F3',
    },
    {
      category: 'Content Tools',
      count: 3,
      items: ['Image Resizer', 'Background Remover', 'Watermark Adder'],
      color: '#FF9800',
    },
    {
      category: 'Business Tools',
      count: 2,
      items: ['QR Code Generator', 'Unit Converter'],
      color: '#4CAF50',
    },
    {
      category: 'Productivity Tools',
      count: 2,
      items: ['Notes App', 'To-Do List'],
      color: '#2196F3',
    },
    {
      category: 'Social Tools',
      count: 1,
      items: ['Hashtag Finder'],
      color: '#FF9800',
    },
    {
      category: 'System Tools',
      count: 4,
      items: ['File Manager', 'Battery Info', 'Device Info', 'Speed Test'],
      color: '#4CAF50',
    },
  ];

  return (
    <ToolLayout
      title="About ToolVerse"
      description="All-in-one productivity toolkit"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-xl shadow-md p-8 text-white text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
          </motion.div>
          <h2 className="mb-3">ToolVerse</h2>
          <p className="text-lg opacity-90 mb-2">Your All-in-One Digital Toolkit</p>
          <p className="text-sm opacity-75 max-w-2xl mx-auto">
            14+ powerful tools designed to boost your productivity, creativity, and efficiency. 
            Everything you need in one beautiful, fast, and intuitive interface.
          </p>
        </div>

        {/* Features Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">What's Inside</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: feature.color }}
                  />
                  <h4 className="text-gray-900 dark:text-white">
                    {feature.category}
                  </h4>
                  <span className="ml-auto px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                    {feature.count}
                  </span>
                </div>
                <ul className="space-y-1">
                  {feature.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 dark:text-gray-400">
                      • {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Key Features</h3>
          <div className="grid gap-4">
            {[
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: 'AI-Powered Tools',
                description: 'Generate captions and quotes with intelligent algorithms',
              },
              {
                icon: <Code className="w-5 h-5" />,
                title: 'Built with Modern Tech',
                description: 'React, TypeScript, Tailwind CSS, and Motion animations',
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: 'Privacy First',
                description: 'All data stored locally on your device. No servers, no tracking.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#2196F3]/10 rounded-lg flex items-center justify-center text-[#2196F3]">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Credits & Technologies</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Built with <strong className="text-gray-900 dark:text-white">React</strong> & <strong className="text-gray-900 dark:text-white">TypeScript</strong></p>
            <p>• Styled with <strong className="text-gray-900 dark:text-white">Tailwind CSS</strong></p>
            <p>• Animations powered by <strong className="text-gray-900 dark:text-white">Motion</strong></p>
            <p>• UI components from <strong className="text-gray-900 dark:text-white">shadcn/ui</strong></p>
            <p>• Icons by <strong className="text-gray-900 dark:text-white">Lucide</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> for productivity enthusiasts
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            ToolVerse v1.0.0 © 2025
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
