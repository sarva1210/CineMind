import axiosInstance from './axios';

const aiApi = {
  // Send message to AI and get response with movie recommendations
  sendMessage: async (message) => {
    try {
      const response = await axiosInstance.post('/ai/chat', {
        message,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get AI movie recommendations (uses chat endpoint)
  getRecommendations: async (preferences) => {
    try {
      const message = typeof preferences === 'string' 
        ? preferences 
        : `Recommend movies for someone who likes ${preferences?.genres?.join(', ')}`;
      
      const response = await axiosInstance.post('/ai/chat', {
        message,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default aiApi;
