# 🎨 React Form Constructor

> Мощный и гибкий конструктор форм для React с двумя подходами: **JSX-based** для полного контроля и **JSON-based** для скорости разработки. Интегрирует **react-hook-form**, **react-number-format** и поддерживает полную кастомизацию.

## ✨ Особенности

- ✅ **Два подхода**: выбери тот, что подходит для твоего случая
- 🎯 **Валидация**: встроенная, кастомная, асинхронная
- 🔢 **Маски ввода**: телефоны, карты, форматированные числа
- 🎨 **Полная кастомизация**: стили, классы, кастомные компоненты
- ⚡ **Производительность**: оптимизирована для больших форм
- 📦 **Современный стек**: React 18+, TypeScript, ESM/CJS

## 📦 Установка

```bash
npm install @arturton/react-form-constructor
```

### Требования

- React `^18` или `^19`
- react-hook-form `^7`
- react-number-format `^5`

## 🚀 Два подхода к созданию форм

### Подход 1️⃣: JSX-based (FormProvider)

**Когда использовать**: Сложные формы с кастомной разметкой, нестандартными элементами управления, специфичными требованиями к макету.

**Преимущества**:

- 🎨 Полный контроль над разметкой
- 🔧 Гибкость в позиционировании элементов
- 🎯 Комбинируй с любыми React компонентами
- 📖 Читаемая иерархия JSX

**Пример**:

```tsx
import {
  FormProvider,
  FormInputLayout,
  FormLabel,
  FormInput,
  FormError,
  FormButton,
} from "react-form-constructor";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  return (
    <FormProvider<LoginForm>
      funSubmit={(data) => console.log(data)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <div className="mb-6">
        <FormInputLayout
          name="email"
          required="Email обязателен"
          pattern={{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Введите корректный email",
          }}
          className="mb-4"
        >
          <FormLabel className="block text-sm font-semibold mb-2">
            Email адрес
          </FormLabel>
          <FormInput
            type="email"
            placeholder="вы@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            classNameError="border-red-500 bg-red-50"
          />
          <FormError className="text-red-600 text-sm mt-1" />
        </FormInputLayout>
      </div>

      <div className="mb-6">
        <FormInputLayout
          name="password"
          required="Пароль обязателен"
          minLength={{ value: 6, message: "Минимум 6 символов" }}
          className="mb-4"
        >
          <FormLabel className="block text-sm font-semibold mb-2">
            Пароль
          </FormLabel>
          <FormPasswordInput
            placeholder="••••••••"
            className="w-full"
            inputClassName="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            classNameError="border-red-500 bg-red-50"
          />
          <FormError className="text-red-600 text-sm mt-1" />
        </FormInputLayout>
      </div>

      <FormButton
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        disabledError
      >
        Вход
      </FormButton>
    </FormProvider>
  );
}
```

---

### Подход 2️⃣: JSON-based (FormLayout)

**Когда использовать**: Быстрое прототипирование, стандартные формы, когда скорость разработки важнее максимальной гибкости.

**Преимущества**:

- ⚡ Быстрое создание форм (70% экономия кода)
- 📊 Конфиг отдельно от компонента
- ♻️ Легко переиспользовать конфигурации
- 🎯 Меньше шаблонного кода

**Пример**:

```tsx
import { FormLayout, type FormField } from "react-form-constructor";

type LoginForm = {
  email: string;
  password: string;
};

const loginFields: FormField<LoginForm>[] = [
  {
    key: "email",
    label: "Email адрес",
    type: "email",
    placeholder: "вы@example.com",
    required: "Email обязателен",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введите корректный email",
    },
    inputClass:
      "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "password",
    label: "Пароль",
    type: "password",
    placeholder: "••••••••",
    required: "Пароль обязателен",
    minLength: { value: 6, message: "Минимум 6 символов" },
    inputClass:
      "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
];

export function LoginForm() {
  return (
    <FormLayout<LoginForm>
      formData={loginFields}
      funSubmit={(data) => console.log(data)}
      formClass="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
      containerClass="space-y-6"
      buttonClass="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
      buttonName="Вход"
      disabledOnError
    />
  );
}
```

---

## 📚 Компоненты FormProvider

### FormProvider

Контейнер для всей формы. Инициализирует `react-hook-form` и предоставляет контекст для всех полей.

**Props**:

```tsx
interface FormProviderProps<T extends object = any> {
  // Обработчик отправки формы
  funSubmit: (data: T) => void;

  // Дочерние элементы
  children: React.ReactNode;

  // CSS класс для элемента <form>
  className?: string;

  // Получить доступ к методам react-hook-form
  setFormApi?: (formMethods: any) => void;
}
```

**Пример**:

```tsx
<FormProvider<MyForm>
  funSubmit={(data) => {
    console.log("Отправка:", data);
    // Отправить на сервер
  }}
  className="flex flex-col gap-4"
  setFormApi={(methods) => {
    console.log("Form API доступен:", methods.register, methods.errors);
  }}
>
  {/* Поля формы */}
</FormProvider>
```

---

### FormInputLayout

Контейнер для одного поля с поддержкой валидации. Обертка вокруг компонентов ввода.

**Props**:

```tsx
interface FormInputLayoutProps<T extends object = any> {
  // Имя поля (ключ в типе T)
  name: keyof T;

  // Обязательное поле (сообщение об ошибке)
  required?: string | boolean;

  // Минимальная длина строки
  minLength?: { value: number; message: string };

  // Максимальная длина строки
  maxLength?: { value: number; message: string };

  // Проверка регулярным выражением
  pattern?: { value: RegExp; message: string };

  // Кастомная функция валидации
  validate?: (value: any) => boolean | string;

  // Асинхронная валидация
  validateAsync?: (value: any) => Promise<boolean | string>;

  // Конфиг маски ввода (для FormMaskedInput)
  maska?: { required: string; format: string; mask: string };

  // CSS класс контейнера
  className?: string;

  // Дочерние элементы (FormLabel, FormInput, FormError)
  children: React.ReactNode;
}
```

**Пример**:

```tsx
<FormInputLayout<ProfileForm>
  name="email"
  required="Email обязателен"
  pattern={{
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Некорректный email",
  }}
  className="mb-4"
>
  <FormLabel className="font-semibold">Email</FormLabel>
  <FormInput placeholder="your@email.com" className="input" />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormLabel

Компонент для рендера подписи поля.

**Props**:

```tsx
interface FormLabelProps {
  // CSS класс
  className?: string;

  // CSS класс при ошибке валидации
  classNameError?: string;

  // Содержимое
  children: React.ReactNode;
}
```

**Пример**:

```tsx
<FormLabel className="block text-sm font-bold mb-2">Ваше имя</FormLabel>
```

---

### FormInput

Базовый текстовый ввод с поддержкой различных типов.

**Props**:

```tsx
interface FormInputProps {
  // Тип инпута: text, email, password, url, tel, search и т.д.
  type?: string;

  // Плейсхолдер
  placeholder?: string;

  // CSS класс инпута
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: string;

  // Стандартные HTML атрибуты
  [key: string]: any;
}
```

**Пример**:

```tsx
<FormInput
  type="email"
  placeholder="your@email.com"
  className="w-full px-3 py-2 border rounded"
  classNameError="border-red-500 bg-red-50"
/>
```

---

### FormPasswordInput

Специализированный ввод для паролей с кнопкой показать/скрыть.

**Props**:

```tsx
interface FormPasswordInputProps {
  // Плейсхолдер
  placeholder?: string;

  // CSS класс для контейнера
  className?: string;

  // CSS класс для инпута
  inputClassName?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // React элемент для иконки видимости
  visibleIcon?: React.ReactNode;

  // React элемент для иконки скрытия
  hiddenIcon?: React.ReactNode;

  // CSS класс для иконки
  iconClassName?: string;

  // CSS класс для контейнера иконки
  iconWrapperClassName?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: string;
}
```

**Пример**:

```tsx
<FormPasswordInput
  placeholder="Введите пароль"
  className="flex items-center gap-2"
  inputClassName="flex-1 px-3 py-2 border rounded"
  iconClassName="w-5 h-5 text-gray-500 cursor-pointer"
  visibleIcon={<EyeIcon />}
  hiddenIcon={<EyeOffIcon />}
/>
```

---

### FormTextarea

Многострочный ввод текста.

**Props**:

```tsx
interface FormTextareaProps {
  // Плейсхолдер
  placeholder?: string;

  // Количество строк
  rows?: number;

  // Количество столбцов
  cols?: number;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: string;
}
```

**Пример**:

```tsx
<FormTextarea
  placeholder="Расскажите о себе..."
  rows={5}
  className="w-full px-3 py-2 border rounded resize-none"
/>
```

---

### FormMaskedInput

Ввод с форматированием и маской (телефон, карта, валюта и т.д.).

**Требует**: `maska` конфиг в `FormInputLayout`

**Props**:

```tsx
interface FormMaskedInputProps {
  // Плейсхолдер
  placeholder?: string;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;
}
```

**Пример**:

```tsx
<FormInputLayout
  name="phone"
  maska={{
    required: "Телефон обязателен",
    format: "+7 (###) ###-##-##",
    mask: "_",
  }}
>
  <FormLabel>Номер телефона</FormLabel>
  <FormMaskedInput
    placeholder="+7 (___) ___-__-__"
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

**Доступные маски**:

```tsx
// Телефон РФ
maska={{ format: "+7 (###) ###-##-##", mask: "_" }}

// Номер кредитной карты
maska={{ format: "#### #### #### ####", mask: "_" }}

// Дата
maska={{ format: "##/##/####", mask: "_" }}

// Процент
maska={{ format: "###%", mask: "_" }}
```

---

### FormSelect

Выпадающий список.

**Props**:

```tsx
interface FormSelectProps {
  // Список опций
  options: Array<{
    value: string | number;
    label: string;
  }>;

  // Множественный выбор
  multiple?: boolean;

  // Плейсхолдер (пустой вариант)
  placeholder?: string;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: string | number | (string | number)[];
}
```

**Пример**:

```tsx
<FormInputLayout name="country">
  <FormLabel>Страна</FormLabel>
  <FormSelect
    options={[
      { value: "ru", label: "Россия" },
      { value: "kz", label: "Казахстан" },
      { value: "us", label: "США" },
    ]}
    placeholder="Выберите страну"
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormNumber

Ввод чисел с контролем мин/макс значений.

**Props**:

```tsx
interface FormNumberProps {
  // Минимальное значение
  min?: number;

  // Максимальное значение
  max?: number;

  // Шаг изменения
  step?: number;

  // Плейсхолдер
  placeholder?: string;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: number;
}
```

**Пример**:

```tsx
<FormInputLayout name="age">
  <FormLabel>Возраст</FormLabel>
  <FormNumber
    min={18}
    max={120}
    step={1}
    placeholder="Введите возраст"
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormDate

Ввод даты/времени.

**Props**:

```tsx
interface FormDateProps {
  // Тип: date, datetime-local, time, month, week
  type?: "date" | "datetime-local" | "time" | "month" | "week";

  // Минимальная дата (формат YYYY-MM-DD)
  min?: string;

  // Максимальная дата (формат YYYY-MM-DD)
  max?: string;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: string;
}
```

**Пример**:

```tsx
<FormInputLayout name="birthDate">
  <FormLabel>Дата рождения</FormLabel>
  <FormDate
    type="date"
    min="1900-01-01"
    max={new Date().toISOString().split("T")[0]}
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormRange

Ползунок для выбора числового значения.

**Props**:

```tsx
interface FormRangeProps {
  // Тип: single (один ползунок) или double (два ползунка)
  range?: "single" | "double";

  // Минимальное значение
  min?: number;

  // Максимальное значение
  max?: number;

  // Шаг
  step?: number;

  // Показывать текущее значение
  showValue?: boolean;

  // CSS класс слайдера
  className?: string;

  // CSS класс контейнера
  containerClassName?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;

  // Значение по умолчанию
  defaultValue?: number | [number, number];
}
```

**Пример**:

```tsx
<FormInputLayout name="rating">
  <FormLabel>Оцените (0-10)</FormLabel>
  <FormRange
    range="single"
    min={0}
    max={10}
    step={1}
    showValue
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    containerClassName="flex gap-4 items-center"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormFileInput

Загрузка файлов.

**Props**:

```tsx
interface FormFileInputProps {
  // MIME типы или расширения: image/*, .pdf, .doc,docx и т.д.
  accept?: string;

  // Множественная загрузка
  multiple?: boolean;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;

  // Отключить поле
  disabled?: boolean;
}
```

**Пример**:

```tsx
<FormInputLayout name="avatar">
  <FormLabel>Загрузить аватар</FormLabel>
  <FormFileInput
    accept="image/*"
    className="w-full px-3 py-2 border rounded cursor-pointer"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>

<FormInputLayout name="documents">
  <FormLabel>Загрузить документы</FormLabel>
  <FormFileInput
    accept=".pdf,.doc,.docx"
    multiple
    className="w-full px-3 py-2 border rounded cursor-pointer"
  />
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormCheckbox

Одиночный флажок.

**Props**:

```tsx
interface FormCheckboxProps {
  // Значение при отмеченном состоянии
  value?: string | number | boolean;

  // Отмечено ли по умолчанию
  defaultChecked?: boolean;

  // Отключить
  disabled?: boolean;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;
}
```

**Пример**:

```tsx
<FormInputLayout name="terms">
  <label className="flex items-center gap-3">
    <FormCheckbox value={true} className="w-5 h-5 cursor-pointer" />
    <span>Я согласен с условиями использования</span>
  </label>
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormRadio

Кнопка-радио для выбора одного из вариантов.

**Props**:

```tsx
interface FormRadioProps {
  // Значение опции
  value: string | number;

  // Выбрано ли по умолчанию
  defaultChecked?: boolean;

  // Отключить
  disabled?: boolean;

  // CSS класс
  className?: string;

  // CSS класс при ошибке
  classNameError?: string;
}
```

**Пример**:

```tsx
<FormInputLayout name="gender">
  <FormLabel>Пол</FormLabel>
  <div className="flex gap-4">
    <label className="flex items-center gap-2">
      <FormRadio value="male" className="w-5 h-5 cursor-pointer" />
      <span>Мужской</span>
    </label>
    <label className="flex items-center gap-2">
      <FormRadio value="female" className="w-5 h-5 cursor-pointer" />
      <span>Женский</span>
    </label>
    <label className="flex items-center gap-2">
      <FormRadio value="other" className="w-5 h-5 cursor-pointer" />
      <span>Другое</span>
    </label>
  </div>
  <FormError className="text-red-600 text-sm" />
</FormInputLayout>
```

---

### FormError

Компонент для отображения сообщения об ошибке.

**Props**:

```tsx
interface FormErrorProps {
  // CSS класс
  className?: string;

  // Кастомное сообщение (по умолчанию берется из валидации)
  children?: React.ReactNode;
}
```

**Пример**:

```tsx
<FormError className="text-red-600 text-sm font-medium mt-1" />
```

---

### FormButton

Кнопка отправки формы.

**Props**:

```tsx
interface FormButtonProps {
  // Текст кнопки
  children: React.ReactNode;

  // CSS класс
  className?: string;

  // Отключить кнопку, если есть ошибки валидации
  disabledError?: boolean;

  // Стандартные HTML атрибуты button
  [key: string]: any;
}
```

**Пример**:

```tsx
<FormButton
  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition disabled:opacity-50"
  disabledError
>
  Отправить
</FormButton>
```

---

## 📋 Компоненты FormLayout

### FormLayout

Компонент для рендера формы из JSON конфига. Автоматически регистрирует все поля и управляет их состоянием.

**Props**:

```tsx
interface FormLayoutProps<T extends object = any> {
  // Массив конфигураций полей
  formData: FormField<T>[];

  // Обработчик отправки
  funSubmit: (data: T) => void;

  // Начальные значения формы
  defaultValues?: T | Partial<T>;

  // Обработчик ошибок валидации
  onError?: (errors: any) => void;

  // CSS класс для элемента <form>
  formClass?: string;

  // CSS класс для контейнера полей
  containerClass?: string;

  // CSS класс для кнопки отправки
  buttonClass?: string;

  // Текст кнопки отправки
  buttonName?: string;

  // Глобальный класс для всех лейблов
  labelClass?: string;

  // Глобальный класс для всех инпутов
  inputClass?: string;

  // Глобальный класс для всех сообщений об ошибках
  errorClass?: string;

  // Дополнительные пропсы для кнопки
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  // Отключить кнопку, если есть ошибки
  disabledOnError?: boolean;
}
```

---

### FormField

Конфиг для одного поля формы.

**Props**:

```tsx
interface FormField<T extends object = any> {
  // ⭐ Обязательные
  key: keyof T; // Ключ поля в типе T
  type?: FormFieldType; // Тип: text, email, password, number, date, textarea, select, checkbox, radio, file, range, mask

  // 🏷️ Лейбл и плейсхолдер
  label?: string; // Текст лейбла
  placeholder?: string; // Плейсхолдер

  // ✅ Валидация
  required?: string | boolean; // Обязательное поле
  minLength?: { value: number; message: string }; // Мин. длина
  maxLength?: { value: number; message: string }; // Макс. длина
  pattern?: { value: RegExp; message: string }; // Регулярное выражение
  validate?: (value: any) => boolean | string; // Кастомная валидация
  validateAsync?: (value: any) => Promise<boolean | string>; // Асинхронная валидация

  // 🔢 Для типов number, range
  min?: number; // Минимальное значение
  max?: number; // Максимальное значение
  step?: number; // Шаг

  // 📋 Для типов select
  options?: Array<{ value: string | number; label: string }>; // Опции
  multiple?: boolean; // Множественный выбор

  // 🔘 Для типа radio
  radioOptions?: Array<{ value: string | number; label: string }>; // Опции

  // 📁 Для типа file
  accept?: string; // MIME типы/расширения

  // 🎭 Для типа mask
  maska?: { required: string; format: string; mask: string }; // Конфиг маски

  // 🎨 Стили
  containerClass?: string; // Класс контейнера поля
  labelClass?: string; // Класс лейбла
  inputClass?: string; // Класс инпута
  errorClass?: string; // Класс сообщения об ошибке
  classNameError?: string; // Класс инпута при ошибке

  // 🔧 Прочие
  disabled?: boolean; // Отключить поле
  defaultChecked?: boolean; // Для checkbox/radio
  rows?: number; // Кол-во строк для textarea
  showValue?: boolean; // Показать значение для range
  render?: (props: any) => React.ReactNode; // Кастомный рендер
}
```

---

## 🎯 Примеры форм

### Пример 1: Регистрация (FormProvider)

```tsx
import {
  FormProvider,
  FormInputLayout,
  FormLabel,
  FormInput,
  FormPasswordInput,
  FormCheckbox,
  FormError,
  FormButton,
} from "react-form-constructor";

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export function SignUp() {
  return (
    <FormProvider<SignUpForm>
      funSubmit={(data) => {
        console.log("Регистрация:", data);
      }}
      className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Создать аккаунт</h1>

      <FormInputLayout
        name="username"
        required="Имя пользователя обязательно"
        minLength={{ value: 3, message: "Минимум 3 символа" }}
        maxLength={{ value: 20, message: "Максимум 20 символов" }}
        className="mb-6"
      >
        <FormLabel className="block text-sm font-semibold mb-2 text-gray-700">
          Имя пользователя
        </FormLabel>
        <FormInput
          placeholder="john_doe"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FormError className="text-red-600 text-sm mt-1" />
      </FormInputLayout>

      <FormInputLayout
        name="email"
        required="Email обязателен"
        pattern={{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Введите корректный email",
        }}
        className="mb-6"
      >
        <FormLabel className="block text-sm font-semibold mb-2 text-gray-700">
          Email
        </FormLabel>
        <FormInput
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FormError className="text-red-600 text-sm mt-1" />
      </FormInputLayout>

      <FormInputLayout
        name="password"
        required="Пароль обязателен"
        minLength={{ value: 8, message: "Минимум 8 символов" }}
        validate={(value) => {
          if (!/[A-Z]/.test(value)) return "Добавьте заглавную букву";
          if (!/[0-9]/.test(value)) return "Добавьте цифру";
          return true;
        }}
        className="mb-6"
      >
        <FormLabel className="block text-sm font-semibold mb-2 text-gray-700">
          Пароль
        </FormLabel>
        <FormPasswordInput
          placeholder="••••••••"
          className="flex items-center gap-2"
          inputClassName="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Минимум 8 символов, заглавная буква и цифра
        </p>
        <FormError className="text-red-600 text-sm mt-1" />
      </FormInputLayout>

      <FormInputLayout
        name="terms"
        required="Вы должны согласиться"
        className="mb-8"
      >
        <label className="flex items-start gap-3">
          <FormCheckbox value={true} className="w-5 h-5 mt-1 cursor-pointer" />
          <span className="text-sm text-gray-700">
            Я согласен с{" "}
            <a href="#" className="text-blue-600 hover:underline">
              условиями использования
            </a>{" "}
            и{" "}
            <a href="#" className="text-blue-600 hover:underline">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        <FormError className="text-red-600 text-sm mt-1" />
      </FormInputLayout>

      <FormButton
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
        disabledError
      >
        Создать аккаунт
      </FormButton>
    </FormProvider>
  );
}
```

### Пример 2: Профиль пользователя (FormLayout)

```tsx
import { FormLayout, type FormField } from "react-form-constructor";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  bio: string;
  avatar: FileList;
};

const profileFields: FormField<UserProfile>[] = [
  {
    key: "firstName",
    label: "Имя",
    type: "text",
    placeholder: "Иван",
    required: "Имя обязательно",
    minLength: { value: 2, message: "Минимум 2 символа" },
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "lastName",
    label: "Фамилия",
    type: "text",
    placeholder: "Петров",
    required: "Фамилия обязательна",
    minLength: { value: 2, message: "Минимум 2 символа" },
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "ivan@example.com",
    required: "Email обязателен",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Некорректный email",
    },
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "phone",
    label: "Телефон",
    type: "mask",
    placeholder: "+7 (___) ___-__-__",
    maska: {
      required: "Телефон обязателен",
      format: "+7 (###) ###-##-##",
      mask: "_",
    },
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "country",
    label: "Страна",
    type: "select",
    placeholder: "Выберите страну",
    options: [
      { value: "ru", label: "Россия" },
      { value: "kz", label: "Казахстан" },
      { value: "by", label: "Беларусь" },
      { value: "ua", label: "Украина" },
    ],
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
  {
    key: "bio",
    label: "О себе",
    type: "textarea",
    placeholder: "Расскажите о себе...",
    maxLength: { value: 500, message: "Максимум 500 символов" },
    inputClass:
      "w-full px-4 py-2 border border-gray-300 rounded-lg resize-none",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
    rows: 4,
  },
  {
    key: "avatar",
    label: "Аватар",
    type: "file",
    accept: "image/*",
    inputClass: "w-full px-4 py-2 border border-gray-300 rounded-lg",
    labelClass: "block text-sm font-semibold mb-2",
    errorClass: "text-red-600 text-sm mt-1",
  },
];

export function UserProfile() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Мой профиль</h1>

      <FormLayout<UserProfile>
        formData={profileFields}
        funSubmit={(data) => {
          console.log("Обновление профиля:", data);
        }}
        containerClass="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        formClass="bg-white rounded-lg shadow p-8"
        buttonClass="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        buttonName="Сохранить изменения"
      />
    </div>
  );
}
```

---

## 🎓 Типичные сценарии

### Сценарий 1: Валидация пароля

```tsx
<FormInputLayout
  name="password"
  required="Пароль обязателен"
  validate={(value) => {
    if (!/[A-Z]/.test(value)) return "Добавьте заглавную букву";
    if (!/[a-z]/.test(value)) return "Добавьте строчную букву";
    if (!/[0-9]/.test(value)) return "Добавьте цифру";
    if (!/[!@#$%^&*]/.test(value)) return "Добавьте спецсимвол (!@#$%^&*)";
    return true;
  }}
>
  <FormLabel>Пароль</FormLabel>
  <FormPasswordInput
    placeholder="••••••••"
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm mt-1" />
</FormInputLayout>
```

### Сценарий 2: Асинхронная валидация

```tsx
<FormInputLayout
  name="username"
  validateAsync={async (value) => {
    const response = await fetch(`/api/check-username?name=${value}`);
    const data = await response.json();
    return data.available ? true : "Имя пользователя занято";
  }}
>
  <FormLabel>Имя пользователя</FormLabel>
  <FormInput
    placeholder="john_doe"
    className="w-full px-3 py-2 border rounded"
  />
  <FormError className="text-red-600 text-sm mt-1" />
</FormInputLayout>
```

### Сценарий 3: Условное отображение

```tsx
const MyForm = () => {
  const [showExtraField, setShowExtraField] = useState(false);

  return (
    <FormProvider<MyForm>
      funSubmit={(data) => console.log(data)}
      setFormApi={(methods) => {
        // Следить за изменениями поля
        const subscription = methods.watch((data) => {
          setShowExtraField(data.type === "other");
        });
        return () => subscription.unsubscribe();
      }}
    >
      <FormInputLayout name="type">
        <FormLabel>Выберите тип</FormLabel>
        <FormSelect
          options={[
            { value: "personal", label: "Личное" },
            { value: "business", label: "Бизнес" },
            { value: "other", label: "Другое" },
          ]}
          className="w-full px-3 py-2 border rounded"
        />
      </FormInputLayout>

      {showExtraField && (
        <FormInputLayout name="otherDescription">
          <FormLabel>Опишите тип</FormLabel>
          <FormTextarea
            placeholder="Описание..."
            className="w-full px-3 py-2 border rounded"
          />
          <FormError className="text-red-600 text-sm mt-1" />
        </FormInputLayout>
      )}
    </FormProvider>
  );
};
```

---

## 📖 Дополнительные ресурсы

- [react-hook-form документация](https://react-hook-form.com/)
- [react-number-format документация](https://www.npmjs.com/package/react-number-format)

## 📄 Лицензия

MIT — см. файл [LICENSE](./LICENSE)

---

**Версия**: 0.1.5  
**Последнее обновление**: Январь 2026

Используйте `FormProvider` и набор компонентов для построения формы через `children`.

### Пример

```tsx
import {
  FormProvider,
  FormInputLayout,
  FormLabel,
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
  FormError,
  FormButton,
} from "react-form-constructor";

type ProfileForm = {
  name: string;
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
};

export function Profile() {
  return (
    <FormProvider<ProfileForm>
      funSubmit={(data) => console.log(data)}
      className="flex flex-col gap-4"
    >
      <FormInputLayout name="name" required="Введите имя">
        <FormLabel>Имя</FormLabel>
        <FormInput placeholder="Введите имя" className="input" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="password" required="Введите пароль">
        <FormLabel>Пароль</FormLabel>
        <FormPasswordInput
          placeholder="Введите пароль"
          className="input-wrap"
          inputClassName="input"
        />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="description">
        <FormLabel>Описание</FormLabel>
        <FormTextarea rows={4} className="textarea" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout
        name="phone"
        maska={{
          required: "Телефон обязателен",
          format: "+7 (###) ###-##-##",
          mask: "_",
        }}
      >
        <FormLabel>Телефон</FormLabel>
        <FormMaskedInput className="input" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="country" required="Выберите страну">
        <FormLabel>Страна</FormLabel>
        <FormSelect
          placeholder="Выберите"
          options={[
            { value: "ru", label: "Россия" },
            { value: "kz", label: "Казахстан" },
          ]}
          className="select"
        />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="age">
        <FormLabel>Возраст</FormLabel>
        <FormNumber min={1} max={120} step={1} className="input" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="birthDate">
        <FormLabel>Дата рождения</FormLabel>
        <FormDate type="date" className="input" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="rating">
        <FormLabel>Рейтинг</FormLabel>
        <FormRange range="single" min={0} max={10} showValue className="w-60" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="avatar">
        <FormLabel>Аватар</FormLabel>
        <FormFileInput accept="image/*" className="input" />
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="gender" required="Выберите пол">
        <FormLabel>Пол</FormLabel>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <FormRadio value="male" /> Мужской
          </label>
          <label className="flex items-center gap-2">
            <FormRadio value="female" /> Женский
          </label>
        </div>
        <FormError className="error" />
      </FormInputLayout>

      <FormInputLayout name="terms">
        <label className="flex items-center gap-2">
          <FormCheckbox value={true} /> Я согласен с условиями
        </label>
        <FormError className="error" />
      </FormInputLayout>

      <FormButton className="btn" disabledError>
        Отправить
      </FormButton>
    </FormProvider>
  );
}
```

### Компоненты (Provider)

#### FormProvider

**Props**

- `funSubmit: (data) => void` — обработчик отправки формы.
- `children: React.ReactNode` — поля формы.
- `className?: string` — класс формы.
- `setFormApi?: (formMethods) => void` — доступ к `register`, `errors`, `control`, `values`.

#### FormInputLayout

**Props**

- `name: string` — имя поля (ключ в данных).
- `required?: string` — сообщение об обязательности.
- `minLength?: { value: number; message: string }` — минимальная длина.
- `maxLength?: { value: number; message: string }` — максимальная длина.
- `pattern?: { value: RegExp; message: string }` — регулярное выражение.
- `validate?: (value) => boolean | string` — кастомная проверка.
- `maska?: { required: string; format: string; mask: string }` — маска ввода (для `FormMaskedInput`).
- `className?: string` — класс контейнера.

#### FormInput

**Props**

- `placeholder?: string` — плейсхолдер.
- `className?: string` — класс инпута.
- `classNameError?: string` — класс ошибки.
- `type?: string` — тип (`text`, `email`, `password`, …).

#### FormPasswordInput

**Props**

- `placeholder?: string`
- `className?: string` — класс контейнера.
- `inputClassName?: string` — класс инпута.
- `classNameError?: string` — класс ошибки.
- `visibleIcon?: ReactNode` — иконка видимого пароля.
- `hiddenIcon?: ReactNode` — иконка скрытого пароля.
- `iconClassName?: string` — класс иконки.
- `iconWrapperClassName?: string` — класс контейнера иконки.

#### FormTextarea

**Props**

- `placeholder?: string`
- `className?: string`
- `classNameError?: string`
- `rows?: number`
- `cols?: number`

#### FormMaskedInput

**Props**

- `placeholder?: string`
- `className?: string`
- `classNameError?: string`

> Использует `maska` из `FormInputLayout`.

#### FormSelect

**Props**

- `options: { value: string | number; label: string }[]` — список опций.
- `multiple?: boolean` — множественный выбор.
- `placeholder?: string` — пустой вариант.
- `className?: string`
- `classNameError?: string`

#### FormNumber

**Props**

- `placeholder?: string`
- `className?: string`
- `classNameError?: string`
- `min?: number`
- `max?: number`
- `step?: number`

#### FormDate

**Props**

- `type?: "date" | "datetime-local" | "time" | "month" | "week"`
- `min?: string`
- `max?: string`
- `className?: string`
- `classNameError?: string`

#### FormRange

**Props**

- `range?: "single" | "double"` — один ползунок или два.
- `min?: number`
- `max?: number`
- `step?: number`
- `showValue?: boolean` — показать значения.
- `className?: string` — класс слайдера.
- `containerClassName?: string` — класс контейнера.
- `classNameError?: string`

#### FormFileInput

**Props**

- `accept?: string` — MIME типы/расширения.
- `multiple?: boolean`
- `className?: string`
- `classNameError?: string`

#### FormCheckbox

**Props**

- `value?: string | number | boolean`
- `defaultChecked?: boolean`
- `disabled?: boolean`
- `className?: string`
- `classNameError?: string`

#### FormRadio

**Props**

- `value: string | number`
- `defaultChecked?: boolean`
- `disabled?: boolean`
- `className?: string`
- `classNameError?: string`

#### FormButton

**Props**

- `className?: string`
- `disabledError?: boolean` — отключить кнопку, если есть ошибки.

#### FormError

**Props**

- `className?: string`

#### FormLabel

**Props**

- `className?: string`
- `classNameError?: string`

## Метод 2: JSON (FormLayout)

`FormLayout` рендерит форму по массиву `formData` и сам регистрирует поля.

### Пример

```tsx
import { FormLayout, type FormField } from "react-form-constructor";

type LoginForm = {
  phone: string;
  password: string;
};

const fields: FormField<LoginForm>[] = [
  {
    label: "Телефон",
    placeholder: "+7 (___) ___-__-__",
    key: "phone",
    required: "Введите телефон",
    maska: {
      required: "Введите телефон",
      format: "+7 (###) ###-##-##",
      mask: "_",
    },
  },
  {
    label: "Пароль",
    placeholder: "••••••••",
    key: "password",
    required: "Введите пароль",
    minLength: { value: 6, message: "Минимум 6 символов" },
    type: "password",
  },
];

export function Login() {
  return (
    <FormLayout<LoginForm>
      formData={fields}
      funSubmit={(data) => console.log(data)}
      formClass="form"
      buttonClass="btn"
    />
  );
}
```

### FormField

**Поля**

- `label: string` — текст лейбла.
- `placeholder: string` — плейсхолдер.
- `key: keyof T` — имя поля.
- `required?: string` — сообщение об обязательности.
- `minLength?: { value: number; message: string }`
- `maxLength?: { value: number; message: string }`
- `pattern?: { value: RegExp; message: string }`
- `validate?: any` — кастомная проверка.
- `type?: string` — тип инпута.
- `maska?: { required: string; format: string; mask: string }` — маска.
- `textarea?: boolean` — textarea вместо input.
- `register?: object` — доп. настройки `react-hook-form`.
- `inputClass?: any` — класс инпута.
- `labelClass?: any` — класс лейбла.
- `errorClass?: any` — класс ошибки.

### FormLayoutProps

- `funSubmit: (data: T) => void` — submit.
- `formClass?: string` — класс формы.
- `buttonClass?: string` — класс кнопки.
- `buttonName?: string` — текст кнопки.
- `formData: FormField<T>[]` — массив полей.

## Требования

- React `^18` или `^19`
- react-hook-form `^7`
- react-number-format `^5`

## Лицензия

MIT — см. файл LICENSE.
