import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "./InputForm/InputForm";
import { FormLayoutProps } from "./types";
import { FormProvider } from "./FormContext";

export function FormLayout<T extends object = any>({
  formData,
  funSubmit,
  formClass,
  buttonClass,
  children,
}: FormLayoutProps<T>) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmit: SubmitHandler<T> = (data) => {
    funSubmit(data);
  };

  return (
    <FormProvider value={{ control, register, errors }}>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        {formData
          ? formData.map((item) => (
              <InputForm
                key={String(item.key)}
                type={item.type}
                placeholder={item.placeholder}
                error={errors}
                name={String(item.key) as any}
                label={item.label}
                control={control}
                maska={item.maska}
                register={register(item.key as any, {
                  required: item.required,
                  minLength: item.minLength,
                  maxLength: item.maxLength,
                  pattern: item.pattern,
                  validate: item.validate,
                })}
                required={item.required}
                inputClass={item.inputClass}
                errorClass={item.errorClass}
                labelClass={item.labelClass}
              />
            ))
          : children}
        <button type="submit" className={buttonClass}>
          Отправить
        </button>
      </form>
    </FormProvider>
  );
}
