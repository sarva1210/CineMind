import { motion } from 'framer-motion';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSavedMovies } from '../context/SavedMoviesContext';

export default function MovieCard({ movie, onFavoriteChange }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, isInWatchLater, toggleWatchLater } = useSavedMovies();

  const favorited = isFavorite(movie.id);
  const watchLater = isInWatchLater(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
    onFavoriteChange?.();
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    toggleWatchLater(movie);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const posterUrl =
    movie.posterUrl ||
    (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);

  const rating = movie.rating || movie.vote_average;
  const year = movie.year || movie.releaseYear || (movie.release_date ? movie.release_date.split('-')[0] : null);
  const genres = Array.isArray(movie.genre) ? movie.genre : [];

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
          {posterUrl ? (
            <motion.img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
              <span className="text-5xl">🎬</span>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur hover:bg-purple-600 transition-colors"
          >
            {favorited ? (
              <AiFillHeart className="w-5 h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {/* Watch Later Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWatchLaterClick}
            title={watchLater ? 'Remove from Watch Later' : 'Watch Later'}
            className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur hover:bg-blue-600 transition-colors"
          >
            {watchLater ? (
              <BsBookmarkFill className="w-4 h-4 text-blue-400" />
            ) : (
              <BsBookmark className="w-4 h-4 text-white" />
            )}
          </motion.button>

          {/* Rating Badge */}
          {rating && (
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-yellow-500/90 text-black font-bold text-xs backdrop-blur">
              ⭐ {Number(rating).toFixed(1)}
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-1">
          <h3 className="font-bold text-base line-clamp-2 text-white group-hover:text-purple-300 transition-colors">
            {movie.title}
          </h3>
          {genres.length > 0 && (
            <p className="text-xs text-gray-400 line-clamp-1">{genres.slice(0, 3).join(' · ')}</p>
          )}
          {year && <p className="text-xs text-gray-500">{year}</p>}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
          <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-white text-sm">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}
