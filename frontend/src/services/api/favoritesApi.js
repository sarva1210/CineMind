import axiosInstance from './axios';

const favoritesApi = {
  // Get user's favorite movies
  getFavorites: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/favorites', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add movie to favorites
  addFavorite: async (movieId) => {
    try {
      const response = await axiosInstance.post('/favorites', { movieId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Remove movie from favorites
  removeFavorite: async (movieId) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${movieId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check if movie is in favorites
  isFavorite: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/favorites/${movieId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get watch history
  getWatchHistory: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/watch-history', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add to watch history
  addToHistory: async (movieId) => {
    try {
      const response = await axiosInstance.post('/watch-history', { movieId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default favoritesApi;
