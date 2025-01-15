import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';

// Theme details with sample background colors or illustrations for previews
const themes = [
  { id: 'light', name: 'Light', sampleColor: 'bg-white text-black' },
  { id: 'dark', name: 'Dark', sampleColor: 'bg-gray-900 text-white' },
  { id: 'nord', name: 'Nord', sampleColor: 'bg-blue-900 text-cyan-300' },
  { id: 'dracula', name: 'Dracula', sampleColor: 'bg-purple-800 text-pink-400' },
  { id: 'solarized', name: 'Solarized', sampleColor: 'bg-yellow-100 text-blue-900' },
];

const Settings: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleApplyTheme = () => {
    setTheme(selectedTheme); // Apply the selected theme
  };

  return (
    <div className="h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      <div className="max-w-md">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <div className="space-y-4">
          {themes.map(({ id, name, sampleColor }) => (
            <button
              key={id}
              onClick={() => setSelectedTheme(id)} // Update the selected theme
              className={`w-full p-4 rounded-lg border ${selectedTheme === id ? 'border-blue-500' : 'border-gray-300'} transition-colors`}
            >
              <div className={`flex items-center justify-between ${sampleColor} p-4 rounded-md`}>
                <span className="font-semibold">{name}</span>
                {/* Sample illustration */}
                <div className="w-10 h-10 rounded-full bg-opacity-50" style={{ backgroundColor: sampleColor }}></div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleApplyTheme}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Settings;
