import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormRadio({
  className,
  classNameError,
  value,
  defaultChecked,
  disabled,
}: {
  className?: string;
  classNameError?: string;
  value: string | number;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const { register, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <input
      id={`${name}-${value}`}
      type="radio"
      {...register(name, {
        required: required,
        validate: validate,
      })}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      value={value as any}
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  );
}

export default FormRadio;
