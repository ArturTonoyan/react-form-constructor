import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Control,
} from "react-hook-form";

export type FormField<T extends object = any> = {
  label: string;
  placeholder: string;
  key: keyof T;
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: any;
  type?: string;
  maska?: { required: string; format: string; mask: string };
  textarea?: boolean;
  register?: { [key: string]: any };
  inputClass?: any;
  errorClass?: any;
  labelClass?: any;
};

export type FormLayoutProps<T extends object = any> = {
  funSubmit: (data: T) => void;
  formClass?: string;
  buttonClass?: string;
  buttonName?: string;
  formData: FormField<T>[];
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
