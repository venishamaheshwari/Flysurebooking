import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRate: number;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  
  // In a real application, you would fetch exchange rates from an API
  // For this demo, we'll use mock rates
  const mockRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.8,
    CAD: 1.36,
    AUD: 1.52,
    INR: 83.42,
    SGD: 1.35,
  };
  
  useEffect(() => {
    // Update exchange rate when currency changes
    setExchangeRate(mockRates[currency] || 1);
  }, [currency]);
  
  const formatCurrency = (amount: number): string => {
    const convertedAmount = amount * exchangeRate;
    
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    
    return new Intl.NumberFormat('en-US', formatOptions).format(convertedAmount);
  };
  
  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate,
        formatCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
};