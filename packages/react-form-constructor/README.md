# React Form Constructor

> Минималистичный конструктор форм для React на базе **react-hook-form**, с удобной декларацией полей, валидацией и масками ввода.

## Зачем это нужно

Когда форма состоит из набора однотипных полей, удобнее описывать её **данными**, а не JSX-шаблонами. Библиотека помогает:

- быстро собрать форму из массива полей;
- подключить валидацию `react-hook-form` без лишнего кода;
- использовать маски ввода через `react-number-format`;
- гибко стилизовать форму через классы;
- при необходимости перейти на «ручной» рендер через `children`.

## Установка

```bash
npm install @arturton/react-form-constructor
```

## Быстрый старт

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

## Как это работает

- **`FormLayout`** создаёт форму и сам регистрирует поля через `react-hook-form`.
- Каждое поле описывается типом `FormField<T>` и привязывается к ключу `keyof T`.
- Если передан `formData`, библиотека сама отрисует поля и кнопку отправки.
- Если `formData` не передан — можно рендерить **свои поля** через `children` и использовать `useFormContext()`.

## Пример с кастомной разметкой (children)

```tsx
import { FormLayout, useFormContext } from "react-form-constructor";

function CustomField() {
  const { register, errors } = useFormContext<{ email: string }>();

  return (
    <div>
      <input {...register("email", { required: "Введите email" })} />
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}

export function CustomForm() {
  return (
    <FormLayout funSubmit={(data) => console.log(data)}>
      <CustomField />
    </FormLayout>
  );
}
```

## Валидация

Поддерживаются стандартные правила `react-hook-form`:

- `required`
- `minLength`
- `maxLength`
- `pattern`
- `validate`

Пример:

```ts
{
  key: "username",
  label: "Имя",
  required: "Обязательное поле",
  minLength: { value: 3, message: "Минимум 3 символа" },
  pattern: { value: /^[a-z]+$/i, message: "Только буквы" },
}
```

## Маски ввода

Поле с маской задаётся через `maska`:

```ts
{
  key: "phone",
  label: "Телефон",
  maska: {
    required: "Введите телефон",
    format: "+7 (###) ###-##-##",
    mask: "_",
  },
}
```

## Стилизация

Доступны классы для быстрого оформления:

- `formClass` — класс формы
- `buttonClass` — класс кнопки
- `inputClass` — класс поля
- `labelClass` — класс лейбла
- `errorClass` — класс текста ошибки

## Публичный API

- `FormLayout` — рендерит форму по массиву `formData` или принимает `children`.
- `InputForm` — базовый элемент поля (экспортируется по умолчанию).
- `useFormContext` — доступ к `react-hook-form` контексту внутри ваших компонентов.
- Типы: `FormField`, `FormLayoutProps`, `FormContextValue`.

## Требования

- React `^18` или `^19`
- react-hook-form `^7`
- react-number-format `^5`

## Лицензия

MIT — см. файл LICENSE.
