const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['follow', 'rating', 'release', 'recommendation', 'message'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    relatedMovieId: {
      type: Number,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    actionUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);