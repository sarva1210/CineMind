import { motion } from 'framer-motion';

const MovieGrid = ({ movies, onMovieClick, columns = 4 }) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  const colClass = gridColsClass[columns] || gridColsClass[4];

  if (!movies || movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-lg">No movies found</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${colClass} gap-4`}
    >
      {movies.map((movie) => (
        <motion.div
          key={movie.id || movie.tmdbId}
          variants={itemVariants}
          onClick={() => onMovieClick(movie)}
          className="cursor-pointer group"
        >
          <div className="relative h-72 rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path || movie.posterPath}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-white">
                <h3 className="font-bold text-sm">{movie.title}</h3>
                <p className="text-xs text-gray-300 mt-1">
                  {movie.vote_average || movie.rating}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovieGrid;
