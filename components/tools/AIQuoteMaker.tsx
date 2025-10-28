import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Lightbulb, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AIQuoteMakerProps = {
  onBack: () => void;
};

const quotes = {
  motivational: [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
  ],
  business: [
    "Innovation distinguishes between a leader and a follower.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great.",
    "Opportunities don't happen. You create them.",
    "The way to get started is to quit talking and begin doing.",
  ],
  life: [
    "Life is what happens when you're busy making other plans.",
    "The purpose of our lives is to be happy.",
    "Life is either a daring adventure or nothing at all.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Life is short, and it is up to you to make it sweet.",
  ],
  success: [
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "The secret of success is to do the common thing uncommonly well.",
    "Success seems to be connected with action. Successful people keep moving.",
  ],
};

export default function AIQuoteMaker({ onBack }: AIQuoteMakerProps) {
  const [category, setCategory] = useState<keyof typeof quotes>('motivational');
  const [currentQuote, setCurrentQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const categoryQuotes = quotes[category];
      const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
      setCurrentQuote(randomQuote);
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = () => {
    if (currentQuote) {
      navigator.clipboard.writeText(currentQuote);
      toast.success('Quote copied to clipboard!');
    }
  };

  return (
    <ToolLayout
      title="AI Quote Maker"
      description="Auto-generate motivational and niche quotes"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Select Category
          </label>
          <div className="flex gap-3">
            <Select value={category} onValueChange={(value) => setCategory(value as keyof typeof quotes)}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motivational">Motivational</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="life">Life</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={generateQuote}
              disabled={loading}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quote Display */}
        {currentQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-xl shadow-lg p-8 text-white"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-xl leading-relaxed mb-6">"{currentQuote}"</p>
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  className="bg-white text-[#2196F3] hover:bg-gray-100"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {!currentQuote && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a category and click Generate to create a quote</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
