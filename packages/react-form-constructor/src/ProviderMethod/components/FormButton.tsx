import { useFormContext } from "../context/FormContext";

function FormButton({
  children,
  className,
  disabledError,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  disabledError?: boolean;
  [key: string]: any;
}) {
  const { errors } = useFormContext();
  const errorMessage = errors && Object.keys(errors).length > 0;

  return (
    <button
      type="submit"
      className={`${className}`}
      {...props}
      disabled={errorMessage && disabledError}
    >
      {children}
    </button>
  );
}

export default FormButton;
