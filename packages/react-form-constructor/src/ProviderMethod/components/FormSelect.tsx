import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

interface SelectOption {
  value: string | number;
  label: string;
}

function FormSelect({
  options,
  className,
  classNameError,
  multiple,
  placeholder,
}: {
  options: SelectOption[];
  className?: string;
  classNameError?: string;
  multiple?: boolean;
  placeholder?: string;
}) {
  const { register, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <select
      id={name}
      {...register(name, {
        required: required,
        validate: validate,
      })}
      className={`${className} ${isErrorMessage ? classNameError : ""}`}
      multiple={multiple}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FormSelect;
