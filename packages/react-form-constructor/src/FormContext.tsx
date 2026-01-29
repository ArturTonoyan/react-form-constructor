import { createContext, useContext } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormContextValue<T extends object = any> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const FormContext = createContext<FormContextValue | null>(null);

export const FormProvider = FormContext.Provider;

export function useFormContext<T extends object = any>(): FormContextValue<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormLayout");
  }
  return context as FormContextValue<T>;
}
