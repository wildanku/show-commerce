'use client';

import * as React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { InputText } from './input-text';
import { SelectOptionType } from './async-select';

export interface SelectProps {
  name?: string;
  placeholder?: string;
  defaultValue?: string | number | null;
  clearable?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  options: SelectOptionType[];
  className?: string;
  onChange?: (selectedOption: SelectOptionType | null) => void;
}

export function Select({
  options,
  placeholder = 'Select...',
  defaultValue = null,
  clearable = false,
  onChange,
  disabled = false,
  searchable = false,
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<SelectOptionType | null>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const selectRef = React.useRef<HTMLDivElement>(null);

  // Update the selected value and input display when defaultValue changes
  React.useEffect(() => {
    const initialOption =
      options.find((option) => option.value === defaultValue) || null;
    setValue(initialOption);
    setInputValue(initialOption?.label || '');
  }, [defaultValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (option: SelectOptionType) => {
    setValue(option);
    setInputValue(option.label);
    setOpen(false);
    onChange?.(option); // Trigger the onChange callback
  };

  const handleClear = () => {
    setValue(null);
    setInputValue('');
    onChange?.(null); // Trigger the onChange callback with null
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    searchable
      ? option.label.toLowerCase().includes(inputValue.toLowerCase())
      : true
  );

  return (
    <div className="relative w-full" ref={selectRef}>
      <div className="flex items-center relative">
        <InputText
          name={name ?? ''}
          type="text"
          className={className}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          onClick={() => setOpen(true)}
          onChange={searchable ? handleInputChange : undefined}
          readOnly={!searchable}
        />

        <div className="absolute h-full top-0 right-0">
          <div className="flex h-full gap-1 p-2">
            {clearable && value && (
              <button
                onClick={handleClear}
                className="text-red-500 hover:text-gray-700 border-r pr-1"
              >
                <X size={18} />
              </button>
            )}
            <div className="flex items-center">
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <p className="p-2 text-gray-500">No options found.</p>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
