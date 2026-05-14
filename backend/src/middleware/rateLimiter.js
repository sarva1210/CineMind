const rateLimit = require('express-rate-limit');
const redis = require('redis');

// Create Redis client if available (optional)
let redisClient = null;
try {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  });
  redisClient.on('error', () => {
    console.log('Redis not available, using memory store');
    redisClient = null;
  });
} catch (error) {
  console.log('Redis not configured, using memory store');
}

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  message: 'Too many login/register attempts, please try again later',
  skipSuccessfulRequests: true,
});

// Rating submission limiter
const ratingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 ratings per hour
  message: 'Too many ratings submitted, please try again later',
});

// Comment limiter
const commentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30, // 30 comments per hour
  message: 'Too many comments, please try again later',
});

module.exports = { apiLimiter, authLimiter, ratingLimiter, commentLimiter,};