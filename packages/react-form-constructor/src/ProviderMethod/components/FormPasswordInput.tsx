import { useState, ReactNode } from "react";
import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

interface FormPasswordInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  classNameError?: string;
  visibleIcon?: ReactNode;
  hiddenIcon?: ReactNode;
  iconClassName?: string;
  iconWrapperClassName?: string;
}

function FormPasswordInput({
  placeholder,
  className,
  inputClassName,
  classNameError,
  visibleIcon = <EyeIcon />,
  hiddenIcon = <EyeOffIcon />,
  iconClassName,
  iconWrapperClassName = "cursor-pointer",
}: FormPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { register, errors } = useFormContext();
  const { name, required, minLength, maxLength, pattern, validate } =
    useInputLayoutContext();

  const isErrorMessage = !!(errors as any)[name]?.message;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <input
        id={name}
        {...register(name, {
          required: required,
          minLength: minLength,
          maxLength: maxLength,
          pattern: pattern,
          validate: validate,
        })}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder ? placeholder : ""}
        className={`${inputClassName} ${isErrorMessage ? classNameError : ""}`}
        style={{ flex: 1 }}
      />
      <div
        onClick={toggleVisibility}
        className={`${iconClassName ? iconClassName : iconWrapperClassName}`}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
        }}
        title={isVisible ? "Скрыть пароль" : "Показать пароль"}
      >
        {isVisible ? visibleIcon : hiddenIcon}
      </div>
    </div>
  );
}

export default FormPasswordInput;
