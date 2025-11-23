import React from 'react';
import { InputText } from './input-text';
import { Eye, EyeClosed } from 'lucide-react';

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputPassword(props: InputPasswordProps) {
  const { value, onChange, name } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <InputText
        {...props}
        type={showPassword ? 'text' : 'password'}
        name={name ?? 'password'}
        value={value}
        onChange={onChange}
        placeholder={props.placeholder}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <Eye /> : <EyeClosed className="line-through" />}
      </button>
    </div>
  );
}
