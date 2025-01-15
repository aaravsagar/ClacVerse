import React, { useState, useEffect, useRef } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { cn } from '../lib/utils';
import { History, X, Trash2 } from 'lucide-react'; // Import icons

const Calculator: React.FC = () => {
  const { theme } = useThemeStore();
  const historyDialogRef = useRef<HTMLDivElement>(null);

  // Define theme-specific classes with no background color
  const themeClasses: Record<string, string> = {
    light: 'text-black',
    dark: 'text-white',
    nord: 'text-cyan-300',
    dracula: 'text-pink-400',
    solarized: 'text-blue-900',
  };

  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<{ calculation: string, result: string, date: string }[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; index: number | null }>({ visible: false, x: 0, y: 0, index: null });

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('');
      setResult(null);
    } else if (value === '=') {
      try {
        const result = eval(input); // Note: Avoid using `eval` in production for security reasons.
        setResult(result);
        // Store the result in history
        const newHistory = {
          calculation: input,
          result: result.toString(),
          date: new Date().toLocaleString(),
        };
        const updatedHistory = [newHistory, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory));
        setInput('');
      } catch {
        setResult(NaN);
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '.', '(', ')'];
    if (validKeys.includes(event.key)) {
      setInput((prev) => prev + event.key);
    } else if (event.key === 'Enter') {
      handleButtonClick('=');
    } else if (event.key === 'Backspace') {
      setInput(input.slice(0, -1));
    }
  };

  const handleHistoryToggle = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory));
    setContextMenu({ visible: false, x: 0, y: 0, index: null }); // Close the context menu
  };

  const handleDeleteAllHistory = () => {
    setHistory([]);
    localStorage.setItem('calculatorHistory', JSON.stringify([]));
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+', '(', ')', '.'];

  const handleContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, index });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, index: null });
  };

  // Close context menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyDialogRef.current && !historyDialogRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <div className={`h-full p-4 transition-all ${themeClasses[theme] || themeClasses.light}`}>
      <h1 className="text-2xl font-bold mb-4">Calculator</h1>
      <div className="relative">
        {/* History Icon Button */}
        <button
          onClick={handleHistoryToggle}
          className="absolute top-4 right-4 p-2 text-xl text-gray-700 hover:text-gray-900"
        >
          <History />
        </button>

        <div className="rounded-lg p-4 w-72 mx-auto shadow-md border border-border">
          <div className="mb-4 pb-2 text-right border-b border-border">
            <div className="text-sm text-gray-500">{input || '0'}</div>
            <div className="text-2xl font-bold">{result !== null ? result : ''}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className="p-3 rounded-lg font-semibold bg-transparent hover:bg-gray-300 text-current shadow-md"
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History Slide Panel */}
      <div
        ref={historyDialogRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isHistoryOpen ? 'translate-x-0' : 'translate-x-full'} ${themeClasses[theme]}`}
      >
        {/* Close Button */}
        <button
          onClick={handleHistoryToggle}
          className="absolute top-4 right-4 p-2 text-xl text-gray-700 hover:text-gray-900"
        >
          <X />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <ul>
            {history.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 mb-2 border-b group"
                onContextMenu={(e) => handleContextMenu(e, index)}
              >
                <div>
                  <div className="font-medium">{entry.calculation}</div>
                  <div className="text-sm text-gray-500">{entry.result}</div>
                  <div className="text-xs text-gray-400">{entry.date}</div>
                </div>
                {/* Right-click delete button */}
                {contextMenu.visible && contextMenu.index === index && (
                  <button
                    onClick={() => handleDeleteHistory(index)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Delete All Button */}
        <button
          onClick={handleDeleteAllHistory}
          className="absolute bottom-4 right-4 p-3 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600"
        >
          <Trash2 />
        </button>
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="absolute z-10 bg-white border border-gray-300 shadow-lg rounded-lg"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => handleDeleteHistory(contextMenu.index!)}
            className="block p-2 text-red-500 hover:bg-red-100 w-full text-left"
          >
            Delete This History
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
