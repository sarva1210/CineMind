import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import movieApi from '../services/api/movieApi';

export default function PersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerson();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchPerson = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await movieApi.getPersonDetails(id);
      setPerson(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : err?.message || 'Failed to fetch person details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error || !person) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20">
        <p className="text-red-400 text-lg mb-4">{error || 'Person not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const bioBrief = person.biography?.slice(0, 400);
  const bioIsCut = person.biography?.length > 400;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/5 to-black pt-20">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-20 p-3 rounded-full bg-purple-600/80 hover:bg-purple-700 text-white transition-all backdrop-blur"
      >
        <AiOutlineArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Person Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            {person.profilePath ? (
              <img
                src={person.profilePath}
                alt={person.name}
                className="w-52 h-72 md:w-64 md:h-96 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 object-cover"
              />
            ) : (
              <div className="w-52 h-72 md:w-64 md:h-96 rounded-2xl border-2 border-purple-500/30 bg-gray-900 flex items-center justify-center">
                <BsPersonCircle className="w-24 h-24 text-gray-600" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="mb-2">
              {person.knownForDepartment && (
                <span className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-widest">
                  {person.knownForDepartment}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">{person.name}</h1>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {person.birthday && (
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 block text-xs mb-0.5">Born</span>
                  <span className="text-white font-semibold">
                    {new Date(person.birthday).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {person.placeOfBirth && (
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 block text-xs mb-0.5">From</span>
                  <span className="text-white font-semibold">{person.placeOfBirth}</span>
                </div>
              )}
              <div className="px-4 py-2 rounded-xl bg-purple-900/30 border border-purple-500/30">
                <span className="text-gray-400 block text-xs mb-0.5">Movies</span>
                <span className="text-purple-300 font-bold">{person.movies?.length || 0}</span>
              </div>
            </div>

            {/* Biography */}
            {person.biography && (
              <div className="max-w-2xl">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {expanded || !bioIsCut ? person.biography : `${bioBrief}...`}
                </p>
                {bioIsCut && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
                  >
                    {expanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Filmography */}
      {person.movies?.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 px-4 md:px-12 max-w-7xl mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              🎬 Filmography
            </h2>
            <p className="text-gray-400 mt-2">
              {person.movies.length} movies — sorted by popularity
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {person.movies.map((film, index) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <MovieCard movie={film} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
