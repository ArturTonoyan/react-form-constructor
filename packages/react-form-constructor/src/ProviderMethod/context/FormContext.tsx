import React from "react";
import { FormContextType } from "../../types";

export const FormContext = React.createContext<
  FormContextType<any> | undefined
>(undefined);

export function useFormContext<T extends Record<string, any> = any>() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext должен использоваться внутри FormProvider");
  }
  return context as FormContextType<T>;
}
