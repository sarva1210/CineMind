                                import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft, AiOutlinePlayCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TrailerModal from '../components/TrailerModal';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import movieApi from '../services/api/movieApi';
import favoritesApi from '../services/api/favoritesApi';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const [movieRes, castRes, trailerRes] = await Promise.all([
        movieApi.getMovieById(id),
        movieApi.getCast(id).catch(() => ({ cast: [] })),
        movieApi.getTrailer(id).catch(() => ({})),
      ]);

      setMovie(movieRes);
      setCast(castRes.cast || []);
      setTrailer(trailerRes);

      // Check if in favorites
      if (user) {
        const favRes = await favoritesApi.isFavorite(id);
        setIsFavorite(favRes.isFavorite || false);
      }

      // Fetch related/recommended movies
      const relatedRes = await movieApi.getRecommended();
      setRelatedMovies(relatedRes.movies || relatedRes);
    } catch (err) {
      setError(err.message || 'Failed to fetch movie details');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await favoritesApi.removeFavorite(id);
      } else {
        await favoritesApi.addFavorite(id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  if (loading) return <Loader />;

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20">
        <p className="text-red-400 text-lg mb-4">{error || 'Movie not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-20 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all"
      >
        <AiOutlineArrowLeft className="w-6 h-6" />
      </motion.button>

      {/* Header with backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 md:h-screen flex items-end overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Movie Info Overlay */}
        <div className="relative z-10 w-full px-4 md:px-12 pb-8 md:pb-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={movie.posterUrl}
              alt={movie.title}
              className="w-48 h-72 rounded-2xl border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30 flex-shrink-0"
            />

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                {movie.rating && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <span className="text-2xl">⭐</span>
                    <span className="text-xl font-bold">{movie.rating.toFixed(1)}/10</span>
                  </div>
                )}
                {movie.year && (
                  <div className="text-gray-400 font-semibold">{movie.year}</div>
                )}
                {movie.runtime && (
                  <div className="text-gray-400 font-semibold">{movie.runtime} min</div>
                )}
                {movie.genre && (
                  <div className="text-gray-400 font-semibold">
                    {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-lg mb-8 max-w-2xl">{movie.overview}</p>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all shadow-lg shadow-purple-500/20"
                >
                  <AiOutlinePlayCircle className="w-6 h-6" />
                  Watch Trailer
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavoriteToggle}
                  className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold transition-all"
                >
                  {isFavorite ? (
                    <>
                      <AiFillHeart className="w-6 h-6 text-red-500" />
                      In Favorites
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart className="w-6 h-6" />
                      Add to Favorites
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-black mb-8 text-white">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cast.slice(0, 10).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.profilePath || 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-white text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs">{member.character}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-black mb-8 text-white">More Like This</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMovies.slice(0, 8).map((relMovie, index) => (
              <motion.div
                key={relMovie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard movie={relMovie} onFavoriteChange={fetchMovieDetails} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        trailer={trailer}
        movieTitle={movie.title}
        onClose={() => setShowTrailer(false)}
      />
    </div>
  );
}
