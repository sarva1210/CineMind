const express = require('express');
const { ratingController } = require('./ratingController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const router = express.Router();

// Submit rating (protected)
router.post('/', authMiddleware, ratingController.submitRating);

// Get all ratings for a movie
router.get('/movie/:movieId', ratingController.getMovieRatings);

// Get user's rating for a movie (protected)
router.get('/user/:movieId', authMiddleware, ratingController.getUserRating);

// Mark review as helpful
router.put('/:ratingId/helpful', authMiddleware, ratingController.markHelpful);

// Delete rating
router.delete('/:movieId', authMiddleware, ratingController.deleteRating);

module.exports = router;
