import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type AICaptionGeneratorProps = {
  onBack: () => void;
};

const generateCaptions = (keyword: string): string[] => {
  const templates = [
    `${keyword} vibes only ✨`,
    `Living my best ${keyword} life 💫`,
    `${keyword} mode: activated 🚀`,
    `Just another day of ${keyword} 🌟`,
    `${keyword} is my happy place 💖`,
    `Current mood: ${keyword} 🌈`,
    `Making memories with ${keyword} 📸`,
    `${keyword} goals on point 🎯`,
    `Weekend ${keyword} energy ⚡`,
    `${keyword} and good vibes only ✌️`,
  ];

  return templates.sort(() => Math.random() - 0.5).slice(0, 8);
};

export default function AICaptionGenerator({ onBack }: AICaptionGeneratorProps) {
  const [keyword, setKeyword] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword');
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setCaptions(generateCaptions(keyword));
    setLoading(false);
    toast.success('Captions generated!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <ToolLayout
      title="AI Caption Generator"
      description="Generate engaging captions for Instagram and TikTok"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Enter a keyword or theme
          </label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., travel, fitness, food"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Captions Grid */}
        {captions.length > 0 && (
          <div className="grid gap-3">
            {captions.map((caption, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-start justify-between gap-4 group hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-800 dark:text-gray-200 flex-1">{caption}</p>
                <motion.button
                  aria-label={`Copy caption: ${caption}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyToClipboard(caption)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {captions.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Enter a keyword and click Generate to create captions</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}