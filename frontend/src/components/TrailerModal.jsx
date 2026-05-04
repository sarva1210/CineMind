import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

export default function TrailerModal({ isOpen, trailer, movieTitle, onClose }) {
  if (!trailer) return null;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    // Handle different YouTube URL formats
    if (url.includes('youtube.com/watch')) {
      const videoId = new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtube.com/embed')) {
      return url.includes('autoplay=1') ? url : `${url}?autoplay=1`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                <AiOutlineClose className="w-6 h-6" />
              </motion.button>

              {/* Title */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-purple-500/30 p-4">
                <h3 className="text-2xl font-bold text-white">
                  {movieTitle} - Official Trailer
                </h3>
              </div>

              {/* Video Container */}
              <div className="relative w-full bg-black aspect-video">
                {trailer.type === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(trailer.url || trailer.videoKey)}
                    title={`${movieTitle} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video
                    src={trailer.url}
                    title={`${movieTitle} Trailer`}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Trailer Info */}
              {trailer.description && (
                <div className="p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-gray-300 text-sm">{trailer.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}