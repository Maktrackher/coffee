import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Award, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Легкий': return 'bg-emerald-100 text-emerald-800';
      case 'Средний': return 'bg-amber-100 text-amber-800';
      case 'Крепкий': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      // Убедимся, что передаем числовые значения цен
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image?.main}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {product.featured && (
            <span className="flex items-center bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-stone-700">
              <Star className="h-4 w-4 text-amber-500 fill-current mr-1" />
              Рекомендуем
            </span>
          )}
          {product.bestSeller && (
            <span className="flex items-center bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-stone-700">
              <Award className="h-4 w-4 text-emerald-500 mr-1" />
              Хит продаж
            </span>
          )}
          {product.limitedEdition && (
            <span className="flex items-center bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-stone-700">
              <Leaf className="h-4 w-4 text-amber-500 mr-1" />
              Лимитированная
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-emerald-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-emerald-700 shadow-md"
          aria-label="Добавить в корзину"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${getStrengthColor(product.strength)}`}>
            {product.strength}
            {product.strengthLevel && ` • ${product.strengthLevel}/5`}
          </span>
          
          <h3 className="text-lg font-semibold text-stone-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-stone-500 line-clamp-2">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-auto mb-3">
          <div className="flex items-center mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(product.rating || 0) 
                    ? 'text-amber-400 fill-current' 
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          {product.reviewsCount && (
            <span className="text-xs text-stone-500">
              {product.reviewsCount}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-stone-900">
              {formatPrice(Number(product.price))}
            </span>
            {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
              <span className="text-sm text-stone-400 line-through ml-2">
                {formatPrice(Number(product.originalPrice))}
              </span>
            )}
          </div>
          <span className="text-xs text-stone-500">{product.volume}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;