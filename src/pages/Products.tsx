import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Filter, X, ChevronDown, Check, Coffee, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState({
    category: queryParams.get('category') || 'Все',
    strength: queryParams.get('strength') || 'Все',
    sort: queryParams.get('sort') || 'name-asc'
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const strengths = ['Все', 'Легкий', 'Средний', 'Крепкий'];
  
  const sortOptions = [
    { value: 'name-asc', label: 'По названию (А-Я)' },
    { value: 'name-desc', label: 'По названию (Я-А)' },
    { value: 'price-asc', label: 'По цене (сначала дешевле)' },
    { value: 'price-desc', label: 'По цене (сначала дороже)' }
  ];

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category !== 'Все') params.set('category', filters.category);
    if (filters.strength !== 'Все') params.set('strength', filters.strength);
    if (filters.sort !== 'name-asc') params.set('sort', filters.sort);
    
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  useEffect(() => {
    const category = queryParams.get('category');
    const strength = queryParams.get('strength');
    const sort = queryParams.get('sort');
    
    setFilters(prev => ({
      category: category || prev.category,
      strength: strength || prev.strength,
      sort: sort || prev.sort
    }));
  }, [location.search]);

  const filteredProducts = products
    .filter(product => filters.category === 'Все' || product.category === filters.category)
    .filter(product => filters.strength === 'Все' || product.strength === filters.strength)
    .sort((a, b) => {
      const [sortKey, direction] = filters.sort.split('-');
      if (sortKey === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        return direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
    });

  const activeFilterCount = [filters.category, filters.strength].filter(
    f => f !== 'Все'
  ).length;

  const updateFilter = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'Все',
      strength: 'Все',
      sort: 'name-asc'
    });
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4556982/pexels-photo-4556982.jpeg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-400/30">
              Коллекция холодного кофе
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Исключительные</span>
              <span className="block text-emerald-400">вкусовые профили</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed mb-8">
              Отборные моносорта и купажи, приготовленные по нашей фирменной технологии
              холодного заваривания в течение 24 часов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="#products"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow hover:shadow-lg"
              >
                Исследовать коллекцию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Фильтры</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
                  <span>Категория: {filters.category}</span>
                  <ChevronDown className="h-4 w-4 text-stone-500 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => updateFilter('category', category)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                        filters.category === category 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      {category}
                      {filters.category === category && <Check className="h-5 w-5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
                  <span>Крепость: {filters.strength}</span>
                  <ChevronDown className="h-4 w-4 text-stone-500 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {strengths.map(strength => (
                    <button
                      key={strength}
                      onClick={() => updateFilter('strength', strength)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                        filters.strength === strength 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      {strength}
                      {filters.strength === strength && <Check className="h-5 w-5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
              <span>
                {sortOptions.find(opt => opt.value === filters.sort)?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-stone-500 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute z-10 mt-2 right-0 w-64 bg-white rounded-xl shadow-lg border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateFilter('sort', option.value)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                    filters.sort === option.value 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'hover:bg-stone-50'
                  }`}
                >
                  {option.label}
                  {filters.sort === option.value && <Check className="h-5 w-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.category !== 'Все' || filters.strength !== 'Все') && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-stone-500">Фильтры:</span>
            {filters.category !== 'Все' && (
              <div className="flex items-center bg-emerald-50 rounded-full pl-4 pr-2 py-2 text-sm">
                <span className="mr-2 text-emerald-700">{filters.category}</span>
                <button
                  onClick={() => updateFilter('category', 'Все')}
                  className="text-emerald-600 hover:text-emerald-800 rounded-full p-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {filters.strength !== 'Все' && (
              <div className="flex items-center bg-emerald-50 rounded-full pl-4 pr-2 py-2 text-sm">
                <span className="mr-2 text-emerald-700">{filters.strength}</span>
                <button
                  onClick={() => updateFilter('strength', 'Все')}
                  className="text-emerald-600 hover:text-emerald-800 rounded-full p-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Очистить все
            </button>
          </div>
        )}

        {/* Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-stone-900">Фильтры</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-stone-500 hover:text-stone-700 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Категория</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => updateFilter('category', category)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                          filters.category === category 
                            ? 'bg-emerald-600 text-white' 
                            : 'hover:bg-stone-100'
                        }`}
                      >
                        {category}
                        {filters.category === category && <Check className="h-5 w-5" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Крепость</h4>
                  <div className="space-y-2">
                    {strengths.map(strength => (
                      <button
                        key={strength}
                        onClick={() => updateFilter('strength', strength)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                          filters.strength === strength 
                            ? 'bg-emerald-600 text-white' 
                            : 'hover:bg-stone-100'
                        }`}
                      >
                        {strength}
                        {filters.strength === strength && <Check className="h-5 w-5" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">Сортировка</h4>
                  <div className="space-y-2">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateFilter('sort', option.value)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                          filters.sort === option.value 
                            ? 'bg-emerald-600 text-white' 
                            : 'hover:bg-stone-100'
                        }`}
                      >
                        {option.label}
                        {filters.sort === option.value && <Check className="h-5 w-5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 px-4 py-3 bg-stone-100 text-stone-700 rounded-lg font-medium hover:bg-stone-200 transition-colors"
                >
                  Сбросить
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} // Передаем продукт без изменений
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-sm">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
              <Coffee className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-3">Ничего не найдено</h3>
            <p className="text-stone-600 mb-6 max-w-md mx-auto">
              Попробуйте изменить параметры фильтрации или посмотрите другие категории
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow hover:shadow-md"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;