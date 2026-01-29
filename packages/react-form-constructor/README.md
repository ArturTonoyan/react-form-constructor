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

## Метод 1: Provider (рекомендуется)

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
