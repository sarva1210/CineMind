const express = require('express');
const router = express.Router();
const {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
  getPopularMovies,
  getTopRatedMovies,
  getRecommendedMovies,
  getPersonDetails,
  getMoviesByGenre,
  getGenres,
} = require('./movieController');

// GET /movies/trending - Get trending movies
router.get('/trending', getTrendingMovies);

// GET /movies/search - Search movies
router.get('/search', searchMovies);

// GET /movies/popular - Get popular movies
router.get('/popular', getPopularMovies);

// GET /movies/top-rated - Get top rated movies
router.get('/top-rated', getTopRatedMovies);

// GET /movies/recommended - Get recommended movies
router.get('/recommended', getRecommendedMovies);

// GET /movies/genres - Get all genres
router.get('/genres', getGenres);

// GET /movies/by-genre - Get movies by genre
router.get('/by-genre', getMoviesByGenre);

// GET /movies/person/:id - Get person (actor/director) details + movies
router.get('/person/:id', getPersonDetails);

// GET /movies/:id - Get movie details
router.get('/:id', getMovieDetails);

// GET /movies/:id/trailer - Get movie trailer
router.get('/:id/trailer', getMovieTrailer);

module.exports = router;