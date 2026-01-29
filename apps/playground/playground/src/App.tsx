import { FormLayout, type FormField } from "react-form-constructor";

function App() {
  interface FormValues {
    login: string;
    password: string;
    name: string;
    phone: string;
    checkbox: boolean;
  }

  const formData: FormField<FormValues>[] = [
    {
      label: "Логин",
      key: "login",
      placeholder: "Придумайте логин",
      minLength: { value: 1, message: "Минимум 8 символов" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      pattern: {
        value: /^[A-Za-z0-9_-]+$/,
        message: "Недопустимые символы",
      },
      required: "Поле не может быть пустым",
      validate: (value: string) => {
        return value.includes("admin")
          ? "Логин не должен содержать admin"
          : true;
      },
      inputClass: "input-base-class",
      labelClass: "label-base-class",
      errorClass: "error-base-class",
    },
    {
      label: "Пароль",
      key: "password",
      placeholder: "Придумайте пароль",
      minLength: { value: 1, message: "Минимум 8 символов" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      pattern: {
        value: /^[A-Za-z0-9_-]+$/,
        message: "Недопустимые символы",
      },
      required: "Поле не может быть пустым",
      validate: (value: string) => {
        return value.includes("admin")
          ? "Пароль не должен содержать admin"
          : true;
      },
    },
    {
      label: "Имя",
      key: "name",
      placeholder: "Придумайте имя",
      minLength: { value: 1, message: "Минимум 8 символов" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      pattern: {
        value: /^[A-Za-z0-9_-]+$/,
        message: "Недопустимые символы",
      },
      required: "Поле не может быть пустым",
      validate: (value: string) => {
        return value.includes("admin") ? "Имя не должно содержать admin" : true;
      },
    },
    {
      label: "Телефон",
      key: "phone",
      placeholder: "+7 (___) ___-__-__",
      pattern: {
        value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
        message: "Введите корректный номер телефона",
      },
      maska: {
        required: "Неверный формат",
        format: "+7 (###) ###-##-##",
        mask: "_",
      },
      inputClass: "input-base-class",
    },
    {
      label: "Согласие с политикой",
      key: "checkbox",
      placeholder: "",
      required: "Необходимо согласие",
      type: "checkbox",
    },
  ];

  const funSubmit = (data: FormValues) => {
    console.log("data", data);
  };

  return (
    <>
      <h1>Конструктор формы</h1>
      <FormLayout
        formData={formData}
        funSubmit={funSubmit}
        formClass="my-form-class"
        buttonClass="my-button-class"
      />
    </>
  );
}

export default App;
