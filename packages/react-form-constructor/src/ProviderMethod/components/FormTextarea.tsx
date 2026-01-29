import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormTextarea({
  placeholder,
  className,
  classNameError,
  rows,
  cols,
}: {
  placeholder?: string;
  className?: string;
  classNameError?: string;
  rows?: number;
  cols?: number;
}) {
  const { register, errors } = useFormContext();
  const { name, required, minLength, maxLength, pattern, validate } =
    useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <textarea
      id={name}
      {...register(name, {
        required: required,
        minLength: minLength,
        maxLength: maxLength,
        pattern: pattern,
        validate: validate,
      })}
      placeholder={placeholder ? placeholder : ""}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      rows={rows}
      cols={cols}
    />
  );
}

export default FormTextarea;
