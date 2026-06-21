const https = require("https");
const axios = require('axios');
const { sendSuccess, sendError } = require('../../utils/apiResponse');
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const IMG_BASE = 'https://image.tmdb.org/t/p';

// Helper function to fetch from TMDB
const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}${endpoint}`,
      {
        params: {
          ...params,
          api_key: process.env.TMDB_API_KEY,
        },
        httpsAgent: new https.Agent({
          family: 4
        })
      }
    );

    return response.data;
  } catch (error) {
    console.log("TMDB ERROR");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Code:", error.code);
    console.log("Message:", error.message);

    throw error;
  }
};

// Format movie object for frontend
const formatMovie = (m) => ({
  id: m.id,
  title: m.title,
  overview: m.overview,
  posterUrl: m.poster_path ? `${IMG_BASE}/w500${m.poster_path}` : null,
  backdropUrl: m.backdrop_path ? `${IMG_BASE}/original${m.backdrop_path}` : null,
  rating: m.vote_average,
  year: m.release_date ? m.release_date.split('-')[0] : null,
  releaseDate: m.release_date,
  genre: m.genre_ids || m.genres?.map((g) => g.name) || [],
  popularity: m.popularity,
  runtime: m.runtime || null,
});

// Get Trending Movies
const getTrendingMovies = async (req, res, next) => {
  try {
    const { page = 1, timeWindow = 'week' } = req.query;
    const data = await fetchFromTMDB(`/trending/movie/${timeWindow}`, { page });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Trending movies fetched');
  } catch (error) {
    next(error);
  }
};

// Search Movies
const searchMovies = async (req, res, next) => {
  try {
    const { q, page = 1 } = req.query;
    if (!q) return sendError(res, 400, 'Please provide search query');
    const data = await fetchFromTMDB('/search/movie', { query: q, page });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Movies found');
  } catch (error) {
    next(error);
  }
};

// Get Movie Details
const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return sendError(res, 400, 'Please provide movie ID');

    const data = await fetchFromTMDB(`/movie/${id}`, {
      append_to_response: 'credits,videos,watch/providers',
    });

    // Format cast
    const cast = (data.credits?.cast || []).slice(0, 20).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profilePath: c.profile_path ? `${IMG_BASE}/w185${c.profile_path}` : null,
      order: c.order,
    }));

    // Format trailer
    const trailerVideo = (data.videos?.results || []).find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    const trailer = trailerVideo
      ? {
          key: trailerVideo.key,
          name: trailerVideo.name,
          url: `https://www.youtube.com/watch?v=${trailerVideo.key}`,
        }
      : null;

    // Format "where to watch" - US providers
    const providers = data['watch/providers']?.results?.US;
    const whereToWatch = {
      streaming: (providers?.flatrate || []).map((p) => ({
        id: p.provider_id,
        name: p.provider_name,
        logo: p.logo_path ? `${IMG_BASE}/w92${p.logo_path}` : null,
      })),
      rent: (providers?.rent || []).map((p) => ({
        id: p.provider_id,
        name: p.provider_name,
        logo: p.logo_path ? `${IMG_BASE}/w92${p.logo_path}` : null,
      })),
      buy: (providers?.buy || []).map((p) => ({
        id: p.provider_id,
        name: p.provider_name,
        logo: p.logo_path ? `${IMG_BASE}/w92${p.logo_path}` : null,
      })),
      link: providers?.link || null,
    };

    const movie = {
      ...formatMovie(data),
      genre: (data.genres || []).map((g) => g.name),
      runtime: data.runtime,
      tagline: data.tagline,
      status: data.status,
      budget: data.budget,
      revenue: data.revenue,
      productionCompanies: (data.production_companies || []).map((c) => c.name),
      spokenLanguages: (data.spoken_languages || []).map((l) => l.english_name),
      cast,
      trailer,
      whereToWatch,
    };

    return sendSuccess(res, 200, movie, 'Movie details fetched');
  } catch (error) {
    next(error);
  }
};

// Get Movie Trailer
const getMovieTrailer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return sendError(res, 400, 'Please provide movie ID');
    const data = await fetchFromTMDB(`/movie/${id}/videos`);
    const trailer = data.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
    if (!trailer) return sendError(res, 404, 'Trailer not found');
    return sendSuccess(res, 200, {
      key: trailer.key,
      name: trailer.name,
      url: `https://www.youtube.com/watch?v=${trailer.key}`,
    }, 'Trailer fetched');
  } catch (error) {
    next(error);
  }
};

// Get Popular Movies
const getPopularMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/popular', { page });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Popular movies fetched');
  } catch (error) {
    next(error);
  }
};

// Get Top Rated Movies
const getTopRatedMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/top_rated', { page });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Top rated movies fetched');
  } catch (error) {
    next(error);
  }
};

// Get Recommended Movies (now top-rated as fallback)
const getRecommendedMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/top_rated', { page });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Recommended movies fetched');
  } catch (error) {
    next(error);
  }
};

// Get Person Details (actor/director)
const getPersonDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return sendError(res, 400, 'Please provide person ID');

    const [personData, creditsData] = await Promise.all([
      fetchFromTMDB(`/person/${id}`),
      fetchFromTMDB(`/person/${id}/movie_credits`),
    ]);

    const movies = (creditsData.cast || [])
      .filter((m) => m.poster_path && m.vote_average > 0)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 30)
      .map(formatMovie);

    const person = {
      id: personData.id,
      name: personData.name,
      biography: personData.biography,
      birthday: personData.birthday,
      deathday: personData.deathday,
      placeOfBirth: personData.place_of_birth,
      profilePath: personData.profile_path ? `${IMG_BASE}/w342${personData.profile_path}` : null,
      knownForDepartment: personData.known_for_department,
      popularity: personData.popularity,
      movies,
    };

    return sendSuccess(res, 200, person, 'Person details fetched');
  } catch (error) {
    next(error);
  }
};

// Get Movies by Genre
const getMoviesByGenre = async (req, res, next) => {
  try {
    const { genreId, page = 1 } = req.query;
    if (!genreId) return sendError(res, 400, 'Please provide genre ID');
    const data = await fetchFromTMDB('/discover/movie', { with_genres: genreId, page, sort_by: 'popularity.desc' });
    const movies = (data.results || []).map(formatMovie);
    return sendSuccess(res, 200, { movies, totalPages: data.total_pages, page: data.page }, 'Movies by genre fetched');
  } catch (error) {
    next(error);
  }
};

// Get Movie Genres List
const getGenres = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB('/genre/movie/list');
    return sendSuccess(res, 200, { genres: data.genres || [] }, 'Genres fetched');
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};