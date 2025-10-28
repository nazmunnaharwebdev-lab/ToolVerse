import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ImageResizerProps = {
  onBack: () => void;
};

export default function ImageResizer({ onBack }: ImageResizerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState('800');
  const [height, setHeight] = useState('600');
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width.toString());
          setHeight(img.height.toString());
          setImage(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainRatio && originalDimensions.width) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(parseInt(value) * ratio).toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainRatio && originalDimensions.height) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(parseInt(value) * ratio).toString());
    }
  };

  const handleDownload = () => {
    if (!image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      ctx.drawImage(img, 0, 0, parseInt(width), parseInt(height));
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `resized-${width}x${height}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success('Image downloaded!');
        }
      });
    };
    img.src = image;
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images quickly for social media"
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
            {/* Size Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Resize Options</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Width (px)</label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Height (px)</label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainRatio}
                  onChange={(e) => setMaintainRatio(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Maintain aspect ratio</span>
              </label>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Original: {originalDimensions.width} × {originalDimensions.height}px
              </p>
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <Button
                onClick={handleDownload}
                className="w-full mt-4 bg-[#FF9800] hover:bg-[#F57C00] text-white"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resized Image
              </Button>
            </div>
          </>
        )}

        {!image && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Upload an image to get started</p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}
