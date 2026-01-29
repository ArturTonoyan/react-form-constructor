import { useFormContext } from "../context/FormContext";
import {
  useInputLayoutContext,
  useOptionalInputLayoutContext,
} from "../layouts/FormInputLayout";

function FormError({ ...props }) {
  const { errors } = useFormContext();
  const { name } = useInputLayoutContext();

  const layout = useOptionalInputLayoutContext();
  const resolvedName = name ?? layout?.name;
  if (!resolvedName) {
    return null;
  }
  const errorMessage = (errors as any)[resolvedName]?.message;

  return (
    <span {...props}>
      {typeof errorMessage === "string" ? errorMessage : null}
    </span>
  );
}

export default FormError;
