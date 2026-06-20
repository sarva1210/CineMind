const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

// Import routes
const movieRoutes = require('./modules/movie/movieRoutes');
const aiRoutes = require('./modules/ai/aiRoutes');

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

// Rate limiting
app.use(apiLimiter);

// Health Check Route
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
  });
});

// TMDB Test Route
app.get('/test-tmdb', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication'
    );

    const data = await response.text();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      name: err.name,
      message: err.message,
      cause: err.cause,
    });
  }
});

app.get('/test-google', async (req, res) => {
  try {
    const response = await axios.get('https://www.google.com');

    res.json({
      success: true,
      status: response.status,
    });
  } catch (err) {
    res.json({
      code: err.code,
      message: err.message,
    });
  }
});

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/ai', aiRoutes);

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