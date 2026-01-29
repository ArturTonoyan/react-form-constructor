import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormDate({
  placeholder,
  className,
  classNameError,
  min,
  max,
  type = "date",
}: {
  placeholder?: string;
  className?: string;
  classNameError?: string;
  min?: string;
  max?: string;
  type?: "date" | "datetime-local" | "time" | "month" | "week";
}) {
  const { register, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <input
      id={name}
      type={type}
      {...register(name, {
        required: required,
        validate: validate,
      })}
      placeholder={placeholder ? placeholder : ""}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      min={min}
      max={max}
    />
  );
}

export default FormDate;
