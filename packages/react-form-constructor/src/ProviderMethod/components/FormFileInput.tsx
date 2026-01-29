import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormFileInput({
  className,
  classNameError,
  accept,
  multiple,
}: {
  className?: string;
  classNameError?: string;
  accept?: string;
  multiple?: boolean;
}) {
  const { register, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <input
      id={name}
      type="file"
      {...register(name, {
        required: required,
        validate: validate,
      })}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      accept={accept}
      multiple={multiple}
    />
  );
}

export default FormFileInput;
