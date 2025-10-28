import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Hash, Copy, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type HashtagFinderProps = {
  onBack: () => void;
};

const hashtagSuggestions: Record<string, string[]> = {
  fashion: ['#fashion', '#style', '#ootd', '#fashionista', '#instafashion', '#fashionblogger', '#streetstyle', '#fashiongram', '#outfitoftheday', '#fashionaddict'],
  food: ['#food', '#foodie', '#foodporn', '#instafood', '#foodstagram', '#foodphotography', '#yummy', '#delicious', '#foodblogger', '#foodlover'],
  travel: ['#travel', '#travelgram', '#wanderlust', '#instatravel', '#travelphotography', '#traveling', '#traveltheworld', '#adventure', '#explore', '#vacation'],
  fitness: ['#fitness', '#gym', '#workout', '#fit', '#fitnessmotivation', '#bodybuilding', '#training', '#health', '#fitfam', '#exercise'],
  photography: ['#photography', '#photo', '#photographer', '#photooftheday', '#picoftheday', '#instagood', '#instadaily', '#ig', '#camera', '#canon'],
  business: ['#business', '#entrepreneur', '#success', '#motivation', '#marketing', '#startup', '#businessowner', '#hustle', '#mindset', '#goals'],
  beauty: ['#beauty', '#makeup', '#skincare', '#beautyblogger', '#cosmetics', '#makeupartist', '#beautiful', '#glam', '#makeuplover', '#beautycare'],
  art: ['#art', '#artist', '#artwork', '#drawing', '#painting', '#illustration', '#creative', '#design', '#instaart', '#artistsoninstagram'],
};

export default function HashtagFinder({ onBack }: HashtagFinderProps) {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleSearch = () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword');
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    let found = hashtagSuggestions[lowerKeyword] || [];
    
    if (found.length === 0) {
      // Generate generic hashtags based on keyword
      found = [
        `#${lowerKeyword}`,
        `#${lowerKeyword}life`,
        `#${lowerKeyword}lover`,
        `#${lowerKeyword}gram`,
        `#insta${lowerKeyword}`,
        `#${lowerKeyword}daily`,
        `#${lowerKeyword}photography`,
        `#${lowerKeyword}community`,
        `#love${lowerKeyword}`,
        `#${lowerKeyword}vibes`,
      ];
    }

    setHashtags(found);
    toast.success('Hashtags generated!');
  };

  const copyAll = () => {
    const text = hashtags.join(' ');
    navigator.clipboard.writeText(text);
    toast.success('All hashtags copied!');
  };

  const copySingle = (hashtag: string) => {
    navigator.clipboard.writeText(hashtag);
    toast.success('Hashtag copied!');
  };

  return (
    <ToolLayout
      title="Hashtag Finder"
      description="Suggest trending hashtags for your posts"
      onBack={onBack}
      color="#FF9800"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Enter a topic or keyword
          </label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., fashion, travel, food"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-6"
            >
              <Hash className="w-5 h-5 mr-2" />
              Find
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(hashtagSuggestions).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setKeyword(category);
                  setHashtags(hashtagSuggestions[category]);
                }}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-[#FF9800] hover:text-white dark:hover:bg-[#FF9800] text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {hashtags.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FF9800]" />
                <h3 className="text-gray-900 dark:text-white">Suggested Hashtags</h3>
              </div>
              <Button
                onClick={copyAll}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hashtags.map((hashtag, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => copySingle(hashtag)}
                  className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-[#FF9800]/10 dark:hover:bg-[#FF9800]/20 rounded-lg transition-colors text-left group"
                >
                  <span className="text-gray-800 dark:text-gray-200 text-sm">{hashtag}</span>
                  <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF9800] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {hashtags.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Hash className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Enter a keyword or select a category to find hashtags</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
