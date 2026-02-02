import { useState } from "react";
import { FormLayout, type FormField } from "react-form-constructor";
import FormProviderPage from "./pages/FormProviderPage";
import FormLayoutPage from "./pages/FormLayoutPage";

type PageType = "old" | "new";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("new");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок и переключение вкладок */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            🎨 Конструктор форм 2.0
          </h1>
          <p className="text-gray-600 mb-8">
            Сравни два подхода создания форм: старый (FormProvider) и новый
            (FormLayout)
          </p>

          {/* Вкладки */}
          <div className="flex gap-4 border-b-2 border-gray-200">
            <button
              onClick={() => setCurrentPage("new")}
              className={`px-6 py-3 font-bold text-lg transition-all ${
                currentPage === "new"
                  ? "border-b-4 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              ✨ Новый метод (FormLayout)
            </button>
            <button
              onClick={() => setCurrentPage("old")}
              className={`px-6 py-3 font-bold text-lg transition-all ${
                currentPage === "old"
                  ? "border-b-4 border-amber-600 text-amber-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📦 Старый метод (FormProvider)
            </button>
          </div>
        </div>

        {/* Контент страниц */}
        <div className="bg-white rounded-lg shadow-xl">
          {currentPage === "new" ? <FormLayoutPage /> : <FormProviderPage />}
        </div>

        {/* Сравнение */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            📊 Сравнение подходов
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FormLayout */}
            <div className="border-l-4 border-indigo-500 pl-6">
              <h4 className="text-xl font-bold text-indigo-600 mb-4">
                ✨ FormLayout (новый)
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Конфиг описан в JSON</li>
                <li>✅ Меньше кода (70% экономия)</li>
                <li>✅ Быстрее писать</li>
                <li>✅ Легче переиспользовать</li>
                <li>✅ Современный подход</li>
                <li>✅ Рекомендуется для новых проектов</li>
              </ul>
            </div>

            {/* FormProvider */}
            <div className="border-l-4 border-amber-500 pl-6">
              <h4 className="text-xl font-bold text-amber-600 mb-4">
                📦 FormProvider (старый)
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>📝 Компоненты в JSX</li>
                <li>⚙️ Полный контроль над разметкой</li>
                <li>🎯 Для сложных кейсов</li>
                <li>⚡ Все еще работает</li>
                <li>🔧 Поддерживается</li>
                <li>📖 Градуальная миграция</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
