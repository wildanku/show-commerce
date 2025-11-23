import { cn } from '@/lib/utils';
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  className?: string;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputText(props: TextInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500',
        props.className
      )}
      placeholder={props.placeholder}
    />
  );
}
