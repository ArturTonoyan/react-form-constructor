import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormLayoutProps } from "../types";

export function FormLayout<T extends object = any>({
  formData,
  funSubmit,
  formClass,
  buttonClass,
  buttonName,
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
    <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
      {formData.map((item) => (
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
      ))}
      <button type="submit" className={buttonClass}>
        {buttonName || "Submit"}
      </button>
    </form>
  );
}
