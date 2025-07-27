import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Clock, MapPin, Package, Award, Leaf, Coffee } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

// Вспомогательная функция для форматирования объекта origin
const formatOrigin = (origin: any) => {
  if (!origin) return 'Не указано';
  if (typeof origin === 'string') return origin;
  
  const parts = [];
  if (origin.country) parts.push(origin.country);
  if (origin.region) parts.push(origin.region);
  if (origin.altitude) parts.push(`(${origin.altitude})`);
  if (origin.farm) parts.push(`ферма ${origin.farm}`);
  
  return parts.join(', ');
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const product = products.find(p => p.id === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!product) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-sm border border-stone-100">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Продукт не найден</h1>
          <Link 
            to="/products" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Легкий': return 'bg-emerald-100 text-emerald-800';
      case 'Средний': return 'bg-amber-100 text-amber-800';
      case 'Крепкий': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  // Подготовка изображений
  const images = product.image?.main 
    ? [product.image.main, ...(product.image.gallery || [])] 
    : [product.image]; // fallback для старой структуры

  return (
    <div className="bg-stone-50 min-h-screen">
      <SEOHead 
        title={`${product.name} - Reserve Cold`}
        description={product.description}
        image={product.image?.main}
        type="product"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/products"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад к коллекции
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-stone-100 rounded-lg overflow-hidden transition-all ${
                      activeImage === index ? 'ring-2 ring-emerald-500' : 'hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                getStrengthColor(product.strength)
              }`}>
                {product.strength}
                {product.strengthLevel && ` • ${product.strengthLevel}/5`}
              </span>
              
              <div className="flex items-center gap-2">
                {product.featured && (
                  <span className="flex items-center bg-stone-100 px-3 py-1 rounded-full text-xs font-medium text-stone-700">
                    <Star className="h-4 w-4 text-amber-500 fill-current mr-1" />
                    Рекомендуем
                  </span>
                )}
                {product.bestSeller && (
                  <span className="flex items-center bg-stone-100 px-3 py-1 rounded-full text-xs font-medium text-stone-700">
                    <Award className="h-4 w-4 text-emerald-500 mr-1" />
                    Хит продаж
                  </span>
                )}
                {product.limitedEdition && (
                  <span className="flex items-center bg-stone-100 px-3 py-1 rounded-full text-xs font-medium text-stone-700">
                    <Leaf className="h-4 w-4 text-amber-500 mr-1" />
                    Лимитированная серия
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(product.rating || 0) 
                        ? 'text-amber-400 fill-current' 
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              {product.reviewsCount ? (
                <span className="text-sm text-stone-500">
                  {product.reviewsCount} {product.reviewsCount === 1 ? 'отзыв' : product.reviewsCount < 5 ? 'отзыва' : 'отзывов'}
                </span>
              ) : (
                <span className="text-sm text-stone-500">Нет отзывов</span>
              )}
            </div>
            
            <p className="text-lg text-stone-600 mb-8">{product.description}</p>
            
            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-3 bg-white rounded-lg border border-stone-100">
                <MapPin className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-500">Происхождение</p>
                  <p className="font-medium text-stone-900">
                    {formatOrigin(product.origin)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-stone-100">
                <Clock className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-500">Заваривание</p>
                  <p className="font-medium text-stone-900">
                    {product.brewTime || 'Не указано'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-stone-100">
                <Package className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-500">Объем</p>
                  <p className="font-medium text-stone-900">
                    {product.volume || 'Не указано'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-stone-100">
                <Coffee className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-500">Категория</p>
                  <p className="font-medium text-stone-900">
                    {product.category || 'Не указано'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl border border-stone-100">
              <label className="text-sm font-medium text-stone-700">Количество</label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-l-lg hover:bg-stone-50 transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="w-12 h-10 flex items-center justify-center border-t border-b border-stone-200 bg-white text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-r-lg hover:bg-stone-50 transition-colors"
                  aria-label="Увеличить количество"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center px-6 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md mb-8"
            >
              <ShoppingBag className="h-5 w-5 mr-3" />
              Добавить в корзину — {formatPrice(product.price * quantity)}
            </button>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white p-6 rounded-xl border border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">Описание</h3>
                <div className="prose prose-stone max-w-none">
                  {Array.isArray(product.longDescription) ? (
                    product.longDescription.map((paragraph, index) => (
                      <p key={index} className="text-stone-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-stone-700 leading-relaxed">
                      {product.longDescription || 'Описание отсутствует'}
                    </p>
                  )}
                </div>
              </div>

              {/* Tasting Notes */}
              {product.tastingNotes && product.tastingNotes.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-stone-100">
                  <h3 className="text-lg font-semibold text-stone-900 mb-4">Вкусовые ноты</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;