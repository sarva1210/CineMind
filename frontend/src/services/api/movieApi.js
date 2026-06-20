import axiosInstance from './axios';

const movieApi = {
  // Get trending movies
  getTrending: async (page = 1, timeWindow = 'week') => {
    try {
      const response = await axiosInstance.get('/movies/trending', { params: { page, timeWindow } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get popular movies
  getPopular: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/popular', { params: { page } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recommended movies
  getRecommended: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/recommended', { params: { page } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie by ID (includes cast, trailer, where to watch)
  getMovieById: async (id) => {
    try {
      const response = await axiosInstance.get(`/movies/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/search', { params: { q: query, page } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get top rated movies
  getTopRated: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/top-rated', { params: { page } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie trailer
  getTrailer: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/trailer`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get person (actor/director) details + filmography
  getPersonDetails: async (personId) => {
    try {
      const response = await axiosInstance.get(`/movies/person/${personId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/by-genre', { params: { genreId, page } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all genres
  getGenres: async () => {
    try {
      const response = await axiosInstance.get('/movies/genres');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default movieApi;