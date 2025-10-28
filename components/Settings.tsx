import { motion } from 'motion/react';
import ToolLayout from './ToolLayout';
import { useTheme } from './ThemeProvider';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Moon, Sun, Palette, Bell, Database, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type SettingsProps = {
  onBack: () => void;
};

export default function Settings({ onBack }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all app data? This cannot be undone.')) {
      localStorage.removeItem('toolverse-notes');
      localStorage.removeItem('toolverse-todos');
      toast.success('App data cleared successfully!');
    }
  };

  const settingsSections = [
    {
      title: 'Appearance',
      icon: <Palette className="w-5 h-5 text-[#2196F3]" />,
      items: [
        {
          label: 'Dark Mode',
          description: 'Switch between light and dark theme',
          icon: theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
          action: (
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          ),
        },
      ],
    },
    {
      title: 'Data & Storage',
      icon: <Database className="w-5 h-5 text-[#4CAF50]" />,
      items: [
        {
          label: 'Clear App Data',
          description: 'Remove all saved notes, todos, and settings',
          action: (
            <Button
              onClick={handleClearData}
              variant="destructive"
              size="sm"
            >
              Clear
            </Button>
          ),
        },
      ],
    },
    {
      title: 'Privacy',
      icon: <Shield className="w-5 h-5 text-[#FF9800]" />,
      items: [
        {
          label: 'Local Storage Only',
          description: 'All your data is stored locally on your device',
          info: true,
        },
      ],
    },
  ];

  return (
    <ToolLayout
      title="Settings"
      description="Customize your ToolVerse experience"
      onBack={onBack}
      color="#2196F3"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h3 className="text-gray-900 dark:text-white">{section.title}</h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-start gap-3 flex-1">
                    {item.icon && (
                      <div className="text-gray-600 dark:text-gray-400 mt-0.5">
                        {item.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.action && (
                    <div className="flex-shrink-0">
                      {item.action}
                    </div>
                  )}
                  {item.info && (
                    <div className="flex-shrink-0">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
                        ✓ Secure
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <div className="bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-xl shadow-md p-6 text-white">
          <h3 className="mb-2">ToolVerse</h3>
          <p className="text-sm opacity-90 mb-4">Version 1.0.0</p>
          <p className="text-sm opacity-75">
            All-in-one productivity toolkit with 14+ powerful tools for content creation, business, and productivity.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
