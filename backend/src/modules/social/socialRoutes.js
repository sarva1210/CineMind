const express = require('express');
const { socialController } = require('./socialController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const router = express.Router();

// Follow user
router.post('/:userId/follow', authMiddleware, socialController.followUser);

// Unfollow user
router.delete('/:userId/follow', authMiddleware, socialController.unfollowUser);

// Get followers
router.get('/:userId/followers', socialController.getFollowers);

// Get following
router.get('/:userId/following', socialController.getFollowing);

// Check if following
router.get('/:userId/is-following', authMiddleware, socialController.isFollowing);

// Get follower count
router.get('/:userId/count', socialController.getFollowerCount);

module.exports = router;