import React from "react";

type FormInputLayoutContextValue = {
  name: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  required?: string;
  validate?: (value: any) => boolean | string;
  maska?: { required: string; format: string; mask: string };
};

const FormInputLayoutContext = React.createContext<
  FormInputLayoutContextValue | undefined
>(undefined);

export function useInputLayoutContext() {
  const context = React.useContext(FormInputLayoutContext);
  if (!context) {
    throw new Error(
      "useInputLayoutContext должен использоваться внутри FormInputLayout",
    );
  }
  return context;
}

export function useOptionalInputLayoutContext() {
  return React.useContext(FormInputLayoutContext);
}

interface FormInputProps {
  name: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  required?: string;
  validate?: (value: any) => boolean | string;
  children: React.ReactNode;
  labelClass?: string;
  errorClass?: string;
  className?: string;
  maska?: { required: string; format: string; mask: string };
}

function FormInputLayout({
  name,
  minLength,
  maxLength,
  pattern,
  required,
  validate,
  children,
  className,
  maska,
}: FormInputProps) {
  const contextValue = {
    name,
    minLength,
    maxLength,
    pattern,
    required,
    validate,
    maska,
  };

  return (
    <FormInputLayoutContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </FormInputLayoutContext.Provider>
  );
}

export default FormInputLayout;
