import { useState } from "react";
import {
  FormProvider,
  FormInputLayout,
  FormInput,
  FormLabel,
  FormError,
  FormPasswordInput,
  FormMaskedInput,
  FormSelect,
  FormNumber,
  FormDate,
  FormTextarea,
  FormCheckbox,
  FormRadio,
  FormFileInput,
  FormButton,
} from "react-form-constructor";

interface SelectOption {
  value: string | number;
  label: string;
}

interface RegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  age?: number;
  birthDate?: string;
  bio?: string;
  gender?: string;
  avatar?: FileList;
  terms?: boolean;
  newsletter?: boolean;
}

export default function FormProviderPage() {
  const [submitData, setSubmitData] = useState<RegistrationForm | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const countries: SelectOption[] = [
    { value: "us", label: "США" },
    { value: "uk", label: "Великобритания" },
    { value: "ca", label: "Канада" },
    { value: "au", label: "Австралия" },
    { value: "fr", label: "Франция" },
    { value: "ru", label: "Россия" },
  ];

  const handleSubmit = (data: RegistrationForm) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Отправленные данные (FormProvider):", data);
      setSubmitData(data);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          📦 Старый подход - FormProvider
        </h2>
        <p className="text-amber-800">
          Разметка с компонентами - больше контроля, но и больше кода
        </p>
      </div>

      {/* Форма со старым подходом */}
      <FormProvider<RegistrationForm>
        funSubmit={handleSubmit}
        className="form-container"
      >
        {/* Имя */}
        <FormInputLayout<RegistrationForm>
          name="name"
          required="Имя обязательно"
          minLength={{ value: 2, message: "Минимум 2 символа" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          validate={(value) =>
            /^[A-Za-z\s]+$/.test(value) || "Только буквы и пробелы"
          }
          className="form-group"
        >
          <FormLabel className="label-text">Имя</FormLabel>
          <FormInput
            placeholder="Введите имя"
            className="input-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Фамилия */}
        <FormInputLayout<RegistrationForm>
          name="surname"
          required="Фамилия обязательна"
          minLength={{ value: 2, message: "Минимум 2 символа" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          validate={(value) =>
            /^[A-Za-z\s]+$/.test(value) || "Только буквы и пробелы"
          }
          className="form-group"
        >
          <FormLabel className="label-text">Фамилия</FormLabel>
          <FormInput
            placeholder="Введите фамилию"
            className="input-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Email */}
        <FormInputLayout<RegistrationForm>
          name="email"
          required="Email обязателен"
          pattern={{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Введите корректный email",
          }}
          className="form-group"
        >
          <FormLabel className="label-text">Email</FormLabel>
          <FormInput
            type="email"
            placeholder="your@email.com"
            className="input-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Пароль */}
        <FormInputLayout<RegistrationForm>
          name="password"
          required="Пароль обязателен"
          minLength={{ value: 6, message: "Минимум 6 символов" }}
          maxLength={{ value: 32, message: "Максимум 32 символа" }}
          validate={(value) =>
            /(?=.*[0-9])/.test(value) || "Пароль должен содержать цифру"
          }
          className="form-group"
        >
          <FormLabel className="label-text">Пароль</FormLabel>
          <FormPasswordInput
            placeholder="••••••••"
            className="input-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Телефон с маской */}
        <FormInputLayout<RegistrationForm>
          name="phone"
          maska={{
            required: "Телефон обязателен",
            format: "+7 (###) ###-####",
            mask: "_",
          }}
          className="form-group"
        >
          <FormLabel className="label-text">Телефон</FormLabel>
          <FormMaskedInput
            placeholder="+7 (___) ___-____"
            className="input-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Страна */}
        <FormInputLayout<RegistrationForm>
          name="country"
          className="form-group"
        >
          <FormLabel className="label-text">Страна</FormLabel>
          <FormSelect
            options={countries}
            placeholder="Выберите страну"
            className="input-field select-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Возраст */}
        <FormInputLayout<RegistrationForm> name="age" className="form-group">
          <FormLabel className="label-text">Возраст</FormLabel>
          <FormNumber
            placeholder="Введите возраст"
            className="input-field"
            classNameError="input-error"
            min={18}
            max={120}
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Дата рождения */}
        <FormInputLayout<RegistrationForm>
          name="birthDate"
          className="form-group"
        >
          <FormLabel className="label-text">Дата рождения</FormLabel>
          <FormDate className="input-field" classNameError="input-error" />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Биография */}
        <FormInputLayout<RegistrationForm>
          name="bio"
          maxLength={{ value: 500, message: "Максимум 500 символов" }}
          className="form-group"
        >
          <FormLabel className="label-text">Биография</FormLabel>
          <FormTextarea
            placeholder="Расскажите о себе"
            className="input-field textarea-field"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Пол (Radio) */}
        <FormInputLayout<RegistrationForm> name="gender" className="form-group">
          <FormLabel className="label-text">Пол</FormLabel>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <FormRadio value="male" className="radio-input" />
              <span>Мужчина</span>
            </label>
            <label className="flex items-center gap-2">
              <FormRadio value="female" className="radio-input" />
              <span>Женщина</span>
            </label>
            <label className="flex items-center gap-2">
              <FormRadio value="other" className="radio-input" />
              <span>Другое</span>
            </label>
          </div>
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Аватар */}
        <FormInputLayout<RegistrationForm> name="avatar" className="form-group">
          <FormLabel className="label-text">Аватар</FormLabel>
          <FormFileInput
            accept="image/*"
            className="input-field file-input"
            classNameError="input-error"
          />
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Согласие с условиями */}
        <FormInputLayout<RegistrationForm>
          name="terms"
          required="Вы должны согласиться"
          className="form-group"
        >
          <label className="flex items-center gap-2">
            <FormCheckbox className="checkbox-input" />
            <span className="label-text">
              Я согласен с условиями использования
            </span>
          </label>
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Подписка на рассылку */}
        <FormInputLayout<RegistrationForm>
          name="newsletter"
          className="form-group"
        >
          <label className="flex items-center gap-2">
            <FormCheckbox className="checkbox-input" />
            <span className="label-text">Подписаться на рассылку</span>
          </label>
          <FormError className="error-message" />
        </FormInputLayout>

        {/* Кнопка отправки */}
        <FormButton className="submit-button" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </FormButton>
      </FormProvider>

      {/* Результат */}
      {submitData && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            ✓ Форма успешно отправлена!
          </h3>
          <pre className="bg-white p-4 rounded border border-green-200 overflow-auto text-sm">
            {JSON.stringify(submitData, null, 2)}
          </pre>
        </div>
      )}

      {/* Информация о подходе */}
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          📦 Характеристики старого подхода:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-bold">Много компонентов</p>
              <p className="text-sm">Для каждого поля - свой</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-bold">Больше кода</p>
              <p className="text-sm">150-200 строк на форму</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="font-bold">Полный контроль</p>
              <p className="text-sm">Можешь менять разметку</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-bold">Гибкость</p>
              <p className="text-sm">Для сложных кейсов</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="font-bold">Медленнее писать</p>
              <p className="text-sm">Много рутины</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">Все еще работает</p>
              <p className="text-sm">Поддерживается</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-900 font-semibold mb-2">💡 Рекомендация:</p>
          <p className="text-blue-800">
            Для новых проектов используй <strong>FormLayout</strong>. Если нужна
            максимальная гибкость - используй <strong>FormProvider</strong>.
          </p>
        </div>
      </div>

      <style>{`
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label-text {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.95rem;
        }

        .input-field,
        .select-field,
        .textarea-field,
        .file-input {
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-field:focus,
        .select-field:focus,
        .textarea-field:focus,
        .file-input:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .input-field[type="checkbox"],
        .checkbox-input,
        .radio-input {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .input-error {
          border-color: #dc2626 !important;
          background-color: #fee2e2;
        }

        .submit-button {
          padding: 0.875rem 2rem;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          width: 100%;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
