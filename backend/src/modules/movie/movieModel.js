const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: String,
    releaseDate: Date,
    posterPath: String,
    backdropPath: String,
    genres: [String],
    runtime: Number,
    rating: {
      tmdbRating: Number,
      userRatings: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          rating: Number,
          review: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      averageRating: Number,
    },
    cast: [
      {
        name: String,
        character: String,
        profilePath: String,
        tmdbId: Number,
      },
    ],
    crew: [
      {
        name: String,
        job: String,
        profilePath: String,
        tmdbId: Number,
      },
    ],
    streamingProviders: [
      {
        provider: String,
        logo: String,
        link: String,
      },
    ],
    keywords: [String],
    budget: Number,
    revenue: Number,
    status: String,
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

movieSchema.index({ tmdbId: 1 });
movieSchema.index({ title: 'text', overview: 'text' });
movieSchema.index({ genres: 1 });

module.exports = mongoose.model('Movie', movieSchema);
