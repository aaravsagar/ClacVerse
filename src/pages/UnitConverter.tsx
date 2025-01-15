import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

type UnitType = 'length' | 'area' | 'volume' | 'speed' | 'weight' | 'temperature' | 'power' | 'pressure';

const THEMES = {
  light: {
    card: 'bg-white/10',
    text: 'text-gray-800',
    input: 'bg-white/5 border-gray-200/20',
    hover: 'hover:bg-white/5',
    accent: 'text-blue-500',
  },
  dark: {
    card: 'bg-black/20',
    text: 'text-gray-100',
    input: 'bg-black/20 border-white/10',
    hover: 'hover:bg-black/20',
    accent: 'text-emerald-400',
  },
};

type Unit = {
  name: string;
  ratio: number;
};

type UnitTypeDefinition = {
  name: string;
  units: Record<string, Unit>;
};

const UNIT_TYPES: Record<UnitType, UnitTypeDefinition> = {
  length: {
    name: 'Length',
    units: {
      m: { name: 'Meters', ratio: 1 },
      km: { name: 'Kilometers', ratio: 1000 },
      cm: { name: 'Centimeters', ratio: 0.01 },
      mm: { name: 'Millimeters', ratio: 0.001 },
      mi: { name: 'Miles', ratio: 1609.34 },
      yd: { name: 'Yards', ratio: 0.9144 },
      ft: { name: 'Feet', ratio: 0.3048 },
      in: { name: 'Inches', ratio: 0.0254 },
    },
  },
  area: {
    name: 'Area',
    units: {
      m2: { name: 'Square Meters', ratio: 1 },
      km2: { name: 'Square Kilometers', ratio: 1000000 },
      cm2: { name: 'Square Centimeters', ratio: 0.0001 },
      ha: { name: 'Hectares', ratio: 10000 },
      ac: { name: 'Acres', ratio: 4046.86 },
      ft2: { name: 'Square Feet', ratio: 0.092903 },
    },
  },
  volume: {
    name: 'Volume',
    units: {
      l: { name: 'Liters', ratio: 1 },
      ml: { name: 'Milliliters', ratio: 0.001 },
      m3: { name: 'Cubic Meters', ratio: 1000 },
      gal: { name: 'Gallons (US)', ratio: 3.78541 },
      qt: { name: 'Quarts (US)', ratio: 0.946353 },
      pt: { name: 'Pints (US)', ratio: 0.473176 },
    },
  },
  speed: {
    name: 'Speed',
    units: {
      mps: { name: 'Meters per Second', ratio: 1 },
      kph: { name: 'Kilometers per Hour', ratio: 0.277778 },
      mph: { name: 'Miles per Hour', ratio: 0.44704 },
      knot: { name: 'Knots', ratio: 0.514444 },
    },
  },
  weight: {
    name: 'Weight',
    units: {
      kg: { name: 'Kilograms', ratio: 1 },
      g: { name: 'Grams', ratio: 0.001 },
      mg: { name: 'Milligrams', ratio: 0.000001 },
      lb: { name: 'Pounds', ratio: 0.453592 },
      oz: { name: 'Ounces', ratio: 0.0283495 },
      ton: { name: 'Metric Tons', ratio: 1000 },
    },
  },
  temperature: {
    name: 'Temperature',
    units: {
      c: { name: 'Celsius', ratio: 1 },
      f: { name: 'Fahrenheit', ratio: 1 },
      k: { name: 'Kelvin', ratio: 1 },
    },
  },
  power: {
    name: 'Power',
    units: {
      w: { name: 'Watts', ratio: 1 },
      kw: { name: 'Kilowatts', ratio: 1000 },
      hp: { name: 'Horsepower', ratio: 745.7 },
      mw: { name: 'Megawatts', ratio: 1000000 },
    },
  },
  pressure: {
    name: 'Pressure',
    units: {
      pa: { name: 'Pascal', ratio: 1 },
      kpa: { name: 'Kilopascal', ratio: 1000 },
      bar: { name: 'Bar', ratio: 100000 },
      psi: { name: 'PSI', ratio: 6894.76 },
      atm: { name: 'Atmosphere', ratio: 101325 },
    },
  },
};

const UnitConverter: React.FC = () => {
  const { theme } = useThemeStore();
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>(Object.keys(UNIT_TYPES[unitType].units)[0]);
  const [toUnit, setToUnit] = useState<string>(Object.keys(UNIT_TYPES[unitType].units)[1]);

  const currentTheme = THEMES[theme as keyof typeof THEMES] || THEMES.dark;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleUnitTypeChange = (type: UnitType) => {
    setUnitType(type);
    const units = Object.keys(UNIT_TYPES[type].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convert = (): string => {
    if (!amount) return '0';
    const value = parseFloat(amount);

    if (unitType === 'temperature') {
      // Special handling for temperature
      if (fromUnit === 'c' && toUnit === 'f') {
        return ((value * 9 / 5) + 32).toFixed(2);
      } else if (fromUnit === 'f' && toUnit === 'c') {
        return ((value - 32) * 5 / 9).toFixed(2);
      } else if (fromUnit === 'c' && toUnit === 'k') {
        return (value + 273.15).toFixed(2);
      } else if (fromUnit === 'k' && toUnit === 'c') {
        return (value - 273.15).toFixed(2);
      } else if (fromUnit === 'f' && toUnit === 'k') {
        return ((value - 32) * 5 / 9 + 273.15).toFixed(2);
      } else if (fromUnit === 'k' && toUnit === 'f') {
        return ((value - 273.15) * 9 / 5 + 32).toFixed(2);
      }
      return value.toFixed(2);
    }

    const fromRatio = UNIT_TYPES[unitType].units[fromUnit].ratio;
    const toRatio = UNIT_TYPES[unitType].units[toUnit].ratio;
    return ((value * fromRatio) / toRatio).toFixed(4);
  };

  return (
    <div className="p-4 space-y-4">
      <div className={`rounded-2xl ${currentTheme.card} backdrop-blur-sm border border-white/10 p-6`}>
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-2 mb-6">
            {(Object.keys(UNIT_TYPES) as UnitType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleUnitTypeChange(type)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${unitType === type 
                    ? `${currentTheme.accent} ${currentTheme.hover}`
                    : `${currentTheme.text} opacity-60 hover:opacity-100`
                  }`}
              >
                {UNIT_TYPES[type].name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className={`w-full text-4xl font-medium ${currentTheme.text} bg-transparent border-none focus:outline-none focus:ring-0`}
                placeholder="0"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className={`mt-1 text-lg ${currentTheme.text} bg-transparent border-none focus:outline-none focus:ring-0 opacity-60`}
              >
                {Object.entries(UNIT_TYPES[unitType].units).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSwapUnits}
              className={`p-2 rounded-full ${currentTheme.hover}`}
            >
              <ArrowUpDown className={`w-5 h-5 ${currentTheme.accent}`} />
            </button>
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <div className={`text-4xl font-medium ${currentTheme.text}`}>
                {convert()}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className={`mt-1 text-lg ${currentTheme.text} bg-transparent border-none focus:outline-none focus:ring-0 opacity-60`}
              >
                {Object.entries(UNIT_TYPES[unitType].units).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`text-sm ${currentTheme.text} opacity-60`}>
            1 {UNIT_TYPES[unitType].units[fromUnit]?.name} = {' '}
            {unitType === 'temperature' ? '...' : 
              (UNIT_TYPES[unitType].units[fromUnit]?.ratio / UNIT_TYPES[unitType].units[toUnit]?.ratio).toFixed(4)
            } {UNIT_TYPES[unitType].units[toUnit]?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
