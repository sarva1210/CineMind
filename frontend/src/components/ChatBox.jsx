import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSend } from 'react-icons/ai';
import { BsRobot, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import aiApi from '../services/api/aiApi';
import movieApi from '../services/api/movieApi';

const PLACEHOLDER_SUGGESTIONS = [
  "I'm feeling sad, want something heartwarming",
  "A mind-bending thriller like Inception",
  "Movies with amazing cinematography",
  "Something funny for a Friday night",
  "Best movies by Christopher Nolan",
  "I remember a scene where it's raining during a heist",
];

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm CineMind AI 🎬 Tell me your mood, describe a scene you remember, or ask for any type of movie — I'll find the perfect pick for you!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_SUGGESTIONS[0]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Rotate placeholder text
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % PLACEHOLDER_SUGGESTIONS.length;
      setPlaceholder(PLACEHOLDER_SUGGESTIONS[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e, overrideMessage) => {
    if (e) e.preventDefault();
    const text = overrideMessage || input;
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text, timestamp: new Date() };
    const history = messages.filter((m) => m.role !== 'assistant' || messages.indexOf(m) > 0);

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await aiApi.sendMessage(text, conversationHistory.slice(-8));

      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        movies: response.suggestedMovies || [],
        followUp: response.followUp || '',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Hmm, something went wrong! Please check if the backend is running and try again.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (movieTitle) => {
    try {
      const res = await movieApi.searchMovies(movieTitle, 1);
      const movies = res.movies || res.results || [];
      if (movies.length > 0) {
        navigate(`/movie/${movies[0].id}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(movieTitle)}`);
      }
    } catch {
      navigate(`/search?q=${encodeURIComponent(movieTitle)}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-950 to-purple-950/20 rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-900/20">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-purple-500/20 bg-black/40">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
          <BsRobot className="text-white w-4 h-4" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">CineMind AI</p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mt-1">
                  <BsRobot className="text-white w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xs lg:max-w-lg xl:max-w-xl ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-sm'
                      : msg.isError
                      ? 'bg-red-900/40 border border-red-500/50 text-red-200 rounded-tl-sm'
                      : 'bg-gray-800/70 border border-gray-700/50 text-gray-100 rounded-tl-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Movie suggestions from AI */}
                {msg.movies?.length > 0 && (
                  <div className="w-full space-y-2">
                    {msg.movies.map((movie, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleSearch(movie.title)}
                        className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 hover:border-purple-500 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-purple-300 text-sm group-hover:text-purple-200 transition-colors">
                              🎬 {movie.title} {movie.year ? `(${movie.year})` : ''}
                            </p>
                            {movie.genre && (
                              <p className="text-xs text-gray-500 mt-0.5">{movie.genre}</p>
                            )}
                            {movie.reason && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{movie.reason}</p>
                            )}
                          </div>
                          {movie.rating && (
                            <span className="text-xs text-yellow-400 font-bold whitespace-nowrap">
                              ⭐ {Number(movie.rating).toFixed(1)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-purple-400/70 mt-2 group-hover:text-purple-400 transition-colors">
                          Click to view details →
                        </p>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Follow-up question */}
                {msg.followUp && (
                  <button
                    onClick={() => handleSendMessage(null, msg.followUp)}
                    className="text-xs text-blue-400 hover:text-blue-300 italic transition-colors text-left"
                  >
                    💬 {msg.followUp}
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mt-1">
                  <BsPerson className="text-white w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
              <BsRobot className="text-white w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-800/70 border border-gray-700/50">
              <div className="flex gap-1 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-purple-400 inline-block"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-purple-500/20 p-4 bg-black/40"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900/80 border border-purple-500/30 focus:border-purple-500 outline-none text-white placeholder-gray-600 transition-colors text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold text-white flex items-center gap-2 text-sm"
          >
            <AiOutlineSend className="w-4 h-4" />
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}