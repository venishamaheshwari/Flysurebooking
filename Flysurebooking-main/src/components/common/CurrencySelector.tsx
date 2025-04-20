import React, { useRef, useEffect } from 'react';
import { useCurrencyContext } from '../../contexts/CurrencyContext';

interface CurrencySelectorProps {
  onClose: () => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onClose }) => {
  const { currency, setCurrency } = useCurrencyContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  ];
  
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={dropdownRef}
      className="absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="py-1 max-h-80 overflow-y-auto">
        {currencies.map((curr) => (
          <button
            key={curr.code}
            className={`w-full text-left px-4 py-2 text-sm flex justify-between items-center ${
              currency === curr.code ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleCurrencyChange(curr.code)}
          >
            <span>{curr.name}</span>
            <span className="font-medium">{curr.symbol} {curr.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;