import { motion } from 'framer-motion';


export default function Loader({ fullScreen = true }) {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner Dot */}
        <motion.div
          className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="absolute bottom-8 text-purple-400 font-semibold tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.p>
    </div>
  );
}
