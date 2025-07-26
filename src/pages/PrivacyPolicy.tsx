import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Shield, Mail, Cookie, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Политика</span>
              <span className="block text-emerald-400">конфиденциальности</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Наши обязательства по защите ваших персональных данных
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 md:p-12">
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
                  Reserve Cold ("мы", "нас", "наш") обязуется защищать вашу конфиденциальность. 
                  В этой политике объясняется, как мы собираем, используем и защищаем вашу информацию.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Lock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">1. Собираемая информация</h2>
                    <p className="text-stone-600 mb-4">
                      Мы можем собирать следующие типы информации:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Контактные данные (имя, email, телефон)</li>
                      <li>Информацию о заказах и предпочтениях</li>
                      <li>Данные для доставки и платежей</li>
                      <li>Техническую информацию (IP-адрес, тип браузера)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">2. Использование данных</h2>
                    <p className="text-stone-600 mb-4">
                      Ваши данные используются для:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Обработки и выполнения заказов</li>
                      <li>Улучшения качества наших услуг</li>
                      <li>Персонализации вашего опыта</li>
                      <li>Обеспечения безопасности и предотвращения мошенничества</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Lock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">3. Защита данных</h2>
                    <p className="text-stone-600 mb-4">
                      Мы применяем строгие меры безопасности:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Шифрование передаваемых данных (SSL/TLS)</li>
                      <li>Регулярные аудиты безопасности</li>
                      <li>Ограниченный доступ к персональным данным</li>
                      <li>Соответствие GDPR и другим регуляторным требованиям</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Cookie className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">4. Cookies и технологии</h2>
                    <p className="text-stone-600 mb-4">
                      Наш сайт использует cookies и аналогичные технологии для:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Анализа посещаемости и поведения пользователей</li>
                      <li>Запоминания предпочтений и настроек</li>
                      <li>Обеспечения работы корзины покупок</li>
                      <li>Персонализации контента и рекламы</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <UserCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3">5. Ваши права</h2>
                    <p className="text-stone-600 mb-4">
                      Вы имеете право:
                    </p>
                    <ul className="list-disc pl-5 text-stone-600 space-y-2 mb-4">
                      <li>Запросить доступ к вашим данным</li>
                      <li>Исправить неточности</li>
                      <li>Удалить ваши данные ("право на забвение")</li>
                      <li>Ограничить обработку данных</li>
                      <li>Перенести ваши данные другому оператору</li>
                      <li>Отозвать согласие на обработку</li>
                      <li>Подать жалобу в регулирующий орган</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-50 rounded-lg mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-4">Контакты</h3>
                    <p className="text-stone-600 mb-4">
                      По вопросам конфиденциальности обращайтесь:
                    </p>
                    <p className="text-stone-600">
                      Email: <span className="text-emerald-600">privacy@reservecold.com</span>
                    </p>
                    <p className="text-stone-600">
                      Телефон: <span className="text-emerald-600">+7 (495) 123-45-67</span>
                    </p>
                  </div>
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
            Остались вопросы?
          </h2>
          <Link
            to="/contacts"
            className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all duration-300 shadow hover:shadow-lg"
          >
            Связаться с нами
            <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;