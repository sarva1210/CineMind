import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import movieApi from '../services/api/movieApi';
import SkeletonLoader from '../components/SkeletonLoader';
import MovieCard from '../components/MovieCard';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      // Get popular and top-rated movies for recommendations
      const [popular, topRated] = await Promise.all([
        movieApi.getPopular(1),
        movieApi.getTopRated(1),
      ]);

      // Combine and shuffle
      const combined = [...(popular || []), ...(topRated || [])];
      const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 12);
      setRecommendations(shuffled);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={4} type="card" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Recommended For You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onFavoriteChange={loadRecommendations} />
        ))}
      </div>
    </motion.div>
  );
}
