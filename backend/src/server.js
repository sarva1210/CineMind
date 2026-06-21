require("dns").setDefaultResultOrder("ipv4first");
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5000;

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log("Gemini Loaded:", !!process.env.GEMINI_API_KEY);
  console.log("TMDB:", process.env.TMDB_API_KEY?.slice(0,20));
console.log("TMDB URL:", process.env.TMDB_BASE_URL);
  console.log("Gemini API Key:", process.env.GEMINI_API_KEY?.slice(0,20));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = server;