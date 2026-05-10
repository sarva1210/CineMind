import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import movieApi from '../services/api/movieApi';


export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(!!searchParams.get('q'));

  useEffect(() => {
    if (searchParams.get('q')) {
      performSearch(searchParams.get('q'));
    }
  }, [searchParams]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await movieApi.searchMovies(searchQuery, 1);
      setResults(res.movies || res);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || 'Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setSearchParams({});
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black pt-20">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-black/80 backdrop-blur border-b border-purple-500/20 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/80 backdrop-blur border border-purple-500/50 rounded-full px-6 py-4 flex items-center gap-4">
                <AiOutlineSearch className="w-6 h-6 text-purple-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, genres, or actors..."
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <AiOutlineClose className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Results Info */}
          {hasSearched && (
            <div className="text-center">
              {loading ? (
                <p className="text-gray-400">Searching...</p>
              ) : (
                <p className="text-gray-400">
                  {results.length > 0
                    ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                    : `No results found for "${query}"`}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {loading && <Loader fullScreen={false} />}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 text-center mb-8"
          >
            {error}
          </motion.div>
        )}

        {!hasSearched ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold text-white mb-4">Start Searching</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Use the search bar to discover movies, browse by genres, or find your favorite actors.
            </p>
          </motion.div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {results.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} onFavoriteChange={() => performSearch(query)} />
                </motion.div>
              ))}
            </div>

            {/* Clear Search Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="px-6 py-3 rounded-lg border border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold transition-all"
              >
                Clear Search
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">😟</div>
            <h2 className="text-3xl font-bold text-white mb-4">No Results Found</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              We couldn't find any movies matching "{query}". Try searching for something else.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
