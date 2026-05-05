const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./modules/auth/authRoutes');
const userRoutes = require('./modules/user/userRoutes');
const movieRoutes = require('./modules/movie/movieRoutes');
const favoritesRoutes = require('./modules/favorites/favoritesRoutes');
const aiRoutes = require('./modules/ai/aiRoutes');
const ratingRoutes = require('./modules/rating/ratingRoutes');
const socialRoutes = require('./modules/social/socialRoutes');
const watchlistRoutes = require('./modules/watchlist/watchlistRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/watchlist', watchlistRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    statusCode: 404,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
