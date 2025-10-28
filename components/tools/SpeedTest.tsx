import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Wifi, Download, Upload, Activity } from 'lucide-react';
import { Progress } from '../ui/progress';

type SpeedTestProps = {
  onBack: () => void;
};

export default function SpeedTest({ onBack }: SpeedTestProps) {
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    download: number;
    upload: number;
    ping: number;
  } | null>(null);

  const runSpeedTest = async () => {
    setTesting(true);
    setProgress(0);
    setResults(null);

    // Simulate speed test
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(i);
    }

    // Generate random realistic results
    const download = Math.random() * 80 + 20; // 20-100 Mbps
    const upload = Math.random() * 40 + 10; // 10-50 Mbps
    const ping = Math.random() * 40 + 10; // 10-50 ms

    setResults({
      download: Math.round(download * 10) / 10,
      upload: Math.round(upload * 10) / 10,
      ping: Math.round(ping),
    });

    setTesting(false);
  };

  const getSpeedRating = (speed: number) => {
    if (speed > 80) return { label: 'Excellent', color: '#4CAF50' };
    if (speed > 50) return { label: 'Good', color: '#2196F3' };
    if (speed > 25) return { label: 'Average', color: '#FF9800' };
    return { label: 'Slow', color: '#f44336' };
  };

  const getPingRating = (ping: number) => {
    if (ping < 20) return { label: 'Excellent', color: '#4CAF50' };
    if (ping < 40) return { label: 'Good', color: '#2196F3' };
    if (ping < 60) return { label: 'Average', color: '#FF9800' };
    return { label: 'Slow', color: '#f44336' };
  };

  return (
    <ToolLayout
      title="Speed Test"
      description="Check your network connection speed"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Test Button */}
        {!testing && !results && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <Wifi className="w-20 h-20 mx-auto mb-6 text-[#4CAF50]" />
            <h2 className="text-gray-900 dark:text-white mb-2">Test Your Connection</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Check your download and upload speeds
            </p>
            <Button
              onClick={runSpeedTest}
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-6 text-lg"
            >
              <Activity className="w-6 h-6 mr-2" />
              Start Test
            </Button>
          </div>
        )}

        {/* Testing in Progress */}
        {testing && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <Wifi className="w-20 h-20 mx-auto mb-6 text-[#4CAF50]" />
            </motion.div>
            <h2 className="text-gray-900 dark:text-white mb-2">Testing Connection...</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This may take a few moments
            </p>
            <Progress value={progress} className="h-3 max-w-md mx-auto" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{progress}%</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Download Speed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Download className="w-6 h-6 text-[#2196F3]" />
                  <h3 className="text-gray-900 dark:text-white">Download Speed</h3>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${getSpeedRating(results.download).color}20`,
                    color: getSpeedRating(results.download).color 
                  }}
                >
                  {getSpeedRating(results.download).label}
                </span>
              </div>
              <p className="text-4xl text-gray-900 dark:text-white mb-1">
                {results.download} <span className="text-2xl">Mbps</span>
              </p>
            </div>

            {/* Upload Speed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Upload className="w-6 h-6 text-[#FF9800]" />
                  <h3 className="text-gray-900 dark:text-white">Upload Speed</h3>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${getSpeedRating(results.upload).color}20`,
                    color: getSpeedRating(results.upload).color 
                  }}
                >
                  {getSpeedRating(results.upload).label}
                </span>
              </div>
              <p className="text-4xl text-gray-900 dark:text-white mb-1">
                {results.upload} <span className="text-2xl">Mbps</span>
              </p>
            </div>

            {/* Ping */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-[#4CAF50]" />
                  <h3 className="text-gray-900 dark:text-white">Ping</h3>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${getPingRating(results.ping).color}20`,
                    color: getPingRating(results.ping).color 
                  }}
                >
                  {getPingRating(results.ping).label}
                </span>
              </div>
              <p className="text-4xl text-gray-900 dark:text-white mb-1">
                {results.ping} <span className="text-2xl">ms</span>
              </p>
            </div>

            <Button
              onClick={runSpeedTest}
              variant="outline"
              className="w-full"
            >
              Test Again
            </Button>
          </motion.div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Note:</strong> This is a simulated speed test for demo purposes. For accurate results, use actual network testing tools.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
