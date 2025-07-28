import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Coffee, ChevronDown, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Profile {
  avatar_url: string | null;
}

interface NavigationItem {
  name: string;
  href: string;
  subItems?: Array<{
    name: string;
    href: string;
  }>;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  
  const { getItemCount } = useCart();
  const { user, loading: authLoading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const navigation: NavigationItem[] = [
    { name: 'Главная', href: '/' },
    { 
      name: 'Коллекция', 
      href: '/products',
      subItems: [
        { name: 'Моносорта', href: '/products?category=Моносорт' },
        { name: 'Купажи', href: '/products?category=Купаж' },
        { name: 'Специальные', href: '/products?category=Специальный' }
      ]
    },
    { name: 'О производстве', href: '/about' },
    { name: 'Контакты', href: '/contacts' }
  ];

  // Загрузка данных профиля пользователя
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setAvatarUrl(null);
      setProfileLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();

        if (!error) {
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Загрузка изображения аватара
  useEffect(() => {
    if (!profile?.avatar_url) {
      setAvatarUrl(null);
      return;
    }

    const downloadImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(profile.avatar_url);
        
        if (error) throw error;
        
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.error('Error downloading avatar:', error);
        setAvatarUrl(null);
      }
    };

    downloadImage();
  }, [profile]);

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  if (authLoading || profileLoading) {
    return <LoadingHeader isScrolled={isScrolled} />;
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
        : 'bg-gradient-to-b from-black/10 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo isScrolled={isScrolled} />
          
          <DesktopNavigation 
            navigation={navigation} 
            isScrolled={isScrolled} 
            isActive={isActive}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          
          <UserActions 
            isScrolled={isScrolled}
            itemCount={itemCount}
            user={user}
            avatarUrl={avatarUrl}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
            handleLogout={handleLogout}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
          />
        </div>

        <MobileNavigation 
          isMenuOpen={isMenuOpen}
          navigation={navigation}
          isScrolled={isScrolled}
          isActive={isActive}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          avatarUrl={avatarUrl}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

// Sub-components for better readability

const LoadingHeader: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <header className={`fixed w-full top-0 z-50 ${isScrolled ? 'bg-white/90' : 'bg-transparent'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
      <div className="flex space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  </header>
);

const Logo: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <Link to="/" className="flex items-center space-x-2 group relative" aria-label="На главную">
    <motion.div 
      whileHover={{ rotate: 15 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative"
    >
      <Coffee className={`h-8 w-8 ${isScrolled ? 'text-emerald-600' : 'text-white drop-shadow-md'}`} />
      <motion.span 
        animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"
      />
    </motion.div>
    <motion.span 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-2xl font-bold ${isScrolled ? 'text-stone-900' : 'text-white drop-shadow-md'} font-serif tracking-tight`}
    >
      <span className={isScrolled ? 'text-stone-900' : 'text-white'}>Reserve</span>
      <span className="text-emerald-500">Cold</span>
    </motion.span>
  </Link>
);

const DesktopNavigation: React.FC<{
  navigation: NavigationItem[];
  isScrolled: boolean;
  isActive: (path: string) => boolean;
  activeDropdown: string | null;
  setActiveDropdown: (value: string | null) => void;
}> = ({ navigation, isScrolled, isActive, activeDropdown, setActiveDropdown }) => (
  <nav className="hidden md:flex items-center space-x-6">
    {navigation.map((item) => (
      <div 
        key={item.name} 
        className="relative"
        onMouseEnter={() => item.subItems && setActiveDropdown(item.name)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link
          to={item.href}
          className={`flex items-center py-2 px-3 font-medium transition-colors rounded-lg ${
            isActive(item.href)
              ? `${isScrolled ? 'text-emerald-600' : 'text-emerald-300 drop-shadow-md'}`
              : `${isScrolled ? 'text-stone-700 hover:text-emerald-600' : 'text-white/90 hover:text-white drop-shadow-md'}`
          }`}
        >
          {item.name}
          {item.subItems && (
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''} ${
              isScrolled ? 'text-stone-500' : 'text-white/70 drop-shadow-md'
            }`} />
          )}
        </Link>

        {item.subItems && activeDropdown === item.name && (
          <div className="absolute left-0 mt-2 w-56 origin-top-right transition-all duration-200 z-50">
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden"
            >
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.name}
                  to={subItem.href}
                  className="block px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 hover:text-emerald-600 transition-colors"
                >
                  {subItem.name}
                </Link>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    ))}
  </nav>
);

const UserActions: React.FC<{
  isScrolled: boolean;
  itemCount: number;
  user: any;
  avatarUrl: string | null;
  isProfileOpen: boolean;
  setIsProfileOpen: (value: boolean) => void;
  handleLogout: () => void;
  setIsMenuOpen: (value: boolean) => void;
  isMenuOpen: boolean;
}> = ({
  isScrolled,
  itemCount,
  user,
  avatarUrl,
  isProfileOpen,
  setIsProfileOpen,
  handleLogout,
  setIsMenuOpen,
  isMenuOpen
}) => (
  <div className="flex items-center space-x-4">
    <CartButton isScrolled={isScrolled} itemCount={itemCount} />
    
    {user ? (
      <UserProfile 
        user={user}
        avatarUrl={avatarUrl}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        handleLogout={handleLogout}
        isScrolled={isScrolled}
      />
    ) : (
      <LoginButton isScrolled={isScrolled} />
    )}

    <MobileMenuButton 
      isScrolled={isScrolled}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    />
  </div>
);

const CartButton: React.FC<{ isScrolled: boolean; itemCount: number }> = ({ isScrolled, itemCount }) => (
  <Link to="/cart" className="relative p-2 group" aria-label="Корзина">
    <ShoppingBag className={`h-6 w-6 transition-colors ${
      isScrolled 
        ? 'text-stone-700 group-hover:text-emerald-600' 
        : 'text-white/90 group-hover:text-white drop-shadow-md'
    }`} />
    {itemCount > 0 && (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
      >
        {itemCount}
      </motion.span>
    )}
  </Link>
);

const UserProfile: React.FC<{
  user: any;
  avatarUrl: string | null;
  isProfileOpen: boolean;
  setIsProfileOpen: (value: boolean) => void;
  handleLogout: () => void;
  isScrolled: boolean;
}> = ({ user, avatarUrl, isProfileOpen, setIsProfileOpen, handleLogout, isScrolled }) => (
  <div className="relative">
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="p-2 rounded-full transition-colors hover:bg-stone-100/50"
      aria-label="Профиль"
    >
      {avatarUrl ? (
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-500"
        >
          <img 
            src={avatarUrl} 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
          {user.email?.charAt(0).toUpperCase()}
        </div>
      )}
    </button>

    <AnimatePresence>
      {isProfileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden z-50"
        >
          <Link
            to="/profile"
            onClick={() => setIsProfileOpen(false)}
            className="flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <User className="h-4 w-4 mr-2" />
            Личный кабинет
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Выйти
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const LoginButton: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <Link
    to="/login"
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      isScrolled 
        ? 'text-stone-700 hover:text-emerald-600' 
        : 'text-white/90 hover:text-white drop-shadow-md'
    }`}
  >
    Войти
  </Link>
);

const MobileMenuButton: React.FC<{
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}> = ({ isScrolled, isMenuOpen, setIsMenuOpen }) => (
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className={`md:hidden p-2 transition-colors ${
      isScrolled 
        ? 'text-stone-700 hover:text-emerald-600' 
        : 'text-white/90 hover:text-white drop-shadow-md'
    }`}
    aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
  >
    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
);

const MobileNavigation: React.FC<{
  isMenuOpen: boolean;
  navigation: NavigationItem[];
  isScrolled: boolean;
  isActive: (path: string) => boolean;
  setIsMenuOpen: (value: boolean) => void;
  user: any;
  avatarUrl: string | null;
  handleLogout: () => void;
}> = ({
  isMenuOpen,
  navigation,
  isScrolled,
  isActive,
  setIsMenuOpen,
  user,
  avatarUrl,
  handleLogout
}) => (
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <nav className="flex flex-col space-y-1 mt-4 pb-4">
          {navigation.map((item) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : `${isScrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white/90 hover:bg-white/10'}`
                }`}
              >
                {item.name}
              </Link>
              {item.subItems && (
                <div className="ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-2 px-4 text-sm rounded-lg ${
                        isActive(subItem.href)
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : `${isScrolled ? 'text-stone-600 hover:bg-stone-100' : 'text-white/80 hover:bg-white/10'}`
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 font-medium rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : `${isScrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white/90 hover:bg-white/10'}`
                }`}
              >
                Личный кабинет
              </Link>
              <button
                onClick={handleLogout}
                className={`w-full text-left py-3 px-4 font-medium rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-stone-700 hover:bg-stone-100' 
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`py-3 px-4 font-medium rounded-lg transition-colors ${
                isActive('/login')
                  ? 'bg-emerald-500/10 text-emerald-600'
                  : `${isScrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white/90 hover:bg-white/10'}`
              }`}
            >
              Войти
            </Link>
          )}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Header;