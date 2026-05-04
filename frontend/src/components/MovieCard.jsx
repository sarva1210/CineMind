import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import favoritesApi from '../services/api/favoritesApi';

export default function MovieCard({ movie, onFavoriteChange }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !movie.id) return;
      try {
        const result = await favoritesApi.isFavorite(movie.id);
        setIsFavorite(result.isFavorite || false);
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    };
    checkFavorite();
  }, [movie.id, user]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await favoritesApi.removeFavorite(movie.id);
        setIsFavorite(false);
      } else {
        await favoritesApi.addFavorite(movie.id);
        setIsFavorite(true);
      }
      onFavoriteChange?.();
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -15, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-purple-900/40 to-black backdrop-blur border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
        {/* Movie Poster */}
        <div className="relative overflow-hidden h-80">
          <motion.img
            src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur hover:bg-purple-600 transition-colors"
          >
            {isFavorite ? (
              <AiFillHeart className="w-6 h-6 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* Rating Badge */}
          {movie.rating && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-yellow-500/80 text-black font-bold text-sm backdrop-blur">
              ⭐ {movie.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg line-clamp-2 text-white group-hover:text-purple-300 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">{movie.genre?.join(', ')}</p>
          <p className="text-xs text-gray-500">{movie.releaseYear || movie.year}</p>
        </div>

        {/* Hover Info */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-semibold text-white transition-all transform group-hover:scale-100 scale-95">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
