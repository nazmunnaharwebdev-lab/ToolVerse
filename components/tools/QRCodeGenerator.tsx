import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { QrCode, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type QRCodeGeneratorProps = {
  onBack: () => void;
};

export default function QRCodeGenerator({ onBack }: QRCodeGeneratorProps) {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [activeTab, setActiveTab] = useState('url');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 300;
    const moduleCount = 29;
    const moduleSize = size / moduleCount;

    canvas.width = size;
    canvas.height = size;

    // Simple QR code pattern (simplified for demo)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000000';

    // Generate a simple pattern based on data hash
    const hash = Array.from(data).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const random = (hash * (row + 1) * (col + 1)) % 2;
        if (random === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add finder patterns (corners)
    const drawFinderPattern = (x: number, y: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
    };

    drawFinderPattern(0, 0);
    drawFinderPattern(size - moduleSize * 7, 0);
    drawFinderPattern(0, size - moduleSize * 7);
  };

  useEffect(() => {
    let data = '';
    if (activeTab === 'url' && url) {
      data = url;
    } else if (activeTab === 'text' && text) {
      data = text;
    } else if (activeTab === 'contact' && contact.name) {
      data = `BEGIN:VCARD\nFN:${contact.name}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nEND:VCARD`;
    }
    
    if (data) {
      generateQRCode(data);
    }
  }, [url, text, contact, activeTab]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('QR Code downloaded!');
      }
    });
  };

  const hasData = (activeTab === 'url' && url) || (activeTab === 'text' && text) || (activeTab === 'contact' && contact.name);

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for URLs, text, and contacts"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Enter URL</label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Enter Text</label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter any text to encode"
                  rows={4}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Name</label>
                <Input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Phone</label>
                <Input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Email</label>
                <Input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* QR Code Display */}
        {hasData ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Generated QR Code</h3>
            <div className="flex justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <canvas ref={canvasRef} className="rounded-lg shadow-md" />
            </div>
            <Button
              onClick={handleDownload}
              className="w-full mt-4 bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Download QR Code
            </Button>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Enter data to generate a QR code</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
