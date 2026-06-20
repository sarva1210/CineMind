import { motion } from 'framer-motion';
import ChatBox from '../components/ChatBox';

const TIPS = [
  { icon: '😢', title: 'By Mood', example: '"I feel sad, want something uplifting"' },
  { icon: '🎬', title: 'By Scene', example: '"Movies with a heist in the rain"' },
  { icon: '🌟', title: 'By Actor', example: '"Best movies with Cillian Murphy"' },
  { icon: '🔥', title: 'Similar Movies', example: '"Something like Interstellar"' },
  { icon: '🎭', title: 'By Genre', example: '"Dark psychological thriller"' },
  { icon: '🌍', title: 'World Cinema', example: '"Korean or Spanish films"' },
];

export default function Assistant() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black pt-20 pb-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-10">
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
            Describe your mood, a scene you remember, or what kind of movie you're in the mood for — 
            I'll find the perfect film for you!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {TIPS.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-4 rounded-xl bg-gradient-to-b from-purple-900/30 to-blue-900/30 border border-purple-500/20 text-center hover:border-purple-500/50 transition-all cursor-default"
            >
              <div className="text-2xl mb-1">{tip.icon}</div>
              <h3 className="text-xs font-bold text-white mb-1">{tip.title}</h3>
              <p className="text-xs text-gray-500 italic hidden md:block">{tip.example}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Chat Container */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 md:px-8 max-w-4xl mx-auto"
      >
        <div style={{ height: '600px' }}>
          <ChatBox />
        </div>
      </motion.section>
    </div>
  );
}