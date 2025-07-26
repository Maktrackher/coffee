import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Clock, Award, Leaf, Star, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coldbrew-hero2.jpg')] bg-cover bg-center opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-400/30">
              Премиальный холодный кофе
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Новый уровень</span>
              <span className="block text-emerald-400">холодного кофе</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-stone-300 leading-relaxed max-w-3xl">
              Откройте для себя мягкие, насыщенные вкусы нашего тщательно приготовленного холодного кофе. 
              Изготовлен из премиальных зерен и заварен до совершенства в течение 24 часов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-200/20"
              >
                Исследовать коллекцию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              <span className="text-stone-600">Почему выбирают</span> Reserve Cold?
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Мы стремимся предоставить исключительный холодный кофе, который соответствует самым высоким стандартам качества и вкуса.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Coffee className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Премиальные зерна</h3>
              <p className="text-stone-600">
                Мы отбираем только лучшие моносортовые и тщательно подобранные купажные зерна из известных кофейных регионов мира.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">24-часовое заваривание</h3>
              <p className="text-stone-600">
                Наш процесс холодного заваривания занимает 24 часа для извлечения максимального вкуса при сохранении мягкого, низкокислотного профиля.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-xl mb-6">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Награжденное качество</h3>
              <p className="text-stone-600">
                Наша приверженность качеству получила признание кофейных экспертов и довольных клиентов по всему миру.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              <span className="text-stone-600">Рекомендуемые</span> продукты
            </h2>
            <p className="text-lg text-stone-600">
              Откройте для себя наши самые популярные сорта холодного кофе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Посмотреть всю коллекцию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-6">
                Наше качество
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Каждая капля — произведение искусства
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                От отбора зерен до финального продукта — мы контролируем каждый этап производства. 
                Наши мастера используют традиционные методы холодного заваривания в сочетании с современными технологиями.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-4">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">100% натуральный</div>
                    <div className="text-sm text-stone-600">Без добавок</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-4">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">Сертифицировано</div>
                    <div className="text-sm text-stone-600">Высшее качество</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4019766/pexels-photo-4019766.jpeg"
                alt="Процесс приготовления кофе"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-md border border-stone-200 hidden lg:block">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Star className="h-6 w-6 text-emerald-600 fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">4.9/5</div>
                    <div className="text-stone-600 text-sm">Рейтинг клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-stone-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Будьте в курсе новинок</h2>
            <p className="text-xl text-stone-300 mb-8">
              Подпишитесь на нашу рассылку, чтобы первыми узнавать о новых продуктах, советах по завариванию и эксклюзивных предложениях.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Введите ваш email"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 text-stone-900 placeholder-stone-500"
              />
              <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-stone-100 transition-colors shadow-lg">
                Подписаться
              </button>
            </div>
            <p className="text-sm text-stone-400 mt-4">
              Мы уважаем вашу конфиденциальность. Отписаться можно в любое время.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;