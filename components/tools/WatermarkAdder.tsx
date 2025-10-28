import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload, Download, Type } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type WatermarkAdderProps = {
  onBack: () => void;
};

export default function WatermarkAdder({ onBack }: WatermarkAdderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('© Your Brand');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (image && previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Add watermark
        ctx.font = '30px Poppins, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;

        const textMetrics = ctx.measureText(watermarkText);
        const padding = 20;

        let x = padding;
        let y = padding + 30;

        if (position === 'bottom-right') {
          x = canvas.width - textMetrics.width - padding;
          y = canvas.height - padding;
        } else if (position === 'bottom-left') {
          x = padding;
          y = canvas.height - padding;
        } else if (position === 'top-right') {
          x = canvas.width - textMetrics.width - padding;
          y = padding + 30;
        }

        ctx.strokeText(watermarkText, x, y);
        ctx.fillText(watermarkText, x, y);
      };
      img.src = image;
    }
  }, [image, watermarkText, position]);

  const handleDownload = () => {
    if (!previewCanvasRef.current) return;

    previewCanvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'watermarked-image.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded!');
      }
    });
  };

  return (
    <ToolLayout
      title="Watermark Adder"
      description="Add text or logo watermarks to images"
      onBack={onBack}
      color="#FF9800"
    >
      <div className="space-y-6">
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
            {/* Watermark Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Watermark Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Watermark Text</label>
                  <Input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`p-3 rounded-lg border-2 transition-colors text-sm ${
                          position === pos
                            ? 'border-[#FF9800] bg-[#FF9800]/10 text-[#FF9800]'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {pos.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <canvas
                  ref={previewCanvasRef}
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <Button
                onClick={handleDownload}
                className="w-full mt-4 bg-[#FF9800] hover:bg-[#F57C00] text-white"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Watermarked Image
              </Button>
            </div>
          </>
        )}

        {!image && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Type className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Upload an image to add a watermark</p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}
