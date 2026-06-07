const User = require('./userModel');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

// Get User Profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 200, user, 'User profile retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Update User Preferences
const updatePreferences = async (req, res, next) => {
  try {
    const { genres, languages, ratings } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          preferences: {
            genres: genres || [],
            languages: languages || [],
            ratings: ratings || 'PG-13',
          },
        },
      },
      { new: true, runValidators: true }
    );

    return sendSuccess(
      res,
      200,
      user,
      'Preferences updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

// Add to Watch History
const addToWatchHistory = async (req, res, next) => {
  try {
    const { movieId, title, posterPath } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, 'Please provide movieId and title');
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $push: {
          watchHistory: {
            movieId,
            title,
            posterPath,
            watchedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    return sendSuccess(res, 200, user, 'Added to watch history');
  } catch (error) {
    next(error);
  }
};

// Get Watch History
const getWatchHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(
      res,
      200,
      user.watchHistory,
      'Watch history retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updatePreferences, addToWatchHistory, getWatchHistory };