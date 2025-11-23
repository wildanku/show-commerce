'use client';

import * as React from 'react';
import debounce from 'lodash.debounce';
import { ChevronDown, X } from 'lucide-react';
import { InputText } from './input-text';

export interface SelectOptionType {
  label: string;
  value: string;
}

export interface AsyncSelectProps {
  name?: string;
  placeholder?: string;
  defaultOptions?: boolean;
  defaultValue?: SelectOptionType | null;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  loadOptions: (inputValue: string) => Promise<SelectOptionType[]>;
  onChange?: (selectedOption: SelectOptionType | null) => void;
}

export function AsyncSelect({
  loadOptions,
  placeholder = 'Select...',
  defaultOptions = false,
  defaultValue = null,
  clearable = false,
  onChange,
  disabled = false,
  className,
}: AsyncSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<SelectOptionType | null>(
    defaultValue
  );
  const [options, setOptions] = React.useState<SelectOptionType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(
    defaultValue?.label || ''
  );
  const selectRef = React.useRef<HTMLDivElement>(null);

  const fetchOptions = React.useMemo(
    () =>
      debounce(async (input: string) => {
        if (!input && !defaultOptions) {
          setOptions([]);
          return;
        }

        setLoading(true);
        try {
          const newOptions = await loadOptions(input);
          setOptions(newOptions);
        } catch (error) {
          console.error('Error loading options:', error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      }, 300),
    [loadOptions, defaultOptions]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchOptions(value);
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
    setOptions([]);
    onChange?.(null); // Trigger the onChange callback with null
  };

  React.useEffect(() => {
    if (defaultOptions) {
      fetchOptions('');
    }
  }, [defaultOptions, fetchOptions]);

  // Update state when defaultValue changes
  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setInputValue(defaultValue.label);
    }
  }, [defaultValue]);

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

  React.useEffect(() => {
    return () => {
      fetchOptions.cancel();
    };
  }, [fetchOptions]);

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
          onChange={handleInputChange}
        />

        <div className="absolute top-0 h-full right-0">
          <div className="flex h-full gap-1 p-2">
            {clearable && value && (
              <button
                onClick={handleClear}
                className=" text-red-500 hover:text-gray-700 border-r pr-1"
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
            {loading ? (
              <p className="p-2 text-gray-500">Loading...</p>
            ) : (
              <>
                {options.length === 0 ? (
                  <p className="p-2 text-gray-500">No options found.</p>
                ) : (
                  options.map((option) => (
                    <div
                      key={option.value}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
