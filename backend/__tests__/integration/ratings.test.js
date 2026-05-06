// __tests__/integration/ratings.test.js
const request = require('supertest');
const app = require('../../src/app');
const Rating = require('../../src/modules/rating/ratingModel');

describe('Ratings API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Register and login user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'ratinguser',
        email: 'rating@example.com',
        password: 'SecurePass123!',
      });

    userId = registerRes.body.data._id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'rating@example.com',
        password: 'SecurePass123!',
      });

    token = loginRes.body.data.token;
  });

  describe('POST /api/ratings', () => {
    it('should submit a valid rating', async () => {
      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          movieId: 550,
          rating: 5,
          review: 'Excellent movie!',
          spoiler: false,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.rating).toBe(5);
    });

    it('should reject invalid rating', async () => {
      const res = await request(app)
        .post('/api/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          movieId: 550,
          rating: 10, // Invalid
          review: 'Great!',
        });

      expect(res.statusCode).toBe(400);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/ratings')
        .send({
          movieId: 550,
          rating: 5,
          review: 'Great!',
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/ratings/movie/:movieId', () => {
    beforeAll(async () => {
      // Create some ratings
      await request(app)
        .post('/api/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          movieId: 550,
          rating: 5,
          review: 'Excellent!',
        });
    });

    it('should get ratings for a movie', async () => {
      const res = await request(app).get('/api/ratings/movie/550');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.ratings)).toBe(true);
    });

    it('should include rating statistics', async () => {
      const res = await request(app).get('/api/ratings/movie/550');

      expect(res.body.data.stats).toBeDefined();
      expect(res.body.data.stats.average).toBeDefined();
    });
  });

  describe('DELETE /api/ratings/:movieId', () => {
    it('should delete user rating', async () => {
      await request(app)
        .post('/api/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          movieId: 999,
          rating: 4,
          review: 'Good!',
        });

      const res = await request(app)
        .delete('/api/ratings/999')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
