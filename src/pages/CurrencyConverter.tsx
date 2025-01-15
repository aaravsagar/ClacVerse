import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, ArrowUpDown } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore'

interface CurrencyData {
  rates: Record<string, number>;
  lastUpdated: Date;
}

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

const CURRENCIES = {
  USD: { name: 'US Dollar', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'British Pound', symbol: '£' },
  JPY: { name: 'Japanese Yen', symbol: '¥' },
  AUD: { name: 'Australian Dollar', symbol: 'A$' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$' },
  CHF: { name: 'Swiss Franc', symbol: 'Fr' },
  CNY: { name: 'Chinese Yuan', symbol: '¥' },
  INR: { name: 'Indian Rupee', symbol: '₹' },
  NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' },
  BRL: { name: 'Brazilian Real', symbol: 'R$' },
  RUB: { name: 'Russian Ruble', symbol: '₽' },
  ZAR: { name: 'South African Rand', symbol: 'R' },
  MXN: { name: 'Mexican Peso', symbol: '$' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$' },
  HKD: { name: 'Hong Kong Dollar', symbol: 'HK$' },
  SEK: { name: 'Swedish Krona', symbol: 'kr' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr' },
  DKK: { name: 'Danish Krone', symbol: 'kr' },
  PLN: { name: 'Polish Złoty', symbol: 'zł' },
  THB: { name: 'Thai Baht', symbol: '฿' },
  KRW: { name: 'South Korean Won', symbol: '₩' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ' },
  SAR: { name: 'Saudi Riyal', symbol: '﷼' },
  TRY: { name: 'Turkish Lira', symbol: '₺' },
  ILS: { name: 'Israeli Shekel', symbol: '₪' },
  PHP: { name: 'Philippine Peso', symbol: '₱' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM' },
  VND: { name: 'Vietnamese Dong', symbol: '₫' },
  CZK: { name: 'Czech Koruna', symbol: 'Kč' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft' },
  PKR: { name: 'Pakistani Rupee', symbol: '₨' },
  EGP: { name: 'Egyptian Pound', symbol: 'E£' },
} as const;

const CurrencyConverter: React.FC = () => {
  const { theme } = useThemeStore();
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch currency rates');
        }
        const data = await response.json();
        setCurrencyData({
          rates: data.rates,
          lastUpdated: new Date(),
        });
      } catch (error) {
        setError('Failed to fetch currency rates. Please try again later.');
        console.error('Failed to fetch currency rates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOnline) {
      fetchRates();
      // Refresh rates every 30 minutes
      const interval = setInterval(fetchRates, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const convertCurrency = (): string => {
    if (!currencyData?.rates || !amount) return '0';
    
    const fromRate = currencyData.rates[fromCurrency];
    const toRate = currencyData.rates[toCurrency];
    const result = (Number(amount) / fromRate) * toRate;
    
    return result.toFixed(2);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currentTheme = THEMES[theme as keyof typeof THEMES] || THEMES.dark;

  return (
    <div className="p-4 space-y-4">
      {!isOnline && (
        <div className="flex items-center bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Please connect to the internet to fetch the latest currency rates.</span>
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className={`rounded-2xl ${currentTheme.card} backdrop-blur-sm border border-white/10 p-6`}>
        <div className="space-y-6">
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
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className={`mt-1 text-lg ${currentTheme.text} bg-transparent border-none focus:outline-none focus:ring-0 opacity-60`}
              >
                {Object.entries(CURRENCIES).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {code} - {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSwapCurrencies}
                className={`p-2 rounded-full ${currentTheme.hover}`}
              >
                <ArrowUpDown className={`w-5 h-5 ${currentTheme.accent}`} />
              </button>
              <button
                onClick={() => window.location.reload()}
                className={`p-2 rounded-full ${currentTheme.hover}`}
                disabled={isLoading}
              >
                <RefreshCw className={`w-5 h-5 ${currentTheme.accent} ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <div className={`text-4xl font-medium ${currentTheme.text}`}>
                {CURRENCIES[toCurrency as keyof typeof CURRENCIES].symbol}
                {convertCurrency()}
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className={`mt-1 text-lg ${currentTheme.text} bg-transparent border-none focus:outline-none focus:ring-0 opacity-60`}
              >
                {Object.entries(CURRENCIES).map(([code, { name }]) => (
                  <option key={code} value={code} className="bg-gray-900">
                    {code} - {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`text-sm ${currentTheme.text} opacity-60`}>
            1 {fromCurrency} = {currencyData?.rates ? 
              (currencyData.rates[toCurrency] / currencyData.rates[fromCurrency]).toFixed(4) : '...'} {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;