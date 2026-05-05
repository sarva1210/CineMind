import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

export default function MovieFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: 0,
    sortBy: 'popularity.desc',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <FaFilter className="text-purple-400" />
        <h3 className="text-xl font-bold">Filters & Sorting</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Genre */}
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="878">Sci-Fi</option>
        </select>

        {/* Year */}
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">Any Year</option>
          {[2024, 2023, 2022, 2021, 2020].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Rating */}
        <select
          name="rating"
          value={filters.rating}
          onChange={handleChange}
          className="bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="0">Any Rating</option>
          <option value="8">8.0+</option>
          <option value="7">7.0+</option>
          <option value="6">6.0+</option>
        </select>

        {/* Sort */}
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="rating.desc">Highest Rated</option>
          <option value="release_date.desc">Newest</option>
          <option value="revenue.desc">Box Office</option>
        </select>
      </div>
    </motion.div>
  );
}
