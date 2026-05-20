const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { addToFavorites, removeFromFavorites,
  getFavorites, isFavorite, } = require('./favoritesController');

// GET /favorites - Get all favorites
router.get('/', authMiddleware, getFavorites);

// POST /favorites - Add to favorites
router.post('/', authMiddleware, addToFavorites);

// GET /favorites/:movieId/check - Check if movie is favorite
router.get('/:movieId/check', authMiddleware, isFavorite);

// DELETE /favorites/:movieId - Remove from favorites
router.delete('/:movieId', authMiddleware, removeFromFavorites);

module.exports = router;