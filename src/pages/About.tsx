import React from 'react';
import { Coffee, Award, Users, Leaf, Clock, Globe, Smile, Droplet } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe1.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-400/30">
              Наша философия
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Искусство холодного</span>
              <span className="block text-emerald-400">кофе</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed">
              Reserve Cold — это синтез вековых традиций кофейного мастерства и современных технологий экстракции.
              Каждая бутылка — результат 24-часового процесса холодного заваривания при точном контроле температуры.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              <span className="text-stone-600">Наши</span> принципы
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Четыре столпа, на которых строится качество Reserve Cold
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Coffee className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Терруарность</h3>
              <p className="text-stone-600">
                Мы сохраняем уникальный характер каждого региона происхождения, подчеркивая природные вкусовые ноты.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Leaf className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Экология</h3>
              <p className="text-stone-600">
                От перерабатываемой упаковки до углеродно-нейтральной логистики — мы минимизируем воздействие на природу.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Users className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Прозрачность</h3>
              <p className="text-stone-600">
                Мы рассказываем историю каждого кофе — от фермера до вашей чашки, с полной информацией о происхождении.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:border-emerald-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Award className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Инновации</h3>
              <p className="text-stone-600">
                Экспериментируем с техниками заваривания, создавая новые вкусовые профили и текстуры.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe1.jpg"
                  alt="Coffee brewing process"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-md border border-stone-200 hidden lg:block">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <Coffee className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-stone-900">2025</div>
                      <div className="text-stone-600 text-sm">Год основания</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-6">
                Наша история
              </span>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Начинаем путь маленькой лаборатории</h2>
              <div className="space-y-6 text-stone-700">
                <p>
                  Начав с небольшой лаборатории в городе Волжском, мы провели еще ни одного эксперимента
                </p>
                <p>
                  Наше производство объединяет традиционные методы холодного заваривания с прецизионным контролем температуры, 
                  что позволяет раскрыть всю палитру вкусов спешелти кофе.
                </p>
                <p>
                  Мы гордимся фермерами из Эфиопии, Колумбии, Бразилии и других регионов, 
                  что гарантирует справедливые цены и исключительное качество сырья.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-900 to-emerald-900 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg')] bg-cover opacity-20" />
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Reserve Cold в цифрах</h2>
                <p className="text-stone-300 max-w-2xl mx-auto">
                  Наша приверженность качеству подтверждается конкретными результатами
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-emerald-400 mr-3" />
                    <div className="text-3xl font-bold">24</div>
                  </div>
                  <div className="text-stone-300 text-sm">Часа холодного заваривания</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-emerald-400 mr-3" />
                    <div className="text-3xl font-bold">12</div>
                  </div>
                  <div className="text-stone-300 text-sm">Стран происхождения</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center mb-4">
                    <Droplet className="h-6 w-6 text-emerald-400 mr-3" />
                    <div className="text-3xl font-bold">500+</div>
                  </div>
                  <div className="text-stone-300 text-sm">Фермеров-партнеров</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center mb-4">
                    <Smile className="h-6 w-6 text-emerald-400 mr-3" />
                    <div className="text-3xl font-bold">0</div>
                  </div>
                  <div className="text-stone-300 text-sm">Довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              <span className="text-stone-600">Команда</span> экспертов
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Профессионалы, которые превращают кофейные зерна в произведения искусства
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img 
                src="https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//client2.jpg" 
                alt="Coffee master" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-1">Данечка</h3>
                <p className="text-emerald-600 mb-4">Основатель</p>
                <p className="text-stone-600">
                  Мечтатель, и основатель этой мега крутой компании!
                </p>
              </div>
            </div>
            
            <div className="bg-stone-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img 
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg" 
                alt="Coffee master" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-1">Полинка</h3>
                <p className="text-emerald-600 mb-4">Работяга</p>
                <p className="text-stone-600">
                  Будет работать 12 дней по 12 часов подряд во благо вкуса!
                </p>
              </div>
            </div>
            
            <div className="bg-stone-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img 
                src="https://images.pexels.com/photos/3778618/pexels-photo-3778618.jpeg" 
                alt="Coffee master" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-1">Михаил Грачев</h3>
                <p className="text-emerald-600 mb-4">Инвестор</p>
                <p className="text-stone-600">
                  Лично инвестирует в развитие Reserve Cold
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;