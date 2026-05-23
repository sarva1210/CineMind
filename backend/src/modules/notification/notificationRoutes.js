const express = require('express');
const { notificationController } = require('./notificationController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');
const router = express.Router();

// Get notifications
router.get('/', authMiddleware, notificationController.getNotifications);

// Get unread count
router.get('/count/unread', authMiddleware, notificationController.getUnreadCount);

// Mark as read
router.put('/:notificationId/read', authMiddleware, notificationController.markAsRead);

// Mark all as read
router.put('/all/read', authMiddleware, notificationController.markAllAsRead);

// Delete notification
router.delete('/:notificationId', authMiddleware, notificationController.deleteNotification);

module.exports = router;