import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { FormProviderProps } from "../../types";
import { FormContext } from "../context/FormContext";
import { useEffect } from "react";

export function FormProvider<T extends object = any>({
  setFormApi,
  children,
  funSubmit,
  className,
}: FormProviderProps<T>) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmit: SubmitHandler<T> = (data) => {
    funSubmit(data);
  };

  const values = useWatch({ control });

  const contextValue = {
    register,
    errors,
    control,
    values,
  };

  useEffect(() => {
    setFormApi && setFormApi({ control, register, errors, values });
  }, [setFormApi, control, register, errors, values]);

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
