import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormInput({
  placeholder,
  className,
  classNameError,
  type,
}: {
  placeholder?: string;
  className?: string;
  classNameError?: string;
  type?: string;
}) {
  const { register, errors } = useFormContext();
  const { name, required, minLength, maxLength, pattern, validate } =
    useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <input
      id={name}
      {...register(name, {
        required: required,
        minLength: minLength,
        maxLength: maxLength,
        pattern: pattern,
        validate: validate,
      })}
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
    />
  );
}

export default FormInput;
