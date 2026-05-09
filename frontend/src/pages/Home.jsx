import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import movieApi from '../services/api/movieApi';


export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const [trendingRes, recommendedRes] = await Promise.all([
        movieApi.getTrending(1),
        movieApi.getRecommended(1),
      ]);

      setTrendingMovies(trendingRes.movies || trendingRes);
      setRecommendedMovies(recommendedRes.movies || recommendedRes);
    } catch (err) {
      setError(err.message || 'Failed to fetch movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) return <Loader />;

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ float: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ float: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
          >
            Discover Your Next Favorite Movie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-10"
          >
            Powered by AI • Curated for You • Endless Entertainment
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/80 backdrop-blur border border-purple-500/50 rounded-full px-6 py-4 flex items-center gap-4">
                <AiOutlineSearch className="w-6 h-6 text-purple-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, genres, or actors..."
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all hover:shadow-lg hover:shadow-purple-500/50">
              Explore Now
            </button>
            <button className="px-8 py-3 rounded-lg border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-bold transition-all">
              Get Started
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🔥 Trending Now
          </h2>
          <p className="text-gray-400 text-lg">Most popular movies this week</p>
        </motion.div>

        {error && (
          <div className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingMovies.slice(0, 8).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MovieCard movie={movie} onFavoriteChange={fetchMovies} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recommended Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ⭐ Recommended For You
          </h2>
          <p className="text-gray-400 text-lg">Personalized picks based on your taste</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedMovies.slice(0, 8).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MovieCard movie={movie} onFavoriteChange={fetchMovies} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Why Choose CineMind?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI-Powered Recommendations',
              description: 'Get personalized movie suggestions based on your preferences and watch history.',
            },
            {
              icon: '✨',
              title: 'Beautiful Interface',
              description: 'Experience a modern, futuristic UI with smooth animations and glassmorphism design.',
            },
            {
              icon: '🎯',
              title: 'Smart Assistant',
              description: 'Chat with our AI assistant to discover movies and get instant recommendations.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/50 transition-all group hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
