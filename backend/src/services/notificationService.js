const axios = require('axios');

const notificationService = {
  // Create in-app notification
  async createNotification(Notification, userId, data) {
    try {
      const notification = new Notification({
        userId,
        type: data.type,
        title: data.title,
        message: data.message,
        relatedUserId: data.relatedUserId,
        relatedMovieId: data.relatedMovieId,
        actionUrl: data.actionUrl,
      });
      await notification.save();
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  },

  // Notify on follow
  async notifyFollow(Notification, followerUser, followingUserId, emailService) {
    try {
      // In-app notification
      await this.createNotification(Notification, followingUserId, {
        type: 'follow',
        title: 'New Follower',
        message: `${followerUser.username} started following you`,
        relatedUserId: followerUser._id,
        actionUrl: `/profile/${followerUser._id}`,
      });

      // Email notification (if enabled in user preferences)
      // This would require a user preferences check
    } catch (error) {
      console.error('Error notifying follow:', error);
    }
  },

  // Notify on rating
  async notifyRating(Notification, ratingUser, movieId, movieTitle) {
    try {
      // Notify related users
      await this.createNotification(Notification, ratingUser._id, {
        type: 'rating',
        title: 'Rating Submitted',
        message: `Your rating for ${movieTitle} has been published`,
        relatedMovieId: movieId,
        actionUrl: `/movie/${movieId}`,
      });
    } catch (error) {
      console.error('Error notifying rating:', error);
    }
  },

  // Notify on new release
  async notifyRelease(Notification, users, movieTitle, movieId, emailService) {
    try {
      const notification = {
        type: 'release',
        title: 'New Movie Released',
        message: `${movieTitle} is now available`,
        relatedMovieId: movieId,
        actionUrl: `/movie/${movieId}`,
      };

      // Create notifications for all users who added to watchlist
      for (const userId of users) {
        await this.createNotification(Notification, userId, notification);
      }
    } catch (error) {
      console.error('Error notifying release:', error);
    }
  },

  // Notify on recommendation
  async notifyRecommendation(Notification, userId, movieTitle, movieId) {
    try {
      await this.createNotification(Notification, userId, {
        type: 'recommendation',
        title: 'Personalized Recommendation',
        message: `We think you'll love ${movieTitle}!`,
        relatedMovieId: movieId,
        actionUrl: `/movie/${movieId}`,
      });
    } catch (error) {
      console.error('Error notifying recommendation:', error);
    }
  },
};

module.exports = notificationService;
