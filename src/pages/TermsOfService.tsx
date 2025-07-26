import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CreditCard, Truck, AlertCircle, Shield } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Условия</span>
              <span className="block text-emerald-400">использования</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Правила взаимодействия с сервисом Reserve Cold
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
                  Последнее обновление: 15 ноября 2023 г.
                </p>
                <p className="text-stone-600">
                  Настоящие Условия использования ("Условия") регулируют ваше взаимодействие с сайтом 
                  и услугами Reserve Cold. Пользуясь нашим сервисом, вы соглашаетесь с этими правилами.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">1. Общие положения</h2>
                    <p className="text-stone-600 mb-4">
                      1.1. Сервис Reserve Cold предоставляет возможность покупки холодного кофе премиум-класса.
                    </p>
                    <p className="text-stone-600 mb-4">
                      1.2. Все продукты описаны максимально точно, но могут отличаться по цвету и вкусу 
                      в зависимости от партии и условий хранения.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">2. Условия заказа</h2>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Минимальная сумма заказа - 1000 рублей</li>
                      <li>Доступные способы оплаты: карты, Apple Pay, Google Pay</li>
                      <li>Цены указаны в рублях с учетом НДС</li>
                      <li>Заказ считается оформленным после подтверждения по email</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Truck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">3. Доставка и возврат</h2>
                    <p className="text-stone-600 mb-4 font-semibold">Доставка:</p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Сроки: 1-3 рабочих дня по Москве, 3-7 дней по России</li>
                      <li>Стоимость: от 300 рублей (бесплатно при заказе от 5000 рублей)</li>
                      <li>Хрупкие товары требуют особой распаковки</li>
                    </ul>
                    <p className="text-stone-600 mb-4 font-semibold">Возврат:</p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Возврат возможен в течение 7 дней с момента получения</li>
                      <li>Товар должен быть в оригинальной упаковке</li>
                      <li>Продукты питания возврату не подлежат</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">4. Ограничения ответственности</h2>
                    <p className="text-stone-600 mb-4">
                      4.1. Мы не несем ответственности за:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Неправильное хранение продукта после доставки</li>
                      <li>Индивидуальную непереносимость компонентов</li>
                      <li>Задержки доставки по вине транспортных служб</li>
                    </ul>
                    <p className="text-stone-600">
                      4.2. Максимальная ответственность ограничивается стоимостью заказа.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">5. Изменения условий</h2>
                    <p className="text-stone-600 mb-4">
                      5.1. Мы оставляем право изменять эти Условия с уведомлением на сайте.
                    </p>
                    <p className="text-stone-600">
                      5.2. Продолжение использования сервиса означает принятие новых условий.
                    </p>
                  </div>
                </div>
              </div>

              {/* Links Section */}
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                <h3 className="text-xl font-semibold text-stone-900 mb-4">Связанные документы</h3>
                <div className="flex flex-col space-y-3">
                  <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                    Политика конфиденциальности
                  </Link>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700">
                    Правовая информация
                  </a>
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
            Нужна помощь?
          </h2>
          <Link
            to="/contacts"
            className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all duration-300 shadow hover:shadow-lg"
          >
            Связаться с поддержкой
            <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;