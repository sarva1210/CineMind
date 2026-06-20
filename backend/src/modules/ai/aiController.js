const { GoogleGenerativeAI } = require('@google/generative-ai');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Chat - Get Movie Recommendations based on mood, scene, or preferences
const aiChat = async (req, res, next) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return sendError(res, 400, 'Please provide a message');
    }

    // Build conversation context
    const historyText = conversationHistory
      .slice(-6)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `You are CineMind AI, a friendly and knowledgeable movie recommendation assistant. You help users discover movies based on their mood, favorite scenes, genres, actors, or any description they give.

${historyText ? `Previous conversation:\n${historyText}\n\n` : ''}User's message: "${message}"

Instructions:
- If the user describes a mood (e.g., "feeling sad", "want something fun"), recommend movies that match that mood
- If the user describes a scene or plot element, recommend movies with similar scenes/themes
- If the user asks about an actor/director, recommend their best works
- Always recommend 3-5 specific movies with titles and years
- Be conversational, warm, and enthusiastic about movies
- Mention why each movie fits what they're looking for
- Include a "where to watch" note when relevant (Netflix, Prime, etc.) if you know it

Respond in this EXACT JSON format (no markdown, no extra text):
{
  "message": "Your friendly conversational response here, mentioning the movies naturally",
  "movies": [
    {
      "title": "Movie Title",
      "year": 2023,
      "reason": "Why this movie fits their request",
      "genre": "Genre",
      "rating": 8.5
    }
  ],
  "followUp": "An optional follow-up question to narrow down recommendations (or empty string)"
}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiText = response.text();

    // Parse AI response
    let parsedResponse;
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = {
          message: aiText,
          movies: [],
          followUp: '',
        };
      }
    } catch (parseError) {
      parsedResponse = {
        message: aiText,
        movies: [],
        followUp: '',
      };
    }

    return sendSuccess(
      res,
      200,
      {
        message: parsedResponse.message || 'Here are some recommendations for you!',
        suggestedMovies: parsedResponse.movies || [],
        followUp: parsedResponse.followUp || '',
        conversationId: Date.now().toString(),
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