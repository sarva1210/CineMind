import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChatBox from '../components/ChatBox';


export default function Assistant() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold text-white mb-4">Sign In to Chat</h2>
          <p className="text-gray-400 text-lg mb-8">
            Please log in to use the AI Assistant and get personalized movie recommendations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all"
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black pt-20 pb-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4 inline-block"
          >
            🤖
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            CineMind AI Assistant
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chat with our AI to get personalized movie recommendations, discuss your favorite films, and discover hidden gems!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: '💬',
              title: 'Chat Anytime',
              description: 'Have natural conversations about movies',
            },
            {
              icon: '🎬',
              title: 'Smart Recommendations',
              description: 'Get personalized movie suggestions',
            },
            {
              icon: '🌟',
              title: 'Instant Insights',
              description: 'Learn about plots, genres, and more',
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-b from-purple-900/30 to-blue-900/30 border border-purple-500/20 text-center"
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Chat Container */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 md:px-8 max-w-4xl mx-auto"
      >
        <div className="h-96 md:h-screen md:max-h-[600px]">
          <ChatBox />
        </div>
      </motion.section>

      {/* Tips Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto mt-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">💡 Helpful Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Ask by Genre',
              example: '"Show me the best sci-fi movies"',
            },
            {
              title: 'Actor Recommendations',
              example: '"Movies with Tom Holand"',
            },
            {
              title: 'Mood-Based Search',
              example: '"I want something funny and romentic"',
            },
            {
              title: 'Comparison',
              example: '"Movies similar to Deadpool"',
            },
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20"
            >
              <h3 className="text-lg font-bold text-purple-300 mb-2">{tip.title}</h3>
              <p className="text-gray-400 italic">Try: {tip.example}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}