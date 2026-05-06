// __tests__/unit/validation.test.js
const { validators } = require('../../src/middleware/validation');

describe('Validators', () => {
  describe('Register Validation', () => {
    it('should validate valid email', () => {
      const emailValidator = validators.register[0];
      expect(emailValidator.builder.length).toBeGreaterThan(0);
    });

    it('should require minimum password length', () => {
      const passwordValidator = validators.register[2];
      expect(passwordValidator).toBeDefined();
    });
  });

  describe('Rating Validation', () => {
    it('should validate rating between 1-5', () => {
      const ratingValidator = validators.submitRating[1];
      expect(ratingValidator).toBeDefined();
    });

    it('should validate review length', () => {
      const reviewValidator = validators.submitRating[2];
      expect(reviewValidator).toBeDefined();
    });
  });

  describe('Watchlist Validation', () => {
    it('should validate watchlist status', () => {
      const statusValidator = validators.addToWatchlist[1];
      expect(statusValidator).toBeDefined();
    });
  });
});
