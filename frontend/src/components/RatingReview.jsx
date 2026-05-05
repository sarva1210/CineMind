import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { AiOutlineThumbsUp, AiOutlineThumbsDown } from 'react-icons/ai';
import ratingApi from '../services/api/ratingApi';

export default function RatingReview({ movieId, userRating, onRatingChange }) {
  const [rating, setRating] = useState(userRating?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(userRating?.review || '');
  const [spoiler, setSpoiler] = useState(userRating?.spoiler || false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setLoading(true);
    try {
      await ratingApi.submitRating(movieId, { rating, review, spoiler });
      onRatingChange?.();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold mb-4">Your Rating</h3>

      {/* Star Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <FaStar
              size={32}
              className={`transition-colors ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-600'
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Review Text */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your thoughts about this movie (optional)"
        maxLength={1000}
        rows="4"
        className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-4 resize-none"
      />

      <div className="text-sm text-gray-400 mb-4">{review.length}/1000</div>

      {/* Spoiler Checkbox */}
      <label className="flex items-center gap-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={spoiler}
          onChange={(e) => setSpoiler(e.target.checked)}
          className="w-4 h-4 accent-purple-600"
        />
        <span className="text-sm">This review contains spoilers</span>
      </label>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </motion.button>
    </motion.div>
  );
}
