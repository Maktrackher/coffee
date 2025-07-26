import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Lock, User, Mail, Eye, EyeOff, Coffee, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export const AuthPage = () => {
  // Состояния формы
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  // Обратный отсчет для задержки между запросами
  useEffect(() => {
    if (cooldown <= 0) return;
    
    const timer = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [cooldown]);

  // Обработчик изменения полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Валидация формы
  const validateForm = () => {
    if (!formData.email) {
      setError('Email обязателен для заполнения');
      return false;
    }
    if (!formData.password) {
      setError('Пароль обязателен для заполнения');
      return false;
    }
    if (!isLogin && !formData.name) {
      setError('Имя обязательно для заполнения');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  // Проверка существования профиля
  const checkProfileExists = async (userId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Profile check error:', error);
      return false;
    }

    return !!data;
  };

  // Создание или обновление профиля
  const upsertUserProfile = async (userId: string, name: string, email: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: name,
          email: email,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) throw error;
      
    } catch (error) {
      console.error('Profile upsert error:', error);
      // Если это ошибка дублирования - не считаем критичной
      if (error.code !== '23505') {
        throw new Error('Ошибка при обновлении профиля');
      }
    }
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    if (cooldown > 0) {
      setError(`Пожалуйста, подождите ${cooldown} секунд перед повторной попыткой`);
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        // Вход пользователя
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;
        
        toast.success('Вход выполнен успешно!');
        navigate('/profile');
      } else {
        // Регистрация пользователя
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { name: formData.name },
            emailRedirectTo: `${window.location.origin}/profile`
          }
        });

        if (signUpError) {
          // Обработка ограничения скорости запросов
          if (signUpError.message.includes('rate limit') || signUpError.message.includes('seconds')) {
            const waitTime = 60;
            setCooldown(waitTime);
            throw new Error(`Слишком много запросов. Попробуйте через ${waitTime} секунд`);
          }
          throw signUpError;
        }
        
        // Создание/обновление профиля
        if (data.user) {
          await upsertUserProfile(data.user.id, formData.name, formData.email);
        }

        setEmailSent(true);
        toast.success('Письмо с подтверждением отправлено на ваш email!');
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      const errorMessage = 
        err.message.includes('Invalid login credentials') ? 'Неверный email или пароль' :
        err.code === '23505' ? 'Профиль уже существует' :
        err.message.includes('User already registered') ? 'Пользователь с таким email уже существует' :
        err.message.includes('Email rate limit exceeded') ? 'Слишком много запросов. Попробуйте позже' :
        err.message.includes('Ошибка при создании профиля') ? 'Ошибка при создании профиля' :
        'Произошла ошибка при авторизации';
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Сброс пароля
  const handlePasswordReset = async () => {
    if (!formData.email) {
      setError('Введите email для восстановления пароля');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          setCooldown(60);
          throw new Error('Слишком много запросов. Попробуйте позже');
        }
        throw error;
      }
      
      toast.success('Ссылка для сброса пароля отправлена на ваш email');
      setEmailSent(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Ошибка при отправке ссылки для сброса пароля');
      toast.error(err.message || 'Ошибка при отправке ссылки для сброса пароля');
    } finally {
      setLoading(false);
    }
  };

  // Экран подтверждения отправки email
  if (emailSent) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Проверьте ваш email
          </h2>
          <p className="text-stone-600 mb-6">
            {isLogin 
              ? 'Мы отправили ссылку для сброса пароля на вашу почту'
              : 'Мы отправили ссылку для подтверждения регистрации на вашу почту'}
          </p>
          <button
            onClick={() => {
              setEmailSent(false);
              setIsLogin(true);
            }}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Вернуться к входу
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Герой-секция */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-900 opacity-95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-500/10 p-4 rounded-full">
                <Coffee className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">{isLogin ? 'Добро пожаловать' : 'Создайте'}</span>
              <span className="block text-emerald-400">{isLogin ? 'обратно' : 'аккаунт'}</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              {isLogin ? 'Войдите в ваш аккаунт Reserve Cold' : 'Присоединяйтесь к нашему сообществу'}
            </p>
          </div>
        </div>
      </section>

      {/* Секция формы */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 md:p-10"
          >
            <Link
              to="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              На главную
            </Link>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Ваше имя
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition placeholder-stone-400"
                      placeholder="Иван Иванов"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email адрес
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition placeholder-stone-400"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition placeholder-stone-400"
                    placeholder="Не менее 6 символов"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : isLogin ? (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Войти
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 mr-2" />
                    Зарегистрироваться
                  </>
                )}
              </button>

              {cooldown > 0 && (
                <div className="text-center text-sm text-stone-500 mt-2">
                  Повторная попытка возможна через: {cooldown} сек.
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium w-full text-center"
              >
                {isLogin ? (
                  <>Нет аккаунта? <span className="underline">Создать новый</span></>
                ) : (
                  <>Уже есть аккаунт? <span className="underline">Войти</span></>
                )}
              </button>

              {isLogin && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handlePasswordReset}
                    className="text-stone-500 hover:text-emerald-600 text-sm transition"
                  >
                    Забыли пароль?
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Футер */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            Reserve Cold — исключительное качество
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6">
            Присоединяйтесь к нашему сообществу ценителей кофе
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all duration-300 shadow hover:shadow-lg"
            >
              Наш ассортимент
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-stone-300 bg-white text-stone-700 font-medium rounded-lg hover:bg-stone-50 transition-all duration-300 shadow-sm hover:shadow"
            >
              О производстве
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;