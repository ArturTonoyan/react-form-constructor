import MainLayout from "./layouts/mainLayout";
import MaskedField from "./components/MaskedField";
import InputField from "./components/InputField";

function InputForm({
  register,
  type,
  placeholder,
  error,
  name,
  label,
  required,
  control,
  maska,
  inputClass,
  labelClass,
  errorClass,
}: {
  register: any;
  type?: string;
  placeholder?: string;
  error: any;
  name: string;
  label?: string;
  required?: string | boolean;
  control?: any;
  maska?: { required: string; format: string; mask: string };
  inputClass?: any;
  labelClass?: any;
  errorClass?: any;
}) {
  const renderChildren = () => {
    if (maska) {
      return (
        <MaskedField
          name={name}
          placeholder={placeholder}
          control={control}
          maska={maska}
          inputClass={inputClass}
        />
      );
    } else {
      return (
        <InputField
          name={name}
          type={type}
          placeholder={placeholder}
          register={register}
          inputClass={inputClass}
        />
      );
    }
  };

  return (
    <MainLayout
      label={label}
      required={required}
      error={error}
      name={name}
      labelClass={labelClass}
      errorClass={errorClass}
    >
      {renderChildren()}
    </MainLayout>
  );
}

export default InputForm;
