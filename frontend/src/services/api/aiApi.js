import axiosInstance from './axios';

const aiApi = {
  // Send message to AI and get movie recommendations
  sendMessage: async (message, conversationHistory = []) => {
    try {
      const response = await axiosInstance.post('/ai/chat', {
        message,
        conversationHistory,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default aiApi;