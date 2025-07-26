import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Building, FileText, Gavel } from 'lucide-react';

const LegalInfo: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Правовая</span>
              <span className="block text-emerald-400">информация</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Юридические сведения о компании Reserve Cold
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 md:p-12">
            <Link
              to="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              На главную
            </Link>

            <div className="prose prose-stone max-w-none">
              <div className="mb-12">
                <p className="text-stone-600 mb-6">
                  Актуально на: 15 ноября 2023 г.
                </p>
              </div>

              {/* Company Info */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Building className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">1. Реквизиты компании</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-600">
                      <div>
                        <p className="font-semibold">Название:</p>
                        <p>ООО "Резерв Колд"</p>
                      </div>
                      <div>
                        <p className="font-semibold">ИНН:</p>
                        <p>1234567890</p>
                      </div>
                      <div>
                        <p className="font-semibold">ОГРН:</p>
                        <p>1234567890123</p>
                      </div>
                      <div>
                        <p className="font-semibold">КПП:</p>
                        <p>123456789</p>
                      </div>
                      <div>
                        <p className="font-semibold">Юридический адрес:</p>
                        <p>123456, г. Москва, ул. Кофейная, д. 15</p>
                      </div>
                      <div>
                        <p className="font-semibold">Фактический адрес:</p>
                        <p>123456, г. Москва, ул. Кофейная, д. 15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Docs */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">2. Регистрационные документы</h2>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Свидетельство о регистрации юридического лица</li>
                      <li>Лист записи ЕГРЮЛ</li>
                      <li>Устав компании</li>
                      <li>Свидетельство о постановке на налоговый учет</li>
                    </ul>
                    <p className="text-stone-600 italic">
                      Документы предоставляются по запросу для партнеров и проверяющих органов.
                    </p>
                  </div>
                </div>
              </div>

              {/* Regulations */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Scale className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">3. Нормативное регулирование</h2>
                    <p className="text-stone-600 mb-4">
                      Деятельность компании осуществляется в соответствии с:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Гражданским кодексом РФ</li>
                      <li>ФЗ "О защите прав потребителей"</li>
                      <li>ФЗ "О качестве и безопасности пищевых продуктов"</li>
                      <li>Техническими регламентами Таможенного союза</li>
                      <li>Иными нормативно-правовыми актами РФ</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Compliance */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Gavel className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">4. Соответствие требованиям</h2>
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 mb-4">
                      <p className="font-semibold text-stone-800 mb-2">Пищевая продукция:</p>
                      <ul className="list-disc pl-5 text-stone-600 space-y-1">
                        <li>Сертификат соответствия ТР ТС 021/2011</li>
                        <li>Декларация о соответствии</li>
                        <li>Санитарно-эпидемиологическое заключение</li>
                      </ul>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                      <p className="font-semibold text-stone-800 mb-2">Персональные данные:</p>
                      <ul className="list-disc pl-5 text-stone-600 space-y-1">
                        <li>Уведомление в Роскомнадзор о обработке персональных данных</li>
                        <li>Соответствие 152-ФЗ "О персональных данных"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Docs */}
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                <h3 className="text-xl font-semibold text-stone-900 mb-4">Связанные документы</h3>
                <div className="flex flex-col space-y-3">
                  <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                    Условия использования
                  </Link>
                  <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                    Политика конфиденциальности
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-6">
            Для юридических запросов
          </h2>
          <Link
            to="/contacts"
            className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all duration-300 shadow hover:shadow-lg"
          >
            Контакты юридического отдела
            <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalInfo;