import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormMaskedInput({
  placeholder,
  className,
  classNameError,
}: {
  placeholder?: string;
  className?: string;
  classNameError?: string;
}) {
  const { control, errors } = useFormContext();
  const { name, required, minLength, maxLength, pattern, validate, maska } =
    useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  if (!maska) {
    return null;
  }

  return (
    <Controller
      name={name || ""}
      control={control}
      rules={{
        required: maska.required ?? required,
        minLength,
        maxLength,
        pattern,
        validate,
      }}
      render={({ field }) => (
        <PatternFormat
          {...field}
          format={maska.format}
          mask={maska.mask}
          placeholder={placeholder ? placeholder : ""}
          className={`${className} ${isErrorMessage ? classNameError : ""}`}
        />
      )}
    />
  );
}

export default FormMaskedInput;
