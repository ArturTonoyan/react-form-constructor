import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Control,
} from "react-hook-form";

export type FormFieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "file"
  | "range"
  | "mask";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface RadioOption {
  value: string | number;
  label: string;
}

export type FormField<T extends object = any> = {
  key: keyof T;
  label?: string;
  placeholder?: string;
  type?: FormFieldType;
  required?: string | boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
  maska?: { required: string; format: string; mask: string };
  // Select specific
  options?: SelectOption[];
  multiple?: boolean;
  // Checkbox/Radio specific
  radioOptions?: RadioOption[];
  defaultChecked?: boolean;
  // File specific
  accept?: string;
  // Range specific
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  // Styling
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  classNameError?: string;
  // Custom render
  render?: (props: any) => React.ReactNode;
  // Additional props
  disabled?: boolean;
  [key: string]: any;
};

export type FormLayoutProps<T extends object = any> = {
  formData: FormField<T>[];
  funSubmit: (data: T) => void;
  defaultValues?: T | Partial<T>;
  onError?: (errors: any) => void;
  // Styling
  formClass?: string;
  containerClass?: string;
  buttonClass?: string;
  buttonName?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  // Button
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  disabledOnError?: boolean;
};

export type FormProviderProps<T extends object = any> = {
  setFormApi?: (formMethods: any) => void;
  children: React.ReactNode;
  funSubmit: (data: T) => void;
  className?: string;
};

export type FormContextType<T extends FieldValues = any> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  defaultValues?: T;
  values?: T;
};
