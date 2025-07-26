import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Customer } from '../types';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="bg-stone-50 min-h-screen">
        <section className="relative bg-stone-900 text-white py-32">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4556982/pexels-photo-4556982.jpeg')] bg-cover bg-center opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-full mb-6 backdrop-blur-sm border border-emerald-400/30">
              <ShoppingBag className="h-12 w-12 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ваша корзина</span>
              <span className="block text-emerald-400">пока пуста</span>
            </h1>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-200/20"
            >
              Исследовать коллекцию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-stone-50 min-h-screen">
        <section className="relative bg-stone-900 text-white py-32">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg')] bg-cover bg-center opacity-20" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-full mb-6 backdrop-blur-sm border border-emerald-400/30">
              <Check className="h-12 w-12 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Заказ</span>
              <span className="block text-emerald-400">подтвержден!</span>
            </h1>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Спасибо за ваш заказ. Мы отправим вам подтверждение на {customer.email} в ближайшее время.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow hover:shadow-lg"
              >
                Продолжить покупки
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-stone-400 text-stone-200 font-medium rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                На главную
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4556982/pexels-photo-4556982.jpeg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Назад в корзину
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Оформление</span>
            <span className="block text-emerald-400">заказа</span>
          </h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                    Контактная информация
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Имя
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Фамилия
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                    Адрес доставки
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Адрес
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Город
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={customer.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Почтовый индекс
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={customer.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                    Способ оплаты
                  </h3>
                  <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center mb-3">
                      <CreditCard className="h-5 w-5 text-stone-600 mr-2" />
                      <span className="text-sm text-stone-600">Безопасная обработка платежей</span>
                    </div>
                    <p className="text-sm text-stone-500">
                      Это демо-версия оформления заказа. Реальная оплата не будет произведена.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-200/30 disabled:bg-stone-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-6">
              <h3 className="text-xl font-semibold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Ваш заказ
              </h3>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900">{item.product.name}</h4>
                      <p className="text-sm text-stone-600">{item.product.volume}</p>
                      <p className="text-sm text-stone-500">Кол-во: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-stone-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Подытог</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Доставка</span>
                  <span className="font-medium text-emerald-600">Бесплатно</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="text-stone-600">Налог</span>
                  <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-stone-200 pt-3">
                  <span>Итого</span>
                  <span className="text-emerald-600">${(state.total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-stone-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-stone-500" />
                  <span>Бесплатная доставка для всех заказов</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-stone-500" />
                  <span>Безопасное оформление</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;