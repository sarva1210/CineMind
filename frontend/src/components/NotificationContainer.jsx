import { motion, AnimatePresence } from 'framer-motion';
import useNotification from '../hooks/useNotification';
import { MdClose, MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';

const getNotificationStyles = (type) => {
  const styles = {
    success: {
      bg: 'bg-green-500/20 border-green-500',
      icon: <MdCheckCircle className="text-green-500 text-xl" />,
    },
    error: {
      bg: 'bg-red-500/20 border-red-500',
      icon: <MdError className="text-red-500 text-xl" />,
    },
    warning: {
      bg: 'bg-yellow-500/20 border-yellow-500',
      icon: <MdWarning className="text-yellow-500 text-xl" />,
    },
    info: {
      bg: 'bg-blue-500/20 border-blue-500',
      icon: <MdInfo className="text-blue-500 text-xl" />,
    },
  };
  return styles[type] || styles.info;
};

const NotificationItem = ({ notification, onClose }) => {
  const style = getNotificationStyles(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.3 }}
      className={`${style.bg} border-l-4 rounded-r-lg px-4 py-3 mb-2 flex items-center gap-3 backdrop-blur-md`}
    >
      {style.icon}
      <span className="flex-1">{notification.message}</span>
      <button
        onClick={() => onClose(notification.id)}
        className="hover:opacity-80 transition-opacity"
      >
        <MdClose className="text-lg" />
      </button>
    </motion.div>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
      <AnimatePresence mode="wait">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
