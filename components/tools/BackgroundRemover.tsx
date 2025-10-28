import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Upload, Download, Eraser } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type BackgroundRemoverProps = {
  onBack: () => void;
};

export default function BackgroundRemover({ onBack }: BackgroundRemoverProps) {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      toast.success('Background removed! (Demo mode)');
      toast.info('Connect a real API like remove.bg for production use');
    }, 2000);
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove image backgrounds for social media"
      onBack={onBack}
      color="#FF9800"
    >
      <div className="space-y-6">
        {/* API Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Note:</strong> This is a demo. For production, integrate with APIs like remove.bg or imgly/background-removal
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </Button>
        </div>

        {image && (
          <>
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Original Image</h3>
              <div className="flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <img
                  src={image}
                  alt="Original"
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleRemoveBackground}
                  disabled={processing}
                  className="flex-1 bg-[#FF9800] hover:bg-[#F57C00] text-white"
                >
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Eraser className="w-5 h-5 mr-2" />
                      Remove Background
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info('Download will be available after processing')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </>
        )}

        {!image && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Eraser className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Upload an image to remove its background</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
