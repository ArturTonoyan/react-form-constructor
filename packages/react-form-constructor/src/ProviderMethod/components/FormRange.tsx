import { useFormContext } from "../context/FormContext";
import { useInputLayoutContext } from "../layouts/FormInputLayout";
import { useState } from "react";

function FormRange({
  className,
  classNameError,
  min = 0,
  max = 100,
  step = 1,
  range = "single",
  showValue,
  containerClassName,
}: {
  className?: string;
  classNameError?: string;
  min?: number;
  max?: number;
  step?: number;
  range?: "single" | "double";
  showValue?: boolean;
  containerClassName?: string;
}) {
  const { register, control, errors } = useFormContext();
  const { name, required, validate } = useInputLayoutContext();
  const [value, setValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const isErrorMessage = !!(errors as any)[name]?.message;

  return (
    <div className={containerClassName}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {range === "single" && (
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              id={name}
              type="range"
              {...register(name, {
                required: required,
                validate: validate,
              })}
              className={`${className} w-full ${isErrorMessage ? classNameError : ""}`}
              min={min}
              max={max}
              step={step}
              onChange={(e) => setValue(Number(e.target.value))}
              style={{ cursor: "pointer" }}
            />
            {showValue && (
              <div style={{ marginTop: "8px", fontSize: "14px" }}>
                {value}
              </div>
            )}
          </div>
        )}

        {range === "double" && (
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div>
                <label style={{ fontSize: "12px", marginRight: "8px" }}>
                  От:
                </label>
                <input
                  type="range"
                  {...register(`${name}_min` as any, {
                    required: required,
                    validate: validate,
                  })}
                  className={`${className} w-full ${isErrorMessage ? classNameError : ""}`}
                  min={min}
                  max={maxValue}
                  step={step}
                  onChange={(e) => setValue(Number(e.target.value))}
                  style={{ cursor: "pointer" }}
                />
                {showValue && (
                  <div style={{ marginTop: "4px", fontSize: "12px" }}>
                    {value}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: "12px", marginRight: "8px" }}>
                  До:
                </label>
                <input
                  type="range"
                  {...register(`${name}_max` as any, {
                    required: required,
                    validate: validate,
                  })}
                  className={`${className} w-full ${isErrorMessage ? classNameError : ""}`}
                  min={value}
                  max={max}
                  step={step}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  style={{ cursor: "pointer" }}
                />
                {showValue && (
                  <div style={{ marginTop: "4px", fontSize: "12px" }}>
                    {maxValue}
                  </div>
                )}
              </div>

              {showValue && (
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Диапазон: {value} - {maxValue}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormRange;
