import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { AiOutlineThumbsUp, AiOutlineThumbsDown } from 'react-icons/ai';
import ratingApi from '../services/api/ratingApi';
import SkeletonLoader from './SkeletonLoader';

export default function RatingsList({ movieId, refreshTrigger }) {
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadRatings();
  }, [movieId, sortBy, refreshTrigger]);

  const loadRatings = async () => {
    setLoading(true);
    try {
      const data = await ratingApi.getMovieRatings(movieId, page, sortBy);
      setRatings(data.ratings);
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (ratingId, isHelpful) => {
    try {
      await ratingApi.markHelpful(ratingId, isHelpful);
      loadRatings();
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  if (loading) {
    return <SkeletonLoader count={3} type="card" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Rating Stats */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-yellow-400">
            {stats.average?.toFixed(1) || 'N/A'}
          </div>
          <div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={i <= Math.round(stats.average) ? 'text-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>
            <p className="text-gray-400">Based on {stats.count} reviews</p>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        {['newest', 'helpful', 'rating-high', 'rating-low'].map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSortBy(option)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              sortBy === option
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
          </motion.button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {ratings.length > 0 ? (
          ratings.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{review.userId?.username}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={i <= review.rating ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {review.spoiler && (
                <div className="bg-red-900/30 border border-red-500/30 rounded px-2 py-1 text-xs text-red-300 mb-2 w-fit">
                  ⚠️ Spoiler
                </div>
              )}

              {review.review && <p className="text-gray-300 mb-3">{review.review}</p>}

              {/* Helpful Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleHelpful(review._id, true)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  <AiOutlineThumbsUp /> {review.helpful}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleHelpful(review._id, false)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <AiOutlineThumbsDown /> {review.unhelpful}
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </motion.div>
  );
}
