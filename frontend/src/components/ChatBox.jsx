import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSend } from 'react-icons/ai';
import aiApi from '../services/api/aiApi';
import Loader from './Loader';


export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiApi.sendMessage(input, conversationId);

      // Set conversation ID from response
      if (response.conversationId && !conversationId) {
        setConversationId(response.conversationId);
      }

      // Add AI response
      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Set suggested movies if available
      if (response.suggestedMovies) {
        setSuggestedMovies(response.suggestedMovies);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content:
          'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-black to-purple-900/20 rounded-2xl border border-purple-500/30 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-black">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CineMind AI Assistant
              </h3>
              <p className="text-gray-400">
                Ask me anything about movies, and I'll help you find your next favorite!
              </p>
            </motion.div>
          </div>
        )}

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg backdrop-blur border ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400'
                  : msg.isError
                  ? 'bg-red-600/30 border-red-500 text-red-200'
                  : 'bg-gray-800/50 border-gray-600'
              }`}
            >
              <p className="text-sm text-white break-words">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp?.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </motion.div>
        ))}

        {isLoading && <Loader fullScreen={false} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Movies */}
      {suggestedMovies.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 py-4 border-t border-purple-500/30 bg-purple-900/10"
        >
          <p className="text-sm text-gray-400 mb-3">Suggested movies:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedMovies.slice(0, 4).map((movie, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-gray-800/40 border border-purple-500/20 hover:border-purple-500 cursor-pointer transition-colors"
              >
                <p className="text-xs font-semibold text-purple-300 line-clamp-2">
                  {movie.title}
                </p>
                {movie.rating && (
                  <p className="text-xs text-yellow-400">⭐ {movie.rating.toFixed(1)}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-purple-500/30 p-4 bg-gradient-to-t from-black to-transparent"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about movies..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 focus:border-purple-500 outline-none text-white placeholder-gray-500 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all font-semibold text-white flex items-center gap-2"
          >
            <AiOutlineSend className="w-5 h-5" />
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}