import { useState } from "react";
import {
  FormProvider,
  FormInput,
  FormPasswordInput,
  FormTextarea,
  FormMaskedInput,
  FormSelect,
  FormNumber,
  FormDate,
  FormRange,
  FormFileInput,
  FormCheckbox,
  FormRadio,
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
    description?: string;
    phone?: string;
    country?: string;
    age?: number;
    birthDate?: string;
    rating?: number;
    avatar?: FileList;
    terms?: boolean;
    gender?: string;
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

        <FormInputLayout
          name="description"
          maxLength={{ value: 500, message: "Максимум 500 символов" }}
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Описание</FormLabel>
          <FormTextarea
            placeholder="Введите описание"
            className="w-60 p-2 border border-gray-300 rounded"
            classNameError="border-red-500 focus:border-red-500 outline-none"
            rows={4}
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="phone"
          maska={{
            required: "Телефон обязателен",
            format: "+7 (###) ###-####",
            mask: "_",
          }}
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Телефон</FormLabel>
          <FormMaskedInput
            placeholder="+7 (___) ___-____"
            className="w-40 p-2 border border-gray-300 rounded"
            classNameError="border-red-500 focus:border-red-500 outline-none"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout name="avatar" className="flex flex-col gap-2">
          <FormLabel classNameError="text-red-500">Аватар</FormLabel>
          <FormFileInput
            className="w-60 p-2 border border-gray-300 rounded"
            classNameError="border-red-500"
            accept="image/*"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="gender"
          required="Выберите пол"
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Пол</FormLabel>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <FormRadio value="male" className="w-4 h-4" />
              <span>Мужской</span>
            </label>
            <label className="flex items-center gap-2">
              <FormRadio value="female" className="w-4 h-4" />
              <span>Женский</span>
            </label>
          </div>
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout name="terms" className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <FormCheckbox className="w-4 h-4" value={true} />
            <span>Я согласен с условиями использования</span>
          </label>
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="country"
          required="Выберите страну"
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Страна</FormLabel>
          <FormSelect
            options={[
              { value: "us", label: "США" },
              { value: "uk", label: "Великобритания" },
              { value: "ca", label: "Канада" },
              { value: "au", label: "Австралия" },
              { value: "fr", label: "Франция" },
            ]}
            placeholder="Выберите страну"
            className="w-60 p-2 border border-gray-300 rounded"
            classNameError="border-red-500"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="age"
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Возраст</FormLabel>
          <FormNumber
            placeholder="Введите возраст"
            className="w-60 p-2 border border-gray-300 rounded"
            classNameError="border-red-500"
            min={1}
            max={120}
            step={1}
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="birthDate"
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Дата рождения</FormLabel>
          <FormDate
            className="w-60 p-2 border border-gray-300 rounded"
            classNameError="border-red-500"
            type="date"
          />
          <FormError className="text-red-500 text-sm" />
        </FormInputLayout>

        <FormInputLayout
          name="rating"
          className="flex flex-col gap-2"
        >
          <FormLabel classNameError="text-red-500">Рейтинг (ползунок)</FormLabel>
          <FormRange
            min={0}
            max={10}
            step={1}
            range="single"
            showValue={true}
            className="w-60"
            containerClassName="flex flex-col gap-2"
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
