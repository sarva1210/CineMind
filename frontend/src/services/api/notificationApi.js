import axios from './axios';

const API_BASE = '/api/notifications';

export default {
  // Get notifications
  getNotifications(page = 1, unreadOnly = false) {
    return axios
      .get(`${API_BASE}`, { params: { page, limit: 20, unreadOnly } })
      .then((res) => res.data.data);
  },

  // Get unread count
  getUnreadCount() {
    return axios.get(`${API_BASE}/count/unread`).then((res) => res.data.data);
  },

  // Mark as read
  markAsRead(notificationId) {
    return axios
      .put(`${API_BASE}/${notificationId}/read`)
      .then((res) => res.data.data);
  },

  // Mark all as read
  markAllAsRead() {
    return axios.put(`${API_BASE}/all/read`).then((res) => res.data);
  },

  // Delete notification
  deleteNotification(notificationId) {
    return axios.delete(`${API_BASE}/${notificationId}`).then((res) => res.data);
  },
};