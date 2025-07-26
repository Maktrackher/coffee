import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity } = useCart();

  // Функция для форматирования цены в рубли с пробелом
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price).replace('₽', '₽');
  };

  // Получаем рекомендуемые товары (первые 3 из списка)
  const recommendedProducts = products.slice(0, 3);

  if (state.items.length === 0) {
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
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Откройте для себя нашу коллекцию премиального холодного кофе с уникальными вкусовыми профилями
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-200/20"
            >
              Исследовать коллекцию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">
              <span className="text-stone-600">Популярные</span> сорта
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedProducts.map(product => (
                <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all text-center">
                  <div className="h-40 bg-stone-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image.main} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{product.name}</h3>
                  <p className="text-stone-600 text-sm mb-2">{product.description}</p>
                  <p className="text-emerald-600 font-medium mb-4">{formatPrice(product.price)}</p>
                  <Link 
                    to={`/product/${product.id}`} 
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Подробнее
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
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
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Ваша</span>
            <span className="block text-emerald-400">корзина</span>
          </h1>
          <p className="text-lg text-stone-300">
            {state.items.length} {state.items.length === 1 ? 'товар' : 'товара'} • {formatPrice(state.total)}
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item) => {
                const product = products.find(p => p.id === item.product.id);
                if (!product) return null;
                
                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-stone-100"
                  >
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      <Link 
                        to={`/product/${product.id}`}
                        className="flex-shrink-0 relative"
                      >
                        <img
                          src={product.image.main}
                          alt={product.name}
                          className="h-32 w-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                      </Link>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-stone-900 mb-1">
                            <Link
                              to={`/product/${product.id}`}
                              className="hover:text-emerald-600 transition-colors"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-stone-600 mb-2 line-clamp-2">{product.description}</p>
                          <p className="text-sm text-emerald-600 font-medium">{product.volume}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity - 1)}
                              className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 font-medium text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, item.quantity + 1)}
                              className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <p className="text-xl font-semibold text-stone-900">
                              {formatPrice(product.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              aria-label="Удалить"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 border border-stone-100">
                <h3 className="text-xl font-semibold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                  Сумма заказа
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Товары ({state.items.length})</span>
                    <span className="font-medium">{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Доставка</span>
                    <span className="font-medium text-emerald-600">Бесплатно</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Примерный срок доставки</span>
                    <span>2-3 рабочих дня</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200">
                    <span className="text-stone-600">Налог (НДС 20%)</span>
                    <span className="font-medium">{formatPrice(state.total * 0.2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-stone-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-stone-900">Итого</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      {formatPrice(state.total * 1.2)}
                    </span>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-200/30 mb-4"
                >
                  Оформить заказ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/products"
                  className="w-full flex items-center justify-center px-6 py-3 border border-stone-300 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Продолжить покупки
                </Link>

                <div className="mt-6 pt-4 border-t border-stone-200">
                  <p className="text-sm text-stone-500 text-center">
                    Бесплатная доставка при заказе от 3000₽
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">
            <span className="text-stone-600">Дополните</span> ваш заказ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all text-center">
                <div className="h-40 bg-stone-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image.main} 
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{product.name}</h3>
                <p className="text-stone-600 text-sm mb-2">{product.description}</p>
                <p className="text-emerald-600 font-medium mb-4">{formatPrice(product.price)}</p>
                <Link 
                  to={`/product/${product.id}`} 
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  Подробнее
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;