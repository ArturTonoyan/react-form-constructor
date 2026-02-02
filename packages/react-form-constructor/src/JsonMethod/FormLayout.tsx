import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { FormLayoutProps, FormField } from "../types";

/**
 * Компонент для рендера отдельного поля формы
 */
function FieldRenderer<T extends object = any>({
  field,
  register,
  control,
  errors,
  globalClasses,
}: {
  field: FormField<T>;
  register: any;
  control: any;
  errors: any;
  globalClasses: {
    label?: string;
    input?: string;
    error?: string;
  };
}) {
  const fieldName = String(field.key);
  const error = errors[fieldName];
  const errorMessage = error?.message;
  const hasError = !!error;

  const labelFieldClassName = field.labelClass || globalClasses.label;
  const inputFieldClassName =
    `${field.inputClass || globalClasses.input || ""} ${
      hasError ? field.classNameError || "" : ""
    }`.trim();
  const errorFieldClassName = field.errorClass || globalClasses.error;

  // Custom render
  if (field.render) {
    return field.render({
      register,
      control,
      errors,
      field,
    });
  }

  const renderField = () => {
    switch (field.type) {
      // Text inputs
      case "text":
      case "email":
      case "password":
        return (
          <input
            {...register(fieldName, {
              required: field.required,
              minLength: field.minLength,
              maxLength: field.maxLength,
              pattern: field.pattern,
              validate: field.validate,
            })}
            type={field.type}
            placeholder={field.placeholder}
            className={inputFieldClassName}
            disabled={field.disabled}
          />
        );

      // Number input
      case "number":
        return (
          <input
            {...register(fieldName, {
              required: field.required,
              minLength: field.minLength,
              maxLength: field.maxLength,
              validate: field.validate,
            })}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step || 1}
            placeholder={field.placeholder}
            className={inputFieldClassName}
            disabled={field.disabled}
          />
        );

      // Date input
      case "date":
        return (
          <input
            {...register(fieldName, {
              required: field.required,
              validate: field.validate,
            })}
            type="date"
            className={inputFieldClassName}
            disabled={field.disabled}
          />
        );

      // Textarea
      case "textarea":
        return (
          <textarea
            {...register(fieldName, {
              required: field.required,
              minLength: field.minLength,
              maxLength: field.maxLength,
              validate: field.validate,
            })}
            placeholder={field.placeholder}
            className={inputFieldClassName}
            disabled={field.disabled}
            rows={field.rows || 4}
          />
        );

      // Select
      case "select":
        return (
          <select
            {...register(fieldName, {
              required: field.required,
              validate: field.validate,
            })}
            className={inputFieldClassName}
            disabled={field.disabled}
            multiple={field.multiple}
          >
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      // Masked input
      case "mask":
        return field.maska ? (
          <Controller
            name={fieldName}
            control={control}
            rules={{
              required: field.maska.required || field.required,
              minLength: field.minLength,
              maxLength: field.maxLength,
              validate: field.validate,
            }}
            render={({ field: fieldProps }) => (
              <PatternFormat
                {...fieldProps}
                format={field.maska!.format}
                mask={field.maska!.mask}
                placeholder={field.placeholder}
                className={inputFieldClassName}
                disabled={field.disabled}
              />
            )}
          />
        ) : null;

      // File input
      case "file":
        return (
          <input
            {...register(fieldName, {
              required: field.required,
              validate: field.validate,
            })}
            type="file"
            accept={field.accept}
            className={inputFieldClassName}
            disabled={field.disabled}
            multiple={field.multiple}
          />
        );

      // Checkbox
      case "checkbox":
        return (
          <div className={field.containerClass}>
            <input
              {...register(fieldName, {
                required: field.required,
                validate: field.validate,
              })}
              type="checkbox"
              id={fieldName}
              className={inputFieldClassName}
              disabled={field.disabled}
              defaultChecked={field.defaultChecked}
            />
            {field.label && (
              <label htmlFor={fieldName} className={labelFieldClassName}>
                {field.label}
              </label>
            )}
          </div>
        );

      // Radio buttons
      case "radio":
        return (
          <div className={field.containerClass}>
            {field.radioOptions?.map((option) => (
              <label key={option.value} className={labelFieldClassName}>
                <input
                  {...register(fieldName, {
                    required: field.required,
                    validate: field.validate,
                  })}
                  type="radio"
                  value={option.value}
                  className={inputFieldClassName}
                  disabled={field.disabled}
                  defaultChecked={field.defaultChecked}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      // Range/Slider
      case "range":
        return (
          <div className={field.containerClass}>
            <input
              {...register(fieldName, {
                required: field.required,
                validate: field.validate,
              })}
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              className={inputFieldClassName}
              disabled={field.disabled}
            />
            {field.showValue && (
              <span>{errors[fieldName]?.message || "Value"}</span>
            )}
          </div>
        );

      default:
        return (
          <input
            {...register(fieldName, {
              required: field.required,
              minLength: field.minLength,
              maxLength: field.maxLength,
              pattern: field.pattern,
              validate: field.validate,
            })}
            type="text"
            placeholder={field.placeholder}
            className={inputFieldClassName}
            disabled={field.disabled}
          />
        );
    }
  };

  return renderField();
}

/**
 * FormLayout - конфигурационный способ создания форм через JSON
 * @example
 * const fields: FormField<LoginForm>[] = [
 *   {
 *     key: "email",
 *     label: "Email",
 *     type: "email",
 *     placeholder: "your@email.com",
 *     required: "Email is required",
 *   },
 * ];
 *
 * <FormLayout<LoginForm>
 *   formData={fields}
 *   funSubmit={(data) => console.log(data)}
 *   buttonName="Login"
 * />
 */
export function FormLayout<T extends object = any>({
  formData,
  funSubmit,
  defaultValues,
  onError,
  formClass,
  containerClass,
  buttonClass,
  buttonName = "Submit",
  labelClass,
  inputClass,
  errorClass,
  submitButtonProps,
  disabledOnError = false,
}: FormLayoutProps<T>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
    defaultValues: defaultValues as any,
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    funSubmit(data as T);
  };

  const onSubmitError = (formErrors: any) => {
    onError?.(formErrors);
  };

  const globalClasses = {
    label: labelClass,
    input: inputClass,
    error: errorClass,
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
      className={formClass}
    >
      <div className={containerClass}>
        {formData.map((field) => (
          <div key={String(field.key)} className={field.containerClass}>
            {/* Label */}
            {field.type !== "checkbox" && field.label && (
              <label
                htmlFor={String(field.key)}
                className={field.labelClass || globalClasses.label}
              >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            {/* Field */}
            <FieldRenderer<T>
              field={field}
              register={register}
              control={control}
              errors={errors}
              globalClasses={globalClasses}
            />

            {/* Error message */}
            {(errors as any)[String(field.key)] && (
              <span className={field.errorClass || globalClasses.error}>
                {(errors as any)[String(field.key)]?.message}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className={buttonClass}
        disabled={disabledOnError && hasErrors}
        {...submitButtonProps}
      >
        {buttonName}
      </button>
    </form>
  );
}
