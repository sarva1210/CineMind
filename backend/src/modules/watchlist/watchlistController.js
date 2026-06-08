const Watchlist = require('./watchlistModel.js');
const { apiResponse } = require('../../utils/apiResponse.js');

const watchlistController = {
  // Add to watchlist
  async addToWatchlist(req, res, next) {
    try {
      const { movieId, status, priority, notes } = req.body;
      const userId = req.user._id;

      if (!movieId) {
        return res.status(400).json(apiResponse(false, 'MovieId is required'));
      }

      let item = await Watchlist.findOne({ userId, movieId });

      if (item) {
        // Update existing
        item.status = status || item.status;
        item.priority = priority ?? item.priority;
        item.notes = notes || item.notes;
        if (status === 'watched') {
          item.dateWatched = new Date();
        }
        await item.save();
      } else {
        // Create new
        item = new Watchlist({
          userId,
          movieId,
          status: status || 'want-to-watch',
          priority: priority || 0,
          notes,
        });
        if (status === 'watched') {
          item.dateWatched = new Date();
        }
        await item.save();
      }

      res.status(200).json(apiResponse(true, 'Added to watchlist', item));
    } catch (error) {
      next(error);
    }
  },

  // Get watchlist
  async getWatchlist(req, res, next) {
    try {
      const { status, page = 1, limit = 20, sortBy = 'date' } = req.query;
      const userId = req.user._id;

      let query = { userId };
      if (status) query.status = status;

      let sortOption = { createdAt: -1 };
      if (sortBy === 'priority') sortOption = { priority: -1 };
      if (sortBy === 'watched-date') sortOption = { dateWatched: -1 };

      const items = await Watchlist.find(query)
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Watchlist.countDocuments(query);

      res.status(200).json(
        apiResponse(true, 'Watchlist fetched', {
          items,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Update watchlist item
  async updateWatchlistItem(req, res, next) {
    try {
      const { movieId } = req.params;
      const { status, priority, notes } = req.body;
      const userId = req.user._id;

      let item = await Watchlist.findOneAndUpdate(
        { userId, movieId },
        { status, priority, notes, ...(status === 'watched' && { dateWatched: new Date() }) },
        { new: true, runValidators: true }
      );

      if (!item) {
        return res.status(404).json(apiResponse(false, 'Watchlist item not found'));
      }

      res.status(200).json(apiResponse(true, 'Watchlist item updated', item));
    } catch (error) {
      next(error);
    }
  },

  // Remove from watchlist
  async removeFromWatchlist(req, res, next) {
    try {
      const { movieId } = req.params;
      const userId = req.user._id;

      const item = await Watchlist.findOneAndDelete({ userId, movieId });

      if (!item) {
        return res.status(404).json(apiResponse(false, 'Watchlist item not found'));
      }

      res.status(200).json(apiResponse(true, 'Removed from watchlist'));
    } catch (error) {
      next(error);
    }
  },

  // Get watchlist statistics
  async getWatchlistStats(req, res, next) {
    try {
      const userId = req.user._id;

      const stats = await Watchlist.aggregate([
        { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      const statsObj = {
        wantToWatch: 0,
        watching: 0,
        watched: 0,
      };

      stats.forEach((stat) => {
        if (stat._id === 'want-to-watch') statsObj.wantToWatch = stat.count;
        if (stat._id === 'watching') statsObj.watching = stat.count;
        if (stat._id === 'watched') statsObj.watched = stat.count;
      });

      res.status(200).json(apiResponse(true, 'Stats fetched', statsObj));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { watchlistController };