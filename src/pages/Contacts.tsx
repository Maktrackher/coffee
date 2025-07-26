import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, MessageSquare, ChevronRight } from 'lucide-react';

const Contacts: React.FC = () => {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-400/30">
              Свяжитесь с нами
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Наши</span>
              <span className="block text-emerald-400">контакты</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed">
              Мы всегда рады вашим вопросам и предложениям. Наша команда готова помочь вам выбрать идеальный холодный кофе или ответить на любые вопросы.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              <span className="text-stone-600">Как с нами</span> связаться
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Выберите удобный способ коммуникации — мы доступны в различных каналах
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <MapPin className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Кофейня</h3>
              <p className="text-stone-600 mb-2">
                г. Волжский, ул. (нету)
              </p>
              <p className="text-stone-500 text-sm">
                (Готовим дома)
              </p>
              <Link 
                to="#" 
                className="inline-flex items-center text-emerald-600 mt-4 font-medium text-sm"
              >
                Проложить маршрут <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Mail className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Электронная почта</h3>
              <p className="text-stone-600 mb-2">
                zssayta@list.ru
              </p>
              <Link 
                to="mailto:info@reservecold.ru" 
                className="inline-flex items-center text-emerald-600 mt-4 font-medium text-sm"
              >
                Написать письмо <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Phone className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Телефон и мессенджеры</h3>
              <p className="text-stone-600 mb-2">
                +7 (995) 412 09 66
              </p>
              <p className="text-stone-600">
                (WhatsApp, Telegram)
              </p>
              <Link 
                to="tel:+74951234567" 
                className="inline-flex items-center text-emerald-600 mt-4 font-medium text-sm"
              >
                Позвонить нам <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Hours Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Мы на карте</h2>
              <div className="aspect-w-16 aspect-h-9 bg-stone-200 rounded-xl overflow-hidden shadow-md">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c4d5e6f7g8h9i0j&amp;source=constructor"
                  width="100%" 
                  height="400" 
                  frameBorder="0"
                  className="rounded-xl"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Часы работы</h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                <div className="flex items-start mb-8">
                  <div className="bg-emerald-50 p-3 rounded-lg mr-6">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">Кофейня Reserve Cold</h3>
                    <p className="text-stone-600">
                      Пн-Пт: 8:00 - 20:00<br />
                      Сб-Вс: 9:00 - 22:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8">
                  <div className="bg-emerald-50 p-3 rounded-lg mr-6">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">Служба доставки</h3>
                    <p className="text-stone-600">
                      Ежедневно: 10:00 - 19:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-50 p-3 rounded-lg mr-6">
                    <MessageSquare className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">Поддержка клиентов</h3>
                    <p className="text-stone-600">
                      Пн-Пт: 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">Мы в социальных сетях</h3>
                <p className="text-stone-600 mb-6">
                  Подписывайтесь, чтобы быть в курсе новинок, акций и специальных предложений
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-stone-200 hover:bg-emerald-50 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6 text-stone-700" />
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-stone-200 hover:bg-emerald-50 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6 text-stone-700" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12">
                <h2 className="text-3xl font-bold text-stone-900 mb-6">Напишите нам</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-stone-700 font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-stone-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="example@mail.ru"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-stone-700 font-medium mb-2">Сообщение</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Ваше сообщение..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>
              <div className="bg-gradient-to-br from-stone-800 to-emerald-900 p-12 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Нужна помощь?</h3>
                  <p className="text-stone-300 mb-8 leading-relaxed">
                    Заполните форму или свяжитесь с нами напрямую. Наши специалисты ответят вам в течение 24 часов в рабочие дни. Для срочных вопросов рекомендуем позвонить по телефону.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-emerald-400 mr-4 flex-shrink-0" />
                      <span className="text-stone-300">info@reservecold.ru</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-emerald-400 mr-4 flex-shrink-0" />
                      <span className="text-stone-300">+7 (495) 123-45-67</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;