import { motion } from 'framer-motion';
import { BsBookmarkFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useSavedMovies } from '../context/SavedMoviesContext';

export default function WatchLater() {
  const { watchLater } = useSavedMovies();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/10 to-black pt-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🔖
          </motion.div>
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Watch Later
            </h1>
            <p className="text-gray-400 text-lg mt-2">
              {watchLater.length} movie{watchLater.length !== 1 ? 's' : ''} queued up
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {watchLater.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {watchLater.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🎬
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Your Queue is Empty</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              Click the 🔖 bookmark icon on any movie to save it for later!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold transition-all"
            >
              Browse Movies
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
