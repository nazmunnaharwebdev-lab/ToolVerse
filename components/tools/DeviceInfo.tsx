import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Smartphone, Monitor, Cpu, HardDrive, Globe } from 'lucide-react';

type DeviceInfoProps = {
  onBack: () => void;
};

export default function DeviceInfo({ onBack }: DeviceInfoProps) {
  const deviceInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cores: navigator.hardwareConcurrency || 'N/A',
    memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'N/A',
  };

  const getBrowserName = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  };

  const infoSections = [
    {
      title: 'Device',
      icon: <Smartphone className="w-5 h-5 text-[#4CAF50]" />,
      items: [
        { label: 'Platform', value: deviceInfo.platform },
        { label: 'Operating System', value: getOS() },
        { label: 'Screen Resolution', value: `${deviceInfo.screenWidth} × ${deviceInfo.screenHeight}` },
        { label: 'Pixel Ratio', value: deviceInfo.pixelRatio.toString() },
        { label: 'Color Depth', value: `${deviceInfo.colorDepth} bit` },
      ],
    },
    {
      title: 'Browser',
      icon: <Globe className="w-5 h-5 text-[#4CAF50]" />,
      items: [
        { label: 'Browser', value: getBrowserName() },
        { label: 'Language', value: deviceInfo.language },
        { label: 'Cookies', value: deviceInfo.cookieEnabled ? 'Enabled' : 'Disabled' },
        { label: 'Online', value: deviceInfo.onLine ? 'Yes' : 'No' },
        { label: 'Timezone', value: deviceInfo.timezone },
      ],
    },
    {
      title: 'Hardware',
      icon: <Cpu className="w-5 h-5 text-[#4CAF50]" />,
      items: [
        { label: 'CPU Cores', value: deviceInfo.cores.toString() },
        { label: 'Memory', value: deviceInfo.memory },
      ],
    },
  ];

  return (
    <ToolLayout
      title="Device Info"
      description="View your device specifications and browser details"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {infoSections.map((section, index) => (
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
            
            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="text-gray-900 dark:text-white text-right max-w-[60%] truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* User Agent */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">User Agent</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <code className="text-xs text-gray-700 dark:text-gray-300 break-all">
              {deviceInfo.userAgent}
            </code>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Privacy Note:</strong> This information is collected from your browser and never sent to any server.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
