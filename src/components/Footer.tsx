import React from 'react';
import { Coffee, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white border-t border-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Coffee className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold font-serif">
                <span className="text-white">Reserve</span>
                <span className="text-emerald-400">Cold</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Премиальный холодный кофе, созданный с точностью и страстью. Мы отбираем лучшие зерна 
              и используем традиционные методы холодного заваривания.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-stone-700">Навигация</h3>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center">
                <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Продукция
              </Link></li>
              <li><Link to="/about" className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center">
                <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                О производстве
              </Link></li>
              <li><Link to="/contacts" className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center">
                <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Контакты
              </Link></li>
              <li><a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center">
                <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Блог
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-stone-700">Контакты</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">г. Москва, ул. Кофейная, 15</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@reservecold.ru" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  info@reservecold.ru
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+74951234567" className="text-stone-400 hover:text-emerald-400 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">Пн-Пт: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-stone-700">Подписка</h3>
            <p className="text-stone-400 mb-4">
              Подпишитесь на рассылку, чтобы первыми узнавать о новых продуктах и специальных предложениях.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-stone-500"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow hover:shadow-lg"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Reserve Cold. Все права защищены.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm">
              Условия использования
            </Link>    
            <Link to="/legal" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm">
              Правовая информация
            </Link>  
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;