import { useState } from "react";
import { FormLayout, type FormField } from "react-form-constructor";

interface SelectOption {
  value: string | number;
  label: string;
}

interface RadioOption {
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
  rating?: number;
}

export default function FormLayoutPage() {
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

  const genderOptions: RadioOption[] = [
    { value: "male", label: "Мужчина" },
    { value: "female", label: "Женщина" },
    { value: "other", label: "Другое" },
  ];

  // ✨ НОВЫЙ ПОДХОД: Просто опиши форму в JSON!
  const formFields: any[] = [
    {
      key: "name",
      label: "Имя",
      type: "text" as const,
      placeholder: "Введите имя",
      required: "Имя обязательно",
      minLength: { value: 2, message: "Минимум 2 символа" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      validate: (value: string) =>
        /^[A-Za-z\s]+$/.test(value) || "Только буквы и пробелы",
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "surname",
      label: "Фамилия",
      type: "text" as const,
      placeholder: "Введите фамилию",
      required: "Фамилия обязательна",
      minLength: { value: 2, message: "Минимум 2 символа" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      validate: (value: string) =>
        /^[A-Za-z\s]+$/.test(value) || "Только буквы и пробелы",
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "your@email.com",
      required: "Email обязателен",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Введите корректный email",
      },
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "password",
      label: "Пароль",
      type: "password" as const,
      placeholder: "••••••••",
      required: "Пароль обязателен",
      minLength: { value: 6, message: "Минимум 6 символов" },
      maxLength: { value: 32, message: "Максимум 32 символа" },
      validate: (value: string) =>
        /(?=.*[0-9])/.test(value) || "Пароль должен содержать цифру",
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "phone",
      label: "Телефон",
      type: "mask" as const,
      placeholder: "+7 (___) ___-____",
      maska: {
        required: "Телефон обязателен",
        format: "+7 (###) ###-####",
        mask: "_",
      },
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "country",
      label: "Страна",
      type: "select" as const,
      placeholder: "Выберите страну",
      options: countries,
      inputClass: "input-field select-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "age",
      label: "Возраст",
      type: "number" as const,
      placeholder: "Введите возраст",
      min: 18,
      max: 120,
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "birthDate",
      label: "Дата рождения",
      type: "date" as const,
      placeholder: "",
      inputClass: "input-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "bio",
      label: "Биография",
      type: "textarea" as const,
      placeholder: "Расскажите о себе",
      maxLength: { value: 500, message: "Максимум 500 символов" },
      inputClass: "input-field textarea-field",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "gender",
      label: "Пол",
      type: "radio" as const,
      placeholder: "",
      radioOptions: genderOptions,
      labelClass: "label-radio",
      inputClass: "radio-input",
      errorClass: "error-message",
    },

    {
      key: "avatar",
      label: "Аватар",
      type: "file" as const,
      placeholder: "",
      accept: "image/*",
      inputClass: "input-field file-input",
      labelClass: "label-text",
      errorClass: "error-message",
    },

    {
      key: "terms",
      label: "Я согласен с условиями использования",
      type: "checkbox" as const,
      placeholder: "",
      required: "Вы должны согласиться",
      inputClass: "checkbox-input",
      labelClass: "label-checkbox",
      errorClass: "error-message",
    },

    {
      key: "newsletter",
      label: "Подписаться на рассылку",
      type: "checkbox" as const,
      placeholder: "",
      inputClass: "checkbox-input",
      labelClass: "label-checkbox",
      errorClass: "error-message",
    },

    {
      key: "rating",
      label: "Рейтинг (0-10)",
      type: "range" as const,
      placeholder: "",
      min: 0,
      max: 10,
      step: 1,
      inputClass: "range-input",
      labelClass: "label-text",
      errorClass: "error-message",
    },
  ];

  const handleSubmit = (data: RegistrationForm) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Отправленные данные (FormLayout):", data);
      setSubmitData(data);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          ✨ Новый подход - FormLayout
        </h2>
        <p className="text-indigo-800">
          Опиши форму в JSON конфиге - остальное сделает компонент!
        </p>
      </div>

      {/* Форма */}
      <FormLayout<RegistrationForm>
        formData={formFields as FormField<RegistrationForm>[]}
        funSubmit={handleSubmit}
        buttonClass="submit-button"
        buttonName={isLoading ? "Загрузка..." : "Зарегистрироваться"}
      />

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

      {/* Информация о возможностях */}
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          ✨ Преимущества нового подхода:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-2xl">📉</span>
            <div>
              <p className="font-bold">70% кода меньше</p>
              <p className="text-sm">vs старый подход</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-bold">Быстрее писать</p>
              <p className="text-sm">В 5-10 раз быстрее</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-bold">Все поля поддерживаются</p>
              <p className="text-sm">text, email, select, checkbox и др.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">Валидация из коробки</p>
              <p className="text-sm">required, pattern, custom и др.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-bold">Полная кастомизация</p>
              <p className="text-sm">Любые стили, глобальные и локальные</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">♻️</span>
            <div>
              <p className="font-bold">Переиспользуемые конфиги</p>
              <p className="text-sm">Вынеси в отдельный файл</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .label-text,
        .label-checkbox,
        .label-radio {
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
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .input-field[type="checkbox"],
        .checkbox-input,
        .radio-input {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        .range-input {
          width: 100%;
          height: 0.5rem;
          cursor: pointer;
        }

        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .submit-button {
          padding: 0.875rem 2rem;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
