// __tests__/unit/ratingModel.test.js
const mongoose = require('mongoose');
const Rating = require('../../src/modules/rating/ratingModel');

describe('Rating Model', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/cinemind-test');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a valid rating', async () => {
    const ratingData = {
      movieId: 550,
      userId: new mongoose.Types.ObjectId(),
      rating: 5,
      review: 'Amazing movie!',
    };

    const rating = new Rating(ratingData);
    expect(rating.rating).toBe(5);
    expect(rating.movieId).toBe(550);
  });

  it('should reject invalid rating', async () => {
    const ratingData = {
      movieId: 550,
      userId: new mongoose.Types.ObjectId(),
      rating: 10, // Invalid
    };

    const rating = new Rating(ratingData);
    const error = rating.validateSync();
    expect(error).toBeDefined();
  });

  it('should have timestamps', async () => {
    const ratingData = {
      movieId: 550,
      userId: new mongoose.Types.ObjectId(),
      rating: 4,
    };

    const rating = new Rating(ratingData);
    expect(rating.createdAt).toBeDefined();
    expect(rating.updatedAt).toBeDefined();
  });
});
