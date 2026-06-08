const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['want-to-watch', 'watching', 'watched'],
      default: 'want-to-watch',
    },
    dateWatched: {
      type: Date,
    },
    priority: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
watchlistSchema.index({ userId: 1, status: 1 });
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);