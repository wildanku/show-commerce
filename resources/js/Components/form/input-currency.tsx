import { cn } from '@/lib/utils';
import React from 'react';

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value: number | string;
  onChange?: (value: number) => void;
  name: string;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputCurrency(props: CurrencyInputProps) {
  const { value, onChange, className, ...restProps } = props;
  const [displayValue, setDisplayValue] = React.useState('');

  // Format number with comma separators
  const formatNumber = (num: string | number): string => {
    const numStr = num.toString().replace(/,/g, '');
    if (numStr === '' || numStr === '.') return numStr;

    const parts = numStr.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1] !== undefined ? '.' + parts[1] : '';

    return integerPart + decimalPart;
  };

  // Parse formatted number to actual number
  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Update display value when value prop changes
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      setDisplayValue(formatNumber(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string
    if (inputValue === '') {
      setDisplayValue('');
      if (onChange) onChange(0);
      return;
    }

    // Only allow numbers, commas, and one decimal point
    const regex = /^[\d,]*\.?\d*$/;
    if (!regex.test(inputValue)) {
      return;
    }

    // Remove commas for validation
    const cleanValue = inputValue.replace(/,/g, '');

    // Validate decimal places (max 2)
    const parts = cleanValue.split('.');
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setDisplayValue(formatNumber(cleanValue));

    if (onChange) {
      onChange(parseNumber(inputValue));
    }
  };

  const handleBlur = () => {
    // Format the final value on blur
    if (displayValue) {
      const num = parseNumber(displayValue);
      setDisplayValue(formatNumber(num.toFixed(2)));
    }
  };

  return (
    <input
      {...restProps}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500',
        className
      )}
    />
  );
}
