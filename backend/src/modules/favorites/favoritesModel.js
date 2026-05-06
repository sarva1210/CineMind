const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    movies: [
      {
        movieId: {
          type: Number,
          required: true,
        },
        title: String,
        posterPath: String,
        tmdbId: Number,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

favoritesSchema.index({ userId: 1 });
favoritesSchema.index({ 'movies.movieId': 1 });

// Auto-update totalCount when movies array changes
favoritesSchema.pre('save', function (next) {
  this.totalCount = this.movies.length;
  next();
});

module.exports = mongoose.model('Favorites', favoritesSchema);
