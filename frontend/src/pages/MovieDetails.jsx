import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AiOutlineArrowLeft,
  AiOutlinePlayCircle,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill, BsTv, BsCameraVideo } from 'react-icons/bs';
import { MdOutlineLocalMovies } from 'react-icons/md';
import TrailerModal from '../components/TrailerModal';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import movieApi from '../services/api/movieApi';
import { useSavedMovies } from '../context/SavedMoviesContext';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, isInWatchLater, toggleWatchLater } = useSavedMovies();

  useEffect(() => {
    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const [movieRes, relatedRes] = await Promise.all([
        movieApi.getMovieById(id),
        movieApi.getRecommended(1).catch(() => ({ movies: [] })),
      ]);
      setMovie(movieRes);
      setRelatedMovies(relatedRes.movies || []);
    } catch (err) {
      setError(typeof err === 'string' ? err : err?.message || 'Failed to fetch movie details');
    } finally {
      setLoading(false);
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

  const favorited = isFavorite(movie.id);
  const watchLater = isInWatchLater(movie.id);
  const cast = movie.cast || [];
  const trailer = movie.trailer;
  const whereToWatch = movie.whereToWatch || {};

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-20 p-3 rounded-full bg-purple-600/80 hover:bg-purple-700 text-white transition-all backdrop-blur"
      >
        <AiOutlineArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Hero Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        </div>

        {/* Movie Info Overlay */}
        <div className="relative z-10 w-full px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-44 h-64 md:w-52 md:h-80 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 object-cover"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 pb-4"
            >
              {movie.tagline && (
                <p className="text-purple-400 italic text-sm mb-2">{movie.tagline}</p>
              )}
              <h1 className="text-4xl md:text-6xl font-black text-white mb-3">{movie.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                {movie.rating && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 font-bold">
                    ⭐ {Number(movie.rating).toFixed(1)}/10
                  </span>
                )}
                {movie.year && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
                    {movie.year}
                  </span>
                )}
                {movie.runtime && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                {Array.isArray(movie.genre) && movie.genre.slice(0, 3).map((g) => (
                  <span key={g} className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-base mb-6 max-w-2xl leading-relaxed line-clamp-4">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                {trailer && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all shadow-lg shadow-purple-500/20"
                  >
                    <AiOutlinePlayCircle className="w-5 h-5" />
                    Watch Trailer
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(movie)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-bold transition-all ${
                    favorited
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-purple-500 hover:bg-purple-500/10 text-purple-300'
                  }`}
                >
                  {favorited ? (
                    <><AiFillHeart className="w-5 h-5 text-red-500" /> In Favorites</>
                  ) : (
                    <><AiOutlineHeart className="w-5 h-5" /> Add to Favorites</>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleWatchLater(movie)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-bold transition-all ${
                    watchLater
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-gray-600 hover:bg-gray-700/30 text-gray-300'
                  }`}
                >
                  {watchLater ? (
                    <><BsBookmarkFill className="w-4 h-4" /> Saved</>
                  ) : (
                    <><BsBookmark className="w-4 h-4" /> Watch Later</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Where To Watch */}
      {(whereToWatch.streaming?.length > 0 || whereToWatch.rent?.length > 0) && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-3">
            <BsTv /> Where to Watch
          </h2>

          {whereToWatch.streaming?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest font-semibold">Stream Now</p>
              <div className="flex flex-wrap gap-3">
                {whereToWatch.streaming.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/20 border border-green-500/30 text-green-300"
                  >
                    {p.logo && (
                      <img src={p.logo} alt={p.name} className="w-6 h-6 rounded object-contain" />
                    )}
                    <span className="text-sm font-semibold">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {whereToWatch.rent?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest font-semibold">Rent / Buy</p>
              <div className="flex flex-wrap gap-3">
                {whereToWatch.rent.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900/20 border border-blue-500/30 text-blue-300"
                  >
                    {p.logo && (
                      <img src={p.logo} alt={p.name} className="w-6 h-6 rounded object-contain" />
                    )}
                    <span className="text-sm font-semibold">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {whereToWatch.link && (
            <a
              href={whereToWatch.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <BsCameraVideo />
              View all options on JustWatch →
            </a>
          )}
        </motion.section>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
            <MdOutlineLocalMovies />
            Cast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {cast.slice(0, 12).map((member, index) => (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/person/${member.id}`}
                  className="block group text-center cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl mb-2 bg-gray-800 aspect-[2/3]">
                    {member.profilePath ? (
                      <img
                        src={member.profilePath}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600">
                        👤
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <span className="text-xs text-white font-semibold">View Filmography</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-xs group-hover:text-purple-300 transition-colors line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-1 mt-0.5">{member.character}</p>
                </Link>
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
          className="py-12 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-black mb-6 text-white">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedMovies.slice(0, 10).map((relMovie, index) => (
              <motion.div
                key={relMovie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={relMovie} />
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
