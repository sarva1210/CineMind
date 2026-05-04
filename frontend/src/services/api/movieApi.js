import axiosInstance from './axios';

const movieApi = {
  // Get trending movies
  getTrending: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/trending', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await axiosInstance.get(`/movies/${id}`);
      return response.data;
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
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recommended movies
  getRecommended: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movies/recommended', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie trailer
  getTrailer: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/trailer`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie cast
  getCast: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/cast`);
      return response.data;
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
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie reviews
  getReviews: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/reviews`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default movieApi;
