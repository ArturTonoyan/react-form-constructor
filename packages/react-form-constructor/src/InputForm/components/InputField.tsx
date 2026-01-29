function InputField({
  register,
  type,
  placeholder,
  inputClass,
  name,
}: {
  register: any;
  type?: string;
  placeholder?: string;
  inputClass?: string;
  name: string;
}) {
  return (
    <input
      id={name}
      {...register}
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      className={inputClass}
    />
  );
}

export default InputField;
