import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormNumber({
  placeholder,
  className,
  classNameError,
  min,
  max,
  step,
}: {
  placeholder?: string;
  className?: string;
  classNameError?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const { register, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <input
      id={name}
      type="number"
      {...register(name, {
        required: required,
        validate: validate,
        valueAsNumber: true,
      })}
      placeholder={placeholder ? placeholder : ""}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      min={min}
      max={max}
      step={step}
    />
  );
}

export default FormNumber;
