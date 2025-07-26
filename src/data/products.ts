import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'ethiopian-reserve',
    sku: 'CRB-ETH-001',
    name: 'Резерв Эфиопский',
    description: 'Моносортовой холодный кофе с цветочными нотами',
    longDescription: [
      'Наш холодный кофе Резерв Эфиопский изготавливается из моносортовых зерен, выращенных в высокогорьях Эфиопии.',
      'Обладает сложным вкусовым профилем с яркими цветочными нотами, тонкими цитрусовыми оттенками и чистым освежающим послевкусием.',
      'Заваривается холодным способом в течение 24 часов для извлечения максимального вкуса при сохранении мягкости.'
    ],
    price: 2499,
    originalPrice: 2999,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe1.jpg',
      gallery: [
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe1.jpg',
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe1.jpg'
      ]
    },
    category: 'Моносорт',
    subCategory: 'Африканский',
    volume: '500 мл',
    strength: 'Средний',
    strengthLevel: 3,
    origin: {
      country: 'Эфиопия',
      region: 'Сидамо',
      altitude: '1800-2200 м',
      farm: 'Кооператив "Цветочные холмы"'
    },
    process: 'Натуральная обработка',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['бергамот', 'жасмин', 'лимон'],
    brewTime: '24 часа',
    ingredients: ['100% арабика'],
    nutritionalInfo: {
      calories: 5,
      caffeine: 150,
      sugar: 0,
      fat: 0
    },
    featured: true,
    bestSeller: true,
    seasonSpecial: false,
    rating: 4.8,
    reviewsCount: 42,
    stock: 150,
    tags: ['хит', 'премиум', 'цветочный'],
    variants: [
      { volume: '250 мл', price: 1499, sku: 'CRB-ETH-001-S' },
      { volume: '500 мл', price: 2499, sku: 'CRB-ETH-001-M' },
      { volume: '1 л', price: 3999, sku: 'CRB-ETH-001-L' }
    ],
    recommendedProducts: ['colombian-reserve', 'nitro-reserve'],
    awards: ['Gold Medal - Cold Brew Awards 2023'],
    recipePairing: ['лимонный тарт', 'ягодный чизкейк']
  },
  {
    id: 'colombian-reserve',
    sku: 'CRB-COL-002',
    name: 'Резерв Колумбийский',
    description: 'Насыщенный, мягкий холодный кофе с шоколадными нотами',
    longDescription: [
      'Ощутите богатое наследие колумбийского кофе с нашим холодным кофе Резерв Колумбийский.',
      'Этот премиальный купаж включает зерна из знаменитых кофейных регионов Колумбии.',
      'Обеспечивает мягкий, полнотелый вкус с нотами темного шоколада и карамели.'
    ],
    price: 2299,
    originalPrice: 2599,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe2.jpg',
      gallery: [
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe2.jpg',
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe2.jpg'
      ]
    },
    category: 'Моносорт',
    subCategory: 'Латинская Америка',
    volume: '500 мл',
    strength: 'Крепкий',
    strengthLevel: 4,
    origin: {
      country: 'Колумбия',
      region: 'Уила',
      altitude: '1600-2000 м',
      farm: 'Финка "Эль Параисо"'
    },
    process: 'Мытая обработка',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['темный шоколад', 'карамель', 'орех'],
    brewTime: '24 часа',
    ingredients: ['100% арабика'],
    nutritionalInfo: {
      calories: 5,
      caffeine: 180,
      sugar: 0,
      fat: 0
    },
    featured: true,
    bestSeller: true,
    rating: 4.7,
    reviewsCount: 35,
    stock: 120,
    tags: ['шоколадный', 'насыщенный'],
    variants: [
      { volume: '250 мл', price: 1399, sku: 'CRB-COL-002-S' },
      { volume: '500 мл', price: 2299, sku: 'CRB-COL-002-M' }
    ],
    recommendedProducts: ['ethiopian-reserve', 'guatemala-reserve'],
    awards: ['Silver Medal - Global Coffee Challenge 2022'],
    recipePairing: ['шоколадный мусс', 'ореховое печенье']
  },
  {
    id: 'blend-reserve',
    sku: 'CRB-BLD-003',
    name: 'Резерв Купаж',
    description: 'Фирменный домашний купаж холодного кофе',
    longDescription: [
      'Наш фирменный Резерв Купаж объединяет лучшие зерна из разных регионов.',
      'Этот мастерски созданный купаж предлагает ноты ванили, орехов и легкую сладость.',
      'Идеальный выбор как для кофейных знатоков, так и для новичков в мире холодного кофе.'
    ],
    price: 1999,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe3.jpg',
      gallery: [
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe3.jpg',
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe3.jpg'
      ]
    },
    category: 'Купаж',
    subCategory: 'Авторский микс',
    volume: '500 мл',
    strength: 'Средний',
    strengthLevel: 3,
    origin: {
      country: 'Мультирегиональный',
      regions: ['Бразилия', 'Колумбия', 'Эфиопия']
    },
    process: 'Комбинированная обработка',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['ваниль', 'орех', 'карамель'],
    brewTime: '20 часов',
    ingredients: ['100% арабика'],
    nutritionalInfo: {
      calories: 5,
      caffeine: 160,
      sugar: 0,
      fat: 0
    },
    rating: 4.5,
    reviewsCount: 28,
    stock: 95,
    tags: ['сбалансированный', 'универсальный'],
    variants: [
      { volume: '500 мл', price: 1999, sku: 'CRB-BLD-003-M' },
      { volume: '1 л', price: 3499, sku: 'CRB-BLD-003-L' }
    ],
    recommendedProducts: ['decaf-reserve', 'nitro-reserve'],
    recipePairing: ['ванильное мороженое', 'миндальное печенье']
  },
  {
    id: 'decaf-reserve',
    sku: 'CRB-DCF-004',
    name: 'Резерв Декаф',
    description: 'Полный вкус без кофеина',
    longDescription: [
      'Наслаждайтесь всеми богатыми, сложными вкусами холодного кофе без кофеина.',
      'Изготавливается с использованием швейцарского водного процесса для удаления кофеина.',
      'Мягкий, нежный напиток с нотами карамели и орехов с чистым послевкусием.'
    ],
    price: 2199,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe4.jpg',
      gallery: [
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe4.jpg',
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe4.jpg'
      ]
    },
    category: 'Без кофеина',
    subCategory: 'Вечерний',
    volume: '500 мл',
    strength: 'Легкий',
    strengthLevel: 2,
    origin: {
      country: 'Мультирегиональный',
      regions: ['Бразилия', 'Колумбия']
    },
    process: 'Швейцарский водный метод',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['карамель', 'орех', 'мед'],
    brewTime: '18 часов',
    ingredients: ['100% арабика (без кофеина)'],
    nutritionalInfo: {
      calories: 5,
      caffeine: 5,
      sugar: 0,
      fat: 0
    },
    rating: 4.6,
    reviewsCount: 31,
    stock: 80,
    tags: ['без кофеина', 'вечерний'],
    variants: [
      { volume: '250 мл', price: 1299, sku: 'CRB-DCF-004-S' },
      { volume: '500 мл', price: 2199, sku: 'CRB-DCF-004-M' }
    ],
    recommendedProducts: ['blend-reserve', 'ethiopian-reserve'],
    recipePairing: ['медовый кекс', 'миндальные макаруны']
  },
  {
    id: 'nitro-reserve',
    sku: 'CRB-NIT-005',
    name: 'Резерв Нитро',
    description: 'Мягкий холодный кофе с азотом',
    longDescription: [
      'Ощутите мягкую, кремовую текстуру нашего холодного кофе с азотом.',
      'Насыщенный азотом, этот премиальный напиток обладает бархатистым ощущением во рту.',
      'Лучше всего подавать охлажденным и наслаждаться свежим.'
    ],
    price: 2699,
    originalPrice: 2999,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe5.jpg',
      gallery: [
       'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe5.jpg',
       'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe5.jpg'
      ]
    },
    category: 'Специальный',
    subCategory: 'Нитро кофе',
    volume: '500 мл',
    strength: 'Средний',
    strengthLevel: 3,
    origin: {
      country: 'Купаж',
      regions: ['Бразилия', 'Колумбия', 'Эфиопия']
    },
    process: 'Холодное заваривание + азотирование',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['ваниль', 'карамель', 'сливочность'],
    brewTime: '24 часа + азотирование',
    ingredients: ['100% арабика', 'азот'],
    nutritionalInfo: {
      calories: 10,
      caffeine: 150,
      sugar: 0,
      fat: 0
    },
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewsCount: 58,
    stock: 90,
    tags: ['нитро', 'кремовый', 'лимитированный'],
    variants: [
      { volume: '330 мл', price: 2299, sku: 'CRB-NIT-005-S' },
      { volume: '500 мл', price: 2699, sku: 'CRB-NIT-005-M' }
    ],
    recommendedProducts: ['ethiopian-reserve', 'colombian-reserve'],
    servingRecommendation: 'Подавать охлажденным в бокале для эля',
    limitedEdition: true,
    awards: ['Best Nitro Cold Brew 2023'],
    recipePairing: ['ванильный пудинг', 'крем-брюле']
  },
  {
    id: 'guatemala-reserve',
    sku: 'CRB-GTM-006',
    name: 'Резерв Гватемала',
    description: 'Насыщенный гватемальский моносорт',
    longDescription: [
      'Откройте для себя смелые, отличительные вкусы нашего холодного кофе Резерв Гватемала.',
      'Выращенный на вулканических почвах высокогорий Гватемалы.',
      'Обладает полнотелым вкусом с нотами темного шоколада, специй и тонкой дымности.'
    ],
    price: 2399,
    image: {
      main: 'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe6.jpg',
      gallery: [
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe6.jpg',
        'https://ivdyisdjulizdrtxlfpb.supabase.co/storage/v1/object/public/images//coffe6.jpg'
      ]
    },
    category: 'Моносорт',
    subCategory: 'Центральная Америка',
    volume: '500 мл',
    strength: 'Крепкий',
    strengthLevel: 4,
    origin: {
      country: 'Гватемала',
      region: 'Антигуа',
      altitude: '1500-2000 м',
      farm: 'Финка "Вулканические склоны"'
    },
    process: 'Мытая обработка',
    roastLevel: 'Средняя обжарка',
    tastingNotes: ['темный шоколад', 'специи', 'дымность'],
    brewTime: '24 часа',
    ingredients: ['100% арабика'],
    nutritionalInfo: {
      calories: 5,
      caffeine: 170,
      sugar: 0,
      fat: 0
    },
    rating: 4.7,
    reviewsCount: 39,
    stock: 75,
    tags: ['вулканический', 'пряный'],
    variants: [
      { volume: '500 мл', price: 2399, sku: 'CRB-GTM-006-M' },
      { volume: '1 л', price: 4199, sku: 'CRB-GTM-006-L' }
    ],
    recommendedProducts: ['colombian-reserve', 'nitro-reserve'],
    awards: ['Bronze Medal - Specialty Coffee Expo 2023'],
    recipePairing: ['шоколадный торт', 'пряники']
  }
];