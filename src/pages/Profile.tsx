import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, Edit, LogOut, ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        setUser(user);

        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;
          
          if (profile) {
            setProfile(profile);
            setName(profile.name || '');
            if (profile.avatar_url) {
              await downloadImage(profile.avatar_url);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      
      if (error) throw error;
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Ошибка загрузки аватара');
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const updates = {
        name,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile({ ...profile, ...updates });
      setIsEditing(false);
      toast.success('Профиль успешно обновлен');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Файл слишком большой (макс. 5MB)');
      return;
    }

    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
  };

  const saveAvatar = async () => {
    if (!avatarFile || !user) return;

    try {
      setUploading(true);
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Удаляем старый аватар если он существует
      if (profile?.avatar_url) {
        await supabase.storage.from('avatars').remove([profile.avatar_url]);
      }

      // Загружаем новый файл
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Обновляем профиль с новой ссылкой
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Обновляем локальное состояние
      setProfile({ ...profile, avatar_url: filePath });
      setAvatarFile(null);
      toast.success('Аватар успешно обновлен');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Ошибка загрузки аватара');
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async () => {
    if (!profile?.avatar_url || !user) return;

    try {
      setUploading(true);
      // Удаляем из хранилища
      await supabase.storage.from('avatars').remove([profile.avatar_url]);
      
      // Обновляем профиль
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      if (error) throw error;

      // Обновляем локальное состояние
      setProfile({ ...profile, avatar_url: null });
      setAvatarUrl(null);
      setAvatarFile(null);
      toast.success('Аватар удален');
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error('Ошибка удаления аватара');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Вы успешно вышли из системы');
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-emerald-50 to-white">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gradient-to-br from-emerald-50 to-white"
      >
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-stone-800">Вы не авторизованы</h2>
          <p className="mb-6 text-stone-600">Пожалуйста, войдите, чтобы просмотреть профиль.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md w-full font-medium"
          >
            Войти
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-stone-600 hover:text-emerald-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Назад
        </button>

        <motion.div 
          layout
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white relative">
            <div className="absolute top-4 right-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {user.role || 'Пользователь'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30 relative"
                >
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </motion.div>
                
                <label 
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <Upload className="h-5 w-5 text-white" />
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={uploading}
                />
                
                {avatarFile && (
                  <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={saveAvatar}
                      disabled={uploading}
                      className="bg-emerald-500 text-white p-1 rounded-full shadow-md"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="text-xs">Сохранить</span>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarUrl(profile?.avatar_url ? avatarUrl : null);
                      }}
                      className="bg-stone-500 text-white p-1 rounded-full shadow-md"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {profile?.name || 'Пользователь'}
                </h1>
                <p className="text-emerald-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-stone-800">Личные данные</h2>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-lg"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </motion.button>
              ) : (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Сохранение...
                      </>
                    ) : 'Сохранить'}
                  </motion.button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-4 rounded-lg">
                      <p className="text-sm text-stone-500 mb-1">Имя</p>
                      <p className="font-medium text-stone-800">
                        {profile?.name || 'Не указано'}
                      </p>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-lg">
                      <p className="text-sm text-stone-500 mb-1">Email</p>
                      <p className="font-medium text-stone-800">{user.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order History */}
          <div className="border-t border-stone-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-800">История заказов</h2>
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-stone-50 p-6 rounded-lg text-center border border-stone-200"
            >
              <div className="max-w-xs mx-auto">
                <svg className="mx-auto h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-stone-900">Здесь будут ваши заказы</h3>
                <p className="mt-1 text-sm text-stone-500">Совершайте покупки, чтобы увидеть историю заказов</p>
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/products')}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
                  >
                    Перейти в каталог
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Logout and Avatar Actions */}
          <div className="border-t border-stone-100 p-6 flex justify-between items-center">
            <motion.button
              whileHover={{ x: 2 }}
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors group"
            >
              <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Выйти из аккаунта
            </motion.button>
            
            {profile?.avatar_url && !avatarFile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={removeAvatar}
                disabled={uploading}
                className="text-stone-500 hover:text-stone-700 text-sm flex items-center"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <X className="h-4 w-4 mr-1" />
                )}
                Удалить аватар
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;