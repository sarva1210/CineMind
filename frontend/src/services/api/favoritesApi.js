import axiosInstance from './axios';

const favoritesApi = {
  // Get user's favorite movies
  getFavorites: async () => {
    try {
      const response = await axiosInstance.get('/favorites');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add movie to favorites
  addFavorite: async (movieData) => {
    try {
      const response = await axiosInstance.post('/favorites', movieData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Remove movie from favorites
  removeFavorite: async (movieId) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${movieId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check if movie is in favorites
  isFavorite: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/favorites/${movieId}/check`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get watch history
  getWatchHistory: async () => {
    try {
      const response = await axiosInstance.get('/users/watch-history');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add to watch history
  addToHistory: async (movieData) => {
    try {
      const response = await axiosInstance.post('/users/watch-history', movieData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default favoritesApi;
