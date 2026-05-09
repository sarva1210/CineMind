import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import favoritesApi from '../services/api/favoritesApi';


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await favoritesApi.getFavorites(1);
      setFavorites(res.movies || res);
    } catch (err) {
      setError(err.message || 'Failed to fetch favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black pt-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            💖
          </motion.div>
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              My Favorites
            </h1>
            <p className="text-gray-400 text-lg mt-2">
              {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 text-center mb-8"
          >
            {error}
          </motion.div>
        )}

        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} onFavoriteChange={fetchFavorites} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💔
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">No Favorites Yet</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              Start adding your favorite movies to your collection. Click the heart icon on any movie card!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all"
            >
              Explore Movies
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
