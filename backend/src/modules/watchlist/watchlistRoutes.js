const express = require('express');
const { watchlistController } = require('./watchlistController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const router = express.Router();

// Add to watchlist
router.post('/', authMiddleware, watchlistController.addToWatchlist);

// Get watchlist
router.get('/', authMiddleware, watchlistController.getWatchlist);

// Get stats
router.get('/stats', authMiddleware, watchlistController.getWatchlistStats);

// Update watchlist item
router.put('/:movieId', authMiddleware, watchlistController.updateWatchlistItem);

// Remove from watchlist
router.delete('/:movieId', authMiddleware, watchlistController.removeFromWatchlist);

module.exports = router;