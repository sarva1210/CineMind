import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsRobot, BsBookmark, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import movieApi from '../services/api/movieApi';

const GENRES = [
  { id: 28, name: 'Action', emoji: '💥' },
  { id: 35, name: 'Comedy', emoji: '😂' },
  { id: 18, name: 'Drama', emoji: '🎭' },
  { id: 27, name: 'Horror', emoji: '👻' },
  { id: 878, name: 'Sci-Fi', emoji: '🚀' },
  { id: 10749, name: 'Romance', emoji: '💕' },
  { id: 53, name: 'Thriller', emoji: '🔪' },
  { id: 16, name: 'Animation', emoji: '🎨' },
];

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const [trendingRes, topRatedRes] = await Promise.all([
        movieApi.getTrending(1),
        movieApi.getTopRated(1),
      ]);
      setTrendingMovies(trendingRes.movies || trendingRes);
      setTopRatedMovies(topRatedRes.movies || topRatedRes);
    } catch (err) {
      setError(typeof err === 'string' ? err : err?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = async (genre) => {
    if (activeGenre?.id === genre.id) {
      setActiveGenre(null);
      setGenreMovies([]);
      return;
    }
    setActiveGenre(genre);
    setGenreLoading(true);
    try {
      const res = await movieApi.getMoviesByGenre(genre.id, 1);
      setGenreMovies(res.movies || res);
    } catch (e) {
      console.error(e);
    } finally {
      setGenreLoading(false);
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 text-sm mb-6"
          >
            <BsRobot className="w-4 h-4" /> AI-Powered Movie Discovery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
          >
            Discover Your Next Favorite Movie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-10"
          >
            Browse millions of movies • Save favorites • Chat with AI for recommendations
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto mb-10"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="relative bg-black/80 backdrop-blur border border-purple-500/50 rounded-full px-6 py-4 flex items-center gap-4">
                <AiOutlineSearch className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, actors, genres..."
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all text-sm whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.form>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={() => navigate('/assistant')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all hover:shadow-lg hover:shadow-purple-500/40"
            >
              <BsRobot /> Ask AI Assistant
            </button>
            <button
              onClick={() => navigate('/favorites')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-bold transition-all"
            >
              <BsHeartFill /> My Favorites
            </button>
            <button
              onClick={() => navigate('/watch-later')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-500 text-blue-300 hover:bg-blue-500/10 font-bold transition-all"
            >
              <BsBookmark /> Watch Later
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Genre Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-black mb-6 text-white">Browse by Genre</h2>
        <div className="flex flex-wrap gap-3">
          {GENRES.map((genre, i) => (
            <motion.button
              key={genre.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenreClick(genre)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeGenre?.id === genre.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800/60 border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-300'
              }`}
            >
              {genre.emoji} {genre.name}
            </motion.button>
          ))}
        </div>

        {/* Genre Movies */}
        {activeGenre && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {activeGenre.emoji} {activeGenre.name} Movies
            </h3>
            {genreLoading ? (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {genreMovies.slice(0, 10).map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* Trending Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🔥 Trending Now
          </h2>
          <p className="text-gray-400">Most popular movies this week</p>
        </motion.div>

        {error && (
          <div className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 mb-6">
            {error} — Make sure the backend is running with valid TMDB API key.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingMovies.slice(0, 10).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Rated Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            ⭐ All-Time Greats
          </h2>
          <p className="text-gray-400">The highest-rated movies of all time</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topRatedMovies.slice(0, 10).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Why CineMind?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI Mood Matching',
              description:
                'Describe your mood or a scene you love — our AI instantly recommends the perfect film.',
              color: 'from-purple-900/30 to-blue-900/30',
              border: 'border-purple-500/20 hover:border-purple-500/50',
            },
            {
              icon: '💖',
              title: 'Save Without Login',
              description:
                'Heart movies and add to Watch Later — everything saved locally, no account needed.',
              color: 'from-red-900/20 to-pink-900/20',
              border: 'border-red-500/20 hover:border-red-500/50',
            },
            {
              icon: '🎭',
              title: 'Full Cast Filmography',
              description:
                'Click any actor to explore their entire career and find films you might have missed.',
              color: 'from-blue-900/20 to-cyan-900/20',
              border: 'border-blue-500/20 hover:border-blue-500/50',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-2xl bg-gradient-to-b ${feature.color} border ${feature.border} transition-all group hover:shadow-xl`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
