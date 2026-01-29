import { useState } from "react";
import {
  FormProvider,
  FormInput,
  FormPasswordInput,
  FormButton,
  FormError,
  FormInputLayout,
  FormLabel,
} from "react-form-constructor";

function App() {
  interface FormValues {
    name: string;
    surname: string;
    password: string;
  }

  const funSubmit = (data: FormValues) => {
    console.log("data", data);
  };

  const [formApi, setFormApi] = useState<any>(null);

  console.log("formApi", formApi);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Конструктор формы
      </h1>

      <FormProvider<FormValues>
        funSubmit={funSubmit}
        setFormApi={setFormApi}
        className="flex flex-col gap-3 p-10 w-100"
      >
        <FormInputLayout
          name="name"
          minLength={{ value: 1, message: "Минимум 8 символов" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          pattern={{
            value: /^[A-Za-z0-9_-]+$/,
            message: "Недопустимые символы",
          }}
          required="Поле не может быть пустым"
          validate={(value: string) => {
            return value.includes("admin")
              ? "Логин не должен содержать admin"
              : true;
          }}
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Имя</FormLabel>
          <FormInput
            placeholder="Введите имя"
            className="w-40 p-2 border border-gray-300 rounded"
            classNameError="border-red-500 focus:border-red-500 focus:ring-red-500 outline-none"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="surname"
          minLength={{ value: 1, message: "Минимум 8 символов" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          pattern={{
            value: /^[A-Za-z0-9_-]+$/,
            message: "Недопустимые символы",
          }}
          required="Поле не может быть пустым"
          validate={(value: string) => {
            return value.includes("admin")
              ? "Логин не должен содержать admin"
              : true;
          }}
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Фамилия</FormLabel>
          <FormInput
            placeholder="Введите фамилию"
            className="w-40 p-2 border border-gray-300 rounded"
            classNameError="border-red-500 focus:border-red-500 focus:ring-red-500 outline-none"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="password"
          minLength={{ value: 1, message: "Минимум 8 символов" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          pattern={{
            value: /^[A-Za-z0-9_-]+$/,
            message: "Недопустимые символы",
          }}
          required="Поле не может быть пустым"
          validate={(value: string) => {
            return value.includes("admin")
              ? "Логин не должен содержать admin"
              : true;
          }}
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Пароль</FormLabel>
          <FormPasswordInput
            placeholder="Введите пароль"
            className="flex items-center gap-2 w-60 p-2 border border-gray-300 rounded"
            inputClassName="w-full outline-none"
            iconClassName="w-3 h-3 text-gray-600 &:svg:w-full &:svg:h-full"
            classNameError="border-red-500 focus:border-red-500 focus:ring-red-500 outline-none"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormButton
          className="w-40 h-10 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabledError
        >
          Отправить форму
        </FormButton>
      </FormProvider>
    </>
  );
}

export default App;
