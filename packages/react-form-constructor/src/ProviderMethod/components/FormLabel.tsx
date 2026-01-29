import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

function FormLabel({
  children,
  className,
  classNameError,
}: {
  children: React.ReactNode;
  className?: string;
  classNameError?: string;
}) {
  const { required } = useInputLayoutContext();

  const { errors } = useFormContext();
  const { name } = useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <label className={`${className} ${isErrorMessage ? classNameError : ""}`}>
      {children}
      {!!required && "*"}
    </label>
  );
}

export default FormLabel;
