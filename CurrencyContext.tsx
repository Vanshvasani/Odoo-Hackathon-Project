import { createContext, useContext, useState, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // rate relative to USD
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.5 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 35.2 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: CURRENCIES[0],
  setCurrency: () => {},
  format: (n) => `$${n}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('wandr-currency');
    return CURRENCIES.find(c => c.code === saved) || CURRENCIES[0];
  });

  const setCurrency = (c: Currency) => {
    localStorage.setItem('wandr-currency', c.code);
    setCurrencyState(c);
  };

  const format = (usd: number) => {
    const converted = usd * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
