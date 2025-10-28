import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import AICaptionGenerator from './components/tools/AICaptionGenerator';
import AIQuoteMaker from './components/tools/AIQuoteMaker';
import ImageResizer from './components/tools/ImageResizer';
import BackgroundRemover from './components/tools/BackgroundRemover';
import WatermarkAdder from './components/tools/WatermarkAdder';
import QRCodeGenerator from './components/tools/QRCodeGenerator';
import UnitConverter from './components/tools/UnitConverter';
import NotesApp from './components/tools/NotesApp';
import TodoList from './components/tools/TodoList';
import HashtagFinder from './components/tools/HashtagFinder';
import FileManager from './components/tools/FileManager';
import BatteryInfo from './components/tools/BatteryInfo';
import DeviceInfo from './components/tools/DeviceInfo';
import SpeedTest from './components/tools/SpeedTest';
import Settings from './components/Settings';
import About from './components/About';

export type ToolType = 
  | 'dashboard'
  | 'ai-caption'
  | 'ai-quote'
  | 'image-resizer'
  | 'background-remover'
  | 'watermark'
  | 'qr-code'
  | 'unit-converter'
  | 'notes'
  | 'todo'
  | 'hashtag'
  | 'file-manager'
  | 'battery'
  | 'device'
  | 'speed-test'
  | 'settings'
  | 'about';

export default function App() {
  const [currentTool, setCurrentTool] = useState<ToolType>('dashboard');

  const renderTool = () => {
    switch (currentTool) {
      case 'dashboard':
        return <Dashboard onToolSelect={setCurrentTool} />;
      case 'ai-caption':
        return <AICaptionGenerator onBack={() => setCurrentTool('dashboard')} />;
      case 'ai-quote':
        return <AIQuoteMaker onBack={() => setCurrentTool('dashboard')} />;
      case 'image-resizer':
        return <ImageResizer onBack={() => setCurrentTool('dashboard')} />;
      case 'background-remover':
        return <BackgroundRemover onBack={() => setCurrentTool('dashboard')} />;
      case 'watermark':
        return <WatermarkAdder onBack={() => setCurrentTool('dashboard')} />;
      case 'qr-code':
        return <QRCodeGenerator onBack={() => setCurrentTool('dashboard')} />;
      case 'unit-converter':
        return <UnitConverter onBack={() => setCurrentTool('dashboard')} />;
      case 'notes':
        return <NotesApp onBack={() => setCurrentTool('dashboard')} />;
      case 'todo':
        return <TodoList onBack={() => setCurrentTool('dashboard')} />;
      case 'hashtag':
        return <HashtagFinder onBack={() => setCurrentTool('dashboard')} />;
      case 'file-manager':
        return <FileManager onBack={() => setCurrentTool('dashboard')} />;
      case 'battery':
        return <BatteryInfo onBack={() => setCurrentTool('dashboard')} />;
      case 'device':
        return <DeviceInfo onBack={() => setCurrentTool('dashboard')} />;
      case 'speed-test':
        return <SpeedTest onBack={() => setCurrentTool('dashboard')} />;
      case 'settings':
        return <Settings onBack={() => setCurrentTool('dashboard')} />;
      case 'about':
        return <About onBack={() => setCurrentTool('dashboard')} />;
      default:
        return <Dashboard onToolSelect={setCurrentTool} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {renderTool()}
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}
