import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

export default function MovieCarousel({ title, movies, onFavoriteChange }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => scroll('left')}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-purple-600 hover:bg-purple-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaChevronLeft className="text-white" />
        </motion.button>

        {/* Movies Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies?.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-64">
              <MovieCard movie={movie} onFavoriteChange={onFavoriteChange} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => scroll('right')}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-purple-600 hover:bg-purple-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaChevronRight className="text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
