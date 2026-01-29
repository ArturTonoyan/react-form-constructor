import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";

function MaskedField({
  placeholder,
  name,
  control,
  maska,
  inputClass,
}: {
  placeholder?: string;
  name: string;
  control: any;
  maska: { required: string; format: string; mask: string };
  inputClass?: any;
}) {
  return (
    <Controller
      name={name || ""}
      control={control}
      rules={{ required: maska.required }}
      render={({ field }) => (
        <PatternFormat
          {...field}
          format={maska.format}
          mask={maska.mask}
          placeholder={placeholder ? placeholder : ""}
          className={inputClass}
        />
      )}
    />
  );
}

export default MaskedField;
