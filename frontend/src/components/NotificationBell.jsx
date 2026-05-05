import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTimes, FaCheck } from 'react-icons/fa';
import notificationApi from '../services/api/notificationApi';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationApi.getNotifications(1, false);
      setNotifications(data.notifications || []);
      
      const countData = await notificationApi.getUnreadCount();
      setUnreadCount(countData.unreadCount || 0);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationApi.markAsRead(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await notificationApi.deleteNotification(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      await loadNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-xl transition-colors hover:text-purple-400"
      >
        <FaBell />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
              <h3 className="font-bold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Mark all read
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      whileHover={{ x: 5 }}
                      className={`p-3 border-l-4 cursor-pointer transition-colors ${
                        notification.isRead
                          ? 'bg-gray-800/50 border-gray-600'
                          : 'bg-purple-900/30 border-purple-500'
                      } hover:bg-gray-800`}
                    >
                      <div
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="flex justify-between items-start mb-2"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {!notification.isRead && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-purple-500 rounded-full mt-1 ml-2"
                          />
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        {!notification.isRead && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaCheck size={10} /> Read
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleDelete(notification._id)}
                          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded flex items-center gap-1"
                        >
                          <FaTimes size={10} /> Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <FaBell size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-purple-500/30 text-center">
                <a
                  href="/notifications"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  View All Notifications
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
