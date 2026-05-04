import axiosInstance from './axios';

const aiApi = {
  // Send message to AI and get response
  sendMessage: async (message, conversationId = null) => {
    try {
      const response = await axiosInstance.post('/ai/chat', {
        message,
        conversationId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get AI movie recommendations
  getRecommendations: async (preferences) => {
    try {
      const response = await axiosInstance.post('/ai/recommendations', {
        preferences,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get conversation history
  getConversationHistory: async (conversationId) => {
    try {
      const response = await axiosInstance.get(
        `/ai/conversations/${conversationId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all conversations for user
  getAllConversations: async () => {
    try {
      const response = await axiosInstance.get('/ai/conversations');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Analyze movie based on user preferences
  analyzeMovie: async (movieId, userPreferences) => {
    try {
      const response = await axiosInstance.post('/ai/analyze-movie', {
        movieId,
        preferences: userPreferences,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get personalized suggestions
  getPersonalSuggestions: async () => {
    try {
      const response = await axiosInstance.get('/ai/personalized-suggestions');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default aiApi;
