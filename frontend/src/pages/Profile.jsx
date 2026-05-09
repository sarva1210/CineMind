import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader';
import favoritesApi from '../services/api/favoritesApi';


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [watchHistory, setWatchHistory] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const { user, isAuthenticated, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProfileData();
  }, [isAuthenticated, navigate]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      await getProfile();
      
      // Fetch watch history and favorites count
      const [historyRes, favRes] = await Promise.all([
        favoritesApi.getWatchHistory(1).catch(() => ({ movies: [] })),
        favoritesApi.getFavorites(1).catch(() => ({ movies: [] })),
      ]);

      setWatchHistory(historyRes.movies || historyRes);
      setFavoriteCount((favRes.movies || favRes).length);

      // Initialize form
      if (user) {
        setFormData({
          username: user.username || '',
          email: user.email || '',
          bio: user.bio || '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      // Refresh profile
      await getProfile();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) return <Loader />;


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black pt-20 pb-12">
      {/* Profile Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
      >
        {/* Profile Card */}
        <motion.div
          className="rounded-2xl bg-gradient-to-b from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
            <div className="flex gap-6 items-start md:items-center flex-1">
              {/* Avatar */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl md:text-5xl flex-shrink-0"
              >
                {user?.username?.[0]?.toUpperCase() || '👤'}
              </motion.div>

              {/* User Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-purple-500/30 focus:border-purple-500 outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-purple-500/30 focus:border-purple-500 outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-purple-500/30 focus:border-purple-500 outline-none text-white resize-none"
                        rows="3"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-white mb-2">{user?.username}</h1>
                    <p className="text-gray-400 mb-1">{user?.email}</p>
                    {user?.bio && <p className="text-gray-300">{user.bio}</p>}
                  </>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex gap-3 w-full md:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 md:flex-none flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all"
                >
                  <AiOutlineSave className="w-5 h-5" />
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      username: user?.username || '',
                      email: user?.email || '',
                      bio: user?.bio || '',
                    });
                  }}
                  className="flex-1 md:flex-none flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800/50 text-gray-300 font-bold transition-all"
                >
                  <AiOutlineClose className="w-5 h-5" />
                  Cancel
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto flex items-center gap-2 px-6 py-3 rounded-lg border border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold transition-all"
              >
                <AiOutlineEdit className="w-5 h-5" />
                Edit Profile
              </motion.button>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-8">Your Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '💖', label: 'Favorites', value: favoriteCount },
            { icon: '👁️', label: 'Watch History', value: watchHistory.length },
            { icon: '⭐', label: 'Reviews', value: 0 },
            { icon: '🎯', label: 'Streak', value: '7 days' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-b from-purple-900/30 to-blue-900/30 border border-purple-500/20 text-center hover:border-purple-500/50 transition-all"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Watch History */}
      {watchHistory.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-8">📺 Recent Watch History</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {watchHistory.slice(0, 8).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500 transition-all cursor-pointer group"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform"
                />
                <div className="p-2 bg-black/50">
                  <p className="text-xs font-semibold text-white line-clamp-2">{movie.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Account Settings */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-8">⚙️ Settings</h2>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', enabled: true },
            { label: 'Recommendations', enabled: true },
            { label: 'Dark Mode', enabled: true },
          ].map((setting, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20"
            >
              <span className="text-white font-semibold">{setting.label}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="w-6 h-6 rounded cursor-pointer accent-purple-600"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}