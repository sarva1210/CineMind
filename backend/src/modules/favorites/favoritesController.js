const User = require('../user/userModel');
const { sendSuccess, sendError } = require('../../utils/apiResponse');

// Add to Favorites
const addToFavorites = async (req, res, next) => {
  try {
    const { movieId, title, posterPath } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, 'Please provide movieId and title');
    }

    const user = await User.findById(req.user.userId);

    // Check if movie already exists in favorites
    const isFavorite = user.favorites.find(
      (fav) => fav.movieId === parseInt(movieId)
    );

    if (isFavorite) {
      return sendError(res, 400, 'Movie already in favorites');
    }

    // Add to favorites
    user.favorites.push({
      movieId,
      title,
      posterPath,
      addedAt: new Date(),
    });

    await user.save();

    return sendSuccess(res, 200, user.favorites, 'Added to favorites');

  } catch (error) {
    next(error);
  }
};

// Remove from Favorites
const removeFromFavorites = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return sendError(res, 400, 'Please provide movieId');
    }

    const user = await User.findById(req.user.userId);

    // Remove from favorites
    user.favorites = user.favorites.filter(
      (fav) => fav.movieId !== parseInt(movieId)
    );

    await user.save();

    return sendSuccess(res, 200, user.favorites, 'Removed from favorites');

  } catch (error) {
    next(error);
  }
};

// Get All Favorites
const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(
      res,
      200,
      user.favorites,
      'Favorites retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// Check if Movie is in Favorites
const isFavorite = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return sendError(res, 400, 'Please provide movieId');
    }

    const user = await User.findById(req.user.userId);
    const favorite = user.favorites.find(
      (fav) => fav.movieId === parseInt(movieId)
    );

    return sendSuccess(res, 200, { isFavorite: !!favorite });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToFavorites, removeFromFavorites, getFavorites, isFavorite };