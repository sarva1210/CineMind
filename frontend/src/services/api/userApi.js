import axiosInstance from './axios';

const userApi = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await axiosInstance.put('/users/profile', userData);
      const user = response.data.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await axiosInstance.put('/users/preferences', preferences);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user preferences
  getPreferences: async () => {
    try {
      const response = await axiosInstance.get('/users/preferences');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get watch history
  getWatchHistory: async (page = 1, limit = 20) => {
    try {
      const response = await axiosInstance.get('/users/watch-history', {
        params: { page, limit },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add to watch history
  addToWatchHistory: async (movieId, title, posterPath) => {
    try {
      const response = await axiosInstance.post('/users/watch-history', {
        movieId,
        title,
        posterPath,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Clear watch history
  clearWatchHistory: async () => {
    try {
      const response = await axiosInstance.delete('/users/watch-history');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user stats
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/users/stats');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/users/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userApi;
