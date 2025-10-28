import { useState } from 'react';
import { motion } from 'motion/react';
import ToolLayout from '../ToolLayout';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calculator } from 'lucide-react';

type UnitConverterProps = {
  onBack: () => void;
};

const conversions = {
  length: {
    units: ['Meters', 'Kilometers', 'Miles', 'Feet', 'Inches', 'Centimeters'],
    toBase: { Meters: 1, Kilometers: 1000, Miles: 1609.34, Feet: 0.3048, Inches: 0.0254, Centimeters: 0.01 },
  },
  weight: {
    units: ['Kilograms', 'Grams', 'Pounds', 'Ounces', 'Tons'],
    toBase: { Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495, Tons: 1000 },
  },
  temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    convert: (value: number, from: string, to: string) => {
      let celsius = value;
      if (from === 'Fahrenheit') celsius = (value - 32) * 5/9;
      if (from === 'Kelvin') celsius = value - 273.15;
      
      if (to === 'Fahrenheit') return celsius * 9/5 + 32;
      if (to === 'Kelvin') return celsius + 273.15;
      return celsius;
    }
  },
  currency: {
    units: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR'],
    rates: { USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110, CNY: 6.45, INR: 74.5 },
  },
};

export default function UnitConverter({ onBack }: UnitConverterProps) {
  const [activeTab, setActiveTab] = useState('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Kilometers');
  const [result, setResult] = useState('0.001');

  const handleConvert = (val: string, from: string, to: string, category: string) => {
    const numValue = parseFloat(val) || 0;
    
    if (category === 'temperature') {
      const converted = conversions.temperature.convert(numValue, from, to);
      setResult(converted.toFixed(2));
    } else if (category === 'currency') {
      const rates = conversions.currency.rates as any;
      const converted = (numValue / rates[from]) * rates[to];
      setResult(converted.toFixed(2));
    } else {
      const toBase = (conversions[category as 'length' | 'weight'].toBase as any);
      const baseValue = numValue * toBase[from];
      const converted = baseValue / toBase[to];
      setResult(converted.toFixed(4));
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    handleConvert(newValue, fromUnit, toUnit, activeTab);
  };

  const handleFromUnitChange = (newFrom: string) => {
    setFromUnit(newFrom);
    handleConvert(value, newFrom, toUnit, activeTab);
  };

  const handleToUnitChange = (newTo: string) => {
    setToUnit(newTo);
    handleConvert(value, fromUnit, newTo, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const units = tab === 'temperature' 
      ? conversions.temperature.units 
      : tab === 'currency'
      ? conversions.currency.units
      : conversions[tab as 'length' | 'weight'].units;
    setFromUnit(units[0]);
    setToUnit(units[1]);
    handleConvert(value, units[0], units[1], tab);
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert currency, length, weight, and temperature"
      onBack={onBack}
      color="#4CAF50"
    >
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="length">Length</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="temperature">Temp</TabsTrigger>
              <TabsTrigger value="currency">Currency</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 space-y-4">
              {/* From */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">From</label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    placeholder="Enter value"
                  />
                  <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(activeTab === 'temperature' 
                        ? conversions.temperature.units 
                        : activeTab === 'currency'
                        ? conversions.currency.units
                        : conversions[activeTab as 'length' | 'weight'].units
                      ).map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">To</label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    value={result}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-700"
                  />
                  <Select value={toUnit} onValueChange={handleToUnitChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(activeTab === 'temperature' 
                        ? conversions.temperature.units 
                        : activeTab === 'currency'
                        ? conversions.currency.units
                        : conversions[activeTab as 'length' | 'weight'].units
                      ).map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg p-6 text-white mt-6">
                <p className="text-sm opacity-90 mb-1">Result</p>
                <p className="text-2xl">
                  {value} {fromUnit} = {result} {toUnit}
                </p>
              </div>
            </div>
          </Tabs>
        </div>

        {activeTab === 'currency' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Note:</strong> Exchange rates are static for demo purposes. Use a real API like exchangerate-api.com for live rates.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
