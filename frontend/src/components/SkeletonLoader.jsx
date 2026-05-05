import { motion } from 'framer-motion';

export default function SkeletonLoader({ count = 1, type = 'card' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (type === 'card') {
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="animate-pulse">
                <div className="bg-gray-700 dark:bg-gray-800 rounded-xl h-80 mb-4"></div>
                <div className="bg-gray-700 dark:bg-gray-800 rounded h-4 mb-2 w-3/4"></div>
                <div className="bg-gray-700 dark:bg-gray-800 rounded h-3 w-1/2"></div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    );
  }

  if (type === 'banner') {
    return (
      <motion.div variants={itemVariants} className="animate-pulse">
        <div className="bg-gray-700 dark:bg-gray-800 rounded-xl h-96 w-full"></div>
      </motion.div>
    );
  }

  if (type === 'detail') {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="animate-pulse">
          <div className="bg-gray-700 dark:bg-gray-800 rounded-xl h-96 w-full mb-4"></div>
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-3 animate-pulse">
          <div className="bg-gray-700 dark:bg-gray-800 rounded h-6 w-1/2"></div>
          <div className="bg-gray-700 dark:bg-gray-800 rounded h-4 w-full"></div>
          <div className="bg-gray-700 dark:bg-gray-800 rounded h-4 w-5/6"></div>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}
