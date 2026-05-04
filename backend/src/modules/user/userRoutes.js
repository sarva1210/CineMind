const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
  getProfile,
  updatePreferences,
  addToWatchHistory,
  getWatchHistory,
} = require('./userController');

// GET /users/profile - Get user profile
router.get('/profile', authMiddleware, getProfile);

// PUT /users/preferences - Update preferences
router.put('/preferences', authMiddleware, updatePreferences);

// POST /users/watch-history - Add to watch history
router.post('/watch-history', authMiddleware, addToWatchHistory);

// GET /users/watch-history - Get watch history
router.get('/watch-history', authMiddleware, getWatchHistory);

module.exports = router;
