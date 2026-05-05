import axiosInstance from './axios';

const authApi = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { token, user } = response.data.data;
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await axiosInstance.put('/users/preferences', preferences);
      const user = response.data.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authApi;
