const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    unhelpful: {
      type: Number,
      default: 0,
    },
    spoiler: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create unique index on userId and movieId to prevent duplicate reviews
ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);