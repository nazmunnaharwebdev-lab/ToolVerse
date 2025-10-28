import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';
import { Progress } from '../ui/progress';

type BatteryInfoProps = {
  onBack: () => void;
};

export default function BatteryInfo({ onBack }: BatteryInfoProps) {
  const [batteryLevel, setBatteryLevel] = useState<number>(75);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [chargingTime, setChargingTime] = useState<number | null>(null);
  const [dischargingTime, setDischargingTime] = useState<number | null>(null);
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: any = await (navigator as any).getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
          setChargingTime(battery.chargingTime);
          setDischargingTime(battery.dischargingTime);

          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });

          battery.addEventListener('chargingchange', () => {
            setIsCharging(battery.charging);
          });
        } catch (error) {
          setSupported(false);
        }
      } else {
        setSupported(false);
      }
    };

    getBatteryInfo();
  }, []);

  const getBatteryColor = () => {
    if (isCharging) return '#4CAF50';
    if (batteryLevel > 50) return '#4CAF50';
    if (batteryLevel > 20) return '#FF9800';
    return '#f44336';
  };

  const getBatteryIcon = () => {
    if (isCharging) return <BatteryCharging className="w-16 h-16" style={{ color: getBatteryColor() }} />;
    if (batteryLevel < 20) return <BatteryWarning className="w-16 h-16" style={{ color: getBatteryColor() }} />;
    return <Battery className="w-16 h-16" style={{ color: getBatteryColor() }} />;
  };

  return (
    <ToolLayout
      title="Battery Info"
      description="Check battery status and health"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {!supported ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
            <BatteryWarning className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="text-yellow-800 dark:text-yellow-300">
              Battery API is not supported in your browser. Using demo data.
            </p>
          </div>
        ) : null}

        {/* Battery Level Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ 
                scale: isCharging ? [1, 1.05, 1] : 1,
              }}
              transition={{ 
                repeat: isCharging ? Infinity : 0,
                duration: 1.5 
              }}
            >
              {getBatteryIcon()}
            </motion.div>
            
            <div className="text-center mt-6 mb-8">
              <p className="text-6xl mb-2" style={{ color: getBatteryColor() }}>
                {batteryLevel}%
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {isCharging ? 'Charging' : 'On Battery'}
              </p>
            </div>

            <div className="w-full max-w-md">
              <Progress value={batteryLevel} className="h-3" />
            </div>
          </div>
        </div>

        {/* Battery Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Battery Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Status</span>
              <span className="text-gray-900 dark:text-white">
                {isCharging ? 'Charging' : 'Discharging'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Level</span>
              <span className="text-gray-900 dark:text-white">{batteryLevel}%</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Health</span>
              <span className="text-gray-900 dark:text-white">
                {batteryLevel > 80 ? 'Excellent' : batteryLevel > 50 ? 'Good' : 'Fair'}
              </span>
            </div>

            {isCharging && chargingTime !== Infinity && chargingTime !== null && (
              <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Time to Full</span>
                <span className="text-gray-900 dark:text-white">
                  {Math.round(chargingTime / 60)} minutes
                </span>
              </div>
            )}

            {!isCharging && dischargingTime !== Infinity && dischargingTime !== null && (
              <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Time Remaining</span>
                <span className="text-gray-900 dark:text-white">
                  {Math.round(dischargingTime / 60)} minutes
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl shadow-md p-6 text-white">
          <h3 className="mb-3">Battery Tips</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Keep battery level between 20% and 80% for optimal health</li>
            <li>• Avoid extreme temperatures</li>
            <li>• Enable battery saver mode when low on charge</li>
            <li>• Reduce screen brightness to extend battery life</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
