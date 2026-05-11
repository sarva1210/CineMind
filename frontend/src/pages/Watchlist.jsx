import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import watchlistApi from '../services/api/watchlistApi';
import SkeletonLoader from '../components/SkeletonLoader';
import MovieCard from '../components/MovieCard';


export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('want-to-watch');
  const [stats, setStats] = useState({ wantToWatch: 0, watching: 0, watched: 0 });

  useEffect(() => {
    loadWatchlist();
    loadStats();
  }, [activeTab]);

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const data = await watchlistApi.getWatchlist(activeTab);
      setWatchlist(data.items);
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await watchlistApi.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleRemove = async (movieId) => {
    try {
      await watchlistApi.removeItem(movieId);
      await loadWatchlist();
      await loadStats();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        My Watchlist
      </h1>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { label: 'Want to Watch', count: stats.wantToWatch },
          { label: 'Currently Watching', count: stats.watching },
          { label: 'Watched', count: stats.watched },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-bold text-purple-400">{stat.count}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-purple-500/30 pb-4">
        {[
          { id: 'want-to-watch', label: 'Want to Watch' },
          { id: 'watching', label: 'Currently Watching' },
          { id: 'watched', label: 'Watched' },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonLoader count={4} type="card" />
      ) : watchlist.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {watchlist.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <MovieCard
                movie={{ id: item.movieId }}
                onFavoriteChange={loadWatchlist}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleRemove(item.movieId)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm font-semibold transition-all"
              >
                Remove
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No movies in this category yet. Start adding!
          </p>
        </div>
      )}
    </motion.div>
  );
}
