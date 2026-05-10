import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import notificationApi from '../services/api/notificationApi';
import SkeletonLoader from '../components/SkeletonLoader';


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadNotifications();
  }, [page]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationApi.getNotifications(page, false);
      setNotifications(data.notifications || []);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
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


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Notifications
      </h1>

      {loading ? (
        <SkeletonLoader count={5} type="card" />
      ) : notifications.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {notifications.map((notification) => (
            <motion.div
              key={notification._id}
              whileHover={{ x: 5 }}
              className={`p-6 rounded-xl border transition-all ${
                notification.isRead
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{notification.title}</h3>
                  <p className="text-gray-400 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-purple-500 rounded-full ml-4 mt-1"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {notification.actionUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={notification.actionUrl}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View
                  </motion.a>
                )}

                {!notification.isRead && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Mark as Read
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDelete(notification._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg"
              >
                Previous
              </motion.button>

              <span className="flex items-center px-4">
                Page {page} of {totalPages}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg"
              >
                Next
              </motion.button>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No notifications yet</p>
        </div>
      )}
    </motion.div>
  );
}