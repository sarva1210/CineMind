const express = require('express');
const router = express.Router();
const {
  getTrendingMovies, searchMovies,
  getMovieDetails, getMovieTrailer,
  getPopularMovies, getTopRatedMovies } = require('./movieController');

// GET /movies/trending - Get trending movies
router.get('/trending', getTrendingMovies);

// GET /movies/search - Search movies
router.get('/search', searchMovies);

// GET /movies/popular - Get popular movies
router.get('/popular', getPopularMovies);

// GET /movies/top-rated - Get top rated movies
router.get('/top-rated', getTopRatedMovies);

// GET /movies/:id - Get movie details
router.get('/:id', getMovieDetails);

// GET /movies/:id/trailer - Get movie trailer
router.get('/:id/trailer', getMovieTrailer);

module.exports = router;