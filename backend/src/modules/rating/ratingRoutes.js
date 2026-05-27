const express = require('express');
const { submitRating, getMovieRatings, getUserRating, markHelpful, deleteRating } = require('./ratingController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const router = express.Router();

// Submit rating (protected)
router.post('/', authMiddleware, submitRating);

// Get all ratings for a movie
router.get('/movie/:movieId', getMovieRatings);

// Get user's rating for a movie (protected)
router.get('/user/:movieId', authMiddleware, getUserRating);

// Mark review as helpful
router.put('/:ratingId/helpful', authMiddleware, markHelpful);

// Delete rating
router.delete('/:movieId', authMiddleware, deleteRating);

module.exports = router;