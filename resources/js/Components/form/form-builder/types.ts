export type FormFieldType =
  | 'short_text'
  | 'long_text'
  | 'radio'
  | 'checkbox'
  | 'date';

export interface FormFieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[]; // For radio and checkbox
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface FormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
  disabled?: boolean;
}
