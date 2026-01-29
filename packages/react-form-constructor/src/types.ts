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
} & (
  | {
      formData: FormField<T>[];
      children?: never;
    }
  | {
      formData?: never;
      children: React.ReactNode;
    }
);
