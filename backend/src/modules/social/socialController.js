const Follow = require('./followModel.js');
const { apiResponse } = require('../../utils/apiResponse.js');

const socialController = {
  // Follow user
  async followUser(req, res, next) {
    try {
      const { userId } = req.params;
      const currentUserId = req.user._id;

      if (userId === currentUserId.toString()) {
        return res.status(400).json(apiResponse(false, 'Cannot follow yourself'));
      }

      let follow = await Follow.findOne({
        follower: currentUserId,
        following: userId,
      });

      if (follow) {
        return res.status(400).json(apiResponse(false, 'Already following this user'));
      }

      follow = new Follow({
        follower: currentUserId,
        following: userId,
      });

      await follow.save();

      res.status(201).json(apiResponse(true, 'User followed successfully', follow));
    } catch (error) {
      next(error);
    }
  },

  // Unfollow user
  async unfollowUser(req, res, next) {
    try {
      const { userId } = req.params;
      const currentUserId = req.user._id;

      const follow = await Follow.findOneAndDelete({
        follower: currentUserId,
        following: userId,
      });

      if (!follow) {
        return res.status(404).json(apiResponse(false, 'Not following this user'));
      }

      res.status(200).json(apiResponse(true, 'User unfollowed successfully'));
    } catch (error) {
      next(error);
    }
  },

  // Get followers
  async getFollowers(req, res, next) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const followers = await Follow.find({ following: userId })
        .populate('follower', 'username email avatar')
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Follow.countDocuments({ following: userId });

      res.status(200).json(
        apiResponse(true, 'Followers fetched', {
          followers,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Get following
  async getFollowing(req, res, next) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const following = await Follow.find({ follower: userId })
        .populate('following', 'username email avatar')
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Follow.countDocuments({ follower: userId });

      res.status(200).json(
        apiResponse(true, 'Following fetched', {
          following,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Check if following
  async isFollowing(req, res, next) {
    try {
      const { userId } = req.params;
      const currentUserId = req.user._id;

      const follow = await Follow.findOne({
        follower: currentUserId,
        following: userId,
      });

      res.status(200).json(apiResponse(true, 'Checked', { isFollowing: !!follow }));
    } catch (error) {
      next(error);
    }
  },

  // Get follower count
  async getFollowerCount(req, res, next) {
    try {
      const { userId } = req.params;

      const followersCount = await Follow.countDocuments({ following: userId });
      const followingCount = await Follow.countDocuments({ follower: userId });

      res.status(200).json(
        apiResponse(true, 'Counts fetched', {
          followers: followersCount,
          following: followingCount,
        })
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { socialController };
