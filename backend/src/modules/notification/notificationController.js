const Notification = require('./notificationModel.js');
const { apiResponse } = require('../../utils/apiResponse.js');

const notificationController = {
  // Get user's notifications
  async getNotifications(req, res, next) {
    try {
      const { page = 1, limit = 20, unreadOnly = false } = req.query;
      const userId = req.user._id;

      let query = { userId };
      if (unreadOnly === 'true') query.isRead = false;

      const notifications = await Notification.find(query)
        .populate('relatedUserId', 'username avatar')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Notification.countDocuments(query);

      res.status(200).json(
        apiResponse(true, 'Notifications fetched', {
          notifications,
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

  // Get unread count
  async getUnreadCount(req, res, next) {
    try {
      const userId = req.user._id;
      const count = await Notification.countDocuments({ userId, isRead: false });

      res.status(200).json(apiResponse(true, 'Count fetched', { unreadCount: count }));
    } catch (error) {
      next(error);
    }
  },

  // Mark as read
  async markAsRead(req, res, next) {
    try {
      const { notificationId } = req.params;
      const userId = req.user._id;

      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { isRead: true },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json(apiResponse(false, 'Notification not found'));
      }

      res.status(200).json(apiResponse(true, 'Marked as read', notification));
    } catch (error) {
      next(error);
    }
  },

  // Mark all as read
  async markAllAsRead(req, res, next) {
    try {
      const userId = req.user._id;

      await Notification.updateMany({ userId, isRead: false }, { isRead: true });

      res.status(200).json(apiResponse(true, 'All marked as read'));
    } catch (error) {
      next(error);
    }
  },

  // Delete notification
  async deleteNotification(req, res, next) {
    try {
      const { notificationId } = req.params;
      const userId = req.user._id;

      const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        userId,
      });

      if (!notification) {
        return res.status(404).json(apiResponse(false, 'Notification not found'));
      }

      res.status(200).json(apiResponse(true, 'Notification deleted'));
    } catch (error) {
      next(error);
    }
  },

  // Create notification (internal)
  async createNotification(userId, data) {
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
};

module.exports = { notificationController };
