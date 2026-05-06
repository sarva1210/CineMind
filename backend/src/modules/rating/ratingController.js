const Rating = require('./ratingModel.js');
const { sendSuccess, sendError } = require('../../utils/apiResponse.js');

// Add or update rating
const submitRating = async (req, res, next) => {
  try {
    const { movieId, rating, review, spoiler } = req.body;
    const userId = req.user._id;

    if (!movieId || !rating) {
      return sendError(res, 400, 'MovieId and rating are required');
    }

    if (rating < 1 || rating > 5) {
      return sendError(res, 400, 'Rating must be between 1 and 5');
    }

    let ratingDoc = await Rating.findOneAndUpdate(
      { userId, movieId },
      { rating, review: review || null, spoiler: spoiler || false },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Rating submitted successfully', data: ratingDoc });
  } catch (error) {
    next(error);
  }
};

// Get all ratings for a movie
const getMovieRatings = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { page = 1, limit = 10, sortBy = 'newest' } = req.query;

    let sortOption = { createdAt: -1 };
    if (sortBy === 'helpful') sortOption = { helpful: -1 };
    if (sortBy === 'rating-high') sortOption = { rating: -1 };
    if (sortBy === 'rating-low') sortOption = { rating: 1 };

    const ratings = await Rating.find({ movieId })
      .populate('userId', 'username')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Rating.countDocuments({ movieId });

    const avgRating = await Rating.aggregate([
      { $match: { movieId: parseInt(movieId) } },
      {
        $group: {
          _id: null,
          average: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Ratings fetched',
      data: {
        ratings,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        },
        stats: avgRating[0] || { average: 0, count: 0 },
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's rating for a movie
const getUserRating = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const rating = await Rating.findOne({ userId, movieId });

    if (!rating) {
      return sendError(res, 404, 'No rating found for this movie');
    }

    res.status(200).json({ success: true, message: 'Rating fetched', data: rating });
  } catch (error) {
    next(error);
  }
};

// Mark review as helpful
const markHelpful = async (req, res, next) => {
  try {
    const { ratingId } = req.params;
    const { helpful } = req.body;

    const rating = await Rating.findByIdAndUpdate(
      ratingId,
      {
        $inc: { [helpful ? 'helpful' : 'unhelpful']: 1 },
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Marked as helpful', data: rating });
  } catch (error) {
    next(error);
  }
};

// Delete rating
const deleteRating = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const rating = await Rating.findOneAndDelete({ userId, movieId });

    if (!rating) {
      return sendError(res, 404, 'Rating not found');
    }

    res.status(200).json({ success: true, message: 'Rating deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitRating,
  getMovieRatings,
  getUserRating,
  markHelpful,
  deleteRating,
};
