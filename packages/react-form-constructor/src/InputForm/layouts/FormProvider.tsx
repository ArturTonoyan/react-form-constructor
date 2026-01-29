import { SubmitHandler, useForm } from "react-hook-form";
import { FormProviderProps } from "../../types";
import { FormContext } from "../../ProviderMethod/context/FormContext";

export function FormProvider<T extends object = any>({
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

  const contextValue = {
    register,
    errors,
    control,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
