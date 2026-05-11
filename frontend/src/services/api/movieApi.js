import axiosInstance from './axios';

const movieApi = {
  // Get trending movies
  getTrending: async (page = 1, timeWindow = 'week') => {
    try {
      const response = await axiosInstance.get('/movies/trending', {
        params: { page, timeWindow },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  // Get popular movies
  getPopular: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/popular', {
        params: { page },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie by ID
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
      const response = await axiosInstance.get('/movies/search', {
        params: { q: query, page },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get top rated movies
  getTopRated: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/top-rated', {
        params: { page },
      });
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

  // Get movie cast (from movie details)
  getCast: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}`);
      return response.data.data.credits || {};
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default movieApi;