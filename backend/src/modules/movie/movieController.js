const axios = require('axios');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Helper function to fetch from TMDB
const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`TMDB API Error: ${error.message}`);
  }
};

// Get Trending Movies
const getTrendingMovies = async (req, res, next) => {
  try {
    const { page = 1, timeWindow = 'week' } = req.query;

    const data = await fetchFromTMDB(`/trending/movie/${timeWindow}`, {
      page,
    });

    return sendSuccess(res, 200, data, 'Trending movies fetched successfully');
  } catch (error) {
    next(error);
  }
};

// Search Movies
const searchMovies = async (req, res, next) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q) {
      return sendError(res, 400, 'Please provide search query');
    }

    const data = await fetchFromTMDB('/search/movie', {
      query: q,
      page,
    });

    return sendSuccess(res, 200, data, 'Movies found');
  } catch (error) {
    next(error);
  }
};

// Get Movie Details
const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, 'Please provide movie ID');
    }

    const data = await fetchFromTMDB(`/movie/${id}`, {
      append_to_response: 'credits,videos',
    });

    return sendSuccess(res, 200, data, 'Movie details fetched successfully');
  } catch (error) {
    next(error);
  }
};

// Get Movie Trailer/Videos
const getMovieTrailer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, 'Please provide movie ID');
    }

    const data = await fetchFromTMDB(`/movie/${id}/videos`);

    // Find YouTube trailer
    const trailer = data.results?.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (!trailer) {
      return sendError(res, 404, 'Trailer not found for this movie');
    }

    return sendSuccess(
      res,
      200,
      {
        id: trailer.id,
        key: trailer.key,
        name: trailer.name,
        type: trailer.type,
        site: trailer.site,
        url: `https://www.youtube.com/watch?v=${trailer.key}`,
      },
      'Trailer fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

// Get Popular Movies
const getPopularMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const data = await fetchFromTMDB('/movie/popular', {
      page,
    });

    return sendSuccess(res, 200, data, 'Popular movies fetched successfully');
  } catch (error) {
    next(error);
  }
};

// Get Top Rated Movies
const getTopRatedMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const data = await fetchFromTMDB('/movie/top_rated', {
      page,
    });

    return sendSuccess(res, 200, data, 'Top rated movies fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrendingMovies, searchMovies, getMovieDetails, getMovieTrailer, getPopularMovies, getTopRatedMovies };