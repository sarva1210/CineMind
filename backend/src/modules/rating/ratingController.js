const Rating = require('./ratingModel.js');
const { apiResponse } = require('../../utils/apiResponse.js');

const ratingController = {
  // Add or update rating
  async submitRating(req, res, next) {
    try {
      const { movieId, rating, review, spoiler } = req.body;
      const userId = req.user._id;

      if (!movieId || !rating) {
        return res.status(400).json(apiResponse(false, 'MovieId and rating are required'));
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json(apiResponse(false, 'Rating must be between 1 and 5'));
      }

      let ratingDoc = await Rating.findOneAndUpdate(
        { userId, movieId },
        { rating, review: review || null, spoiler: spoiler || false },
        { new: true, upsert: true, runValidators: true }
      );

      res.status(200).json(apiResponse(true, 'Rating submitted successfully', ratingDoc));
    } catch (error) {
      next(error);
    }
  },

  // Get all ratings for a movie
  async getMovieRatings(req, res, next) {
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

      res.status(200).json(
        apiResponse(true, 'Ratings fetched', {
          ratings,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
          },
          stats: avgRating[0] || { average: 0, count: 0 },
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Get user's rating for a movie
  async getUserRating(req, res, next) {
    try {
      const { movieId } = req.params;
      const userId = req.user._id;

      const rating = await Rating.findOne({ userId, movieId });

      if (!rating) {
        return res.status(404).json(apiResponse(false, 'No rating found for this movie'));
      }

      res.status(200).json(apiResponse(true, 'Rating fetched', rating));
    } catch (error) {
      next(error);
    }
  },

  // Mark review as helpful
  async markHelpful(req, res, next) {
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

      res.status(200).json(apiResponse(true, 'Marked as helpful', rating));
    } catch (error) {
      next(error);
    }
  },

  // Delete rating
  async deleteRating(req, res, next) {
    try {
      const { movieId } = req.params;
      const userId = req.user._id;

      const rating = await Rating.findOneAndDelete({ userId, movieId });

      if (!rating) {
        return res.status(404).json(apiResponse(false, 'Rating not found'));
      }

      res.status(200).json(apiResponse(true, 'Rating deleted successfully'));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { ratingController };
