const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../user/userModel');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Chat - Get Movie Recommendations
const aiChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return sendError(res, 400, 'Please provide a message');
    }

    // Get user preferences
    const user = await User.findById(req.user.userId);
    const userGenres = user?.preferences?.genres?.join(', ') || 'any genres';

    // Create prompt for AI
    const prompt = `You are a helpful movie recommendation assistant. Based on the user's preferences and request, suggest movies.

User's favorite genres: ${userGenres}
User's message: "${message}"

Please provide:
1. 2-3 specific movie recommendations (with actual movie titles and years)
2. A brief explanation why you recommend these movies
3. Keep the response concise and friendly

Format your response as JSON with this structure:
{
  "explanation": "Brief reason for recommendations",
  "movies": [
    {
      "title": "Movie Title",
      "year": 2023,
      "reason": "Why this movie"
    }
  ]
}`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text();

    // Parse AI response
    let parsedResponse;
    try {
      // Extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = {
          explanation: aiResponse,
          movies: [],
        };
      }
    } catch (parseError) {
      parsedResponse = {
        explanation: aiResponse,
        movies: [],
      };
    }

    return sendSuccess(
      res,
      200,
      {
        message,
        aiResponse: parsedResponse,
      },
      'AI recommendations generated'
    );
  } catch (error) {
    console.error('AI Chat Error:', error);
    next(error);
  }
};

module.exports = {
  aiChat,
};
