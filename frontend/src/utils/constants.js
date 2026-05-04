/**
 * Application constants
 */

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  // Movies
  MOVIES: {
    TRENDING: '/movies/trending',
    RECOMMENDED: '/movies/recommended',
    TOP_RATED: '/movies/top-rated',
    SEARCH: '/movies/search',
    DETAILS: (id) => `/movies/${id}`,
    CAST: (id) => `/movies/${id}/cast`,
    TRAILER: (id) => `/movies/${id}/trailer`,
    REVIEWS: (id) => `/movies/${id}/reviews`,
  },
  // Favorites
  FAVORITES: {
    GET: '/favorites',
    ADD: '/favorites',
    REMOVE: (id) => `/favorites/${id}`,
    CHECK: (id) => `/favorites/${id}`,
  },
  // Watch History
  WATCH_HISTORY: {
    GET: '/watch-history',
    ADD: '/watch-history',
  },
  // AI
  AI: {
    CHAT: '/ai/chat',
    RECOMMENDATIONS: '/ai/recommendations',
    CONVERSATIONS: '/ai/conversations',
    CONVERSATION_DETAILS: (id) => `/ai/conversations/${id}`,
    ANALYZE_MOVIE: '/ai/analyze-movie',
    PERSONALIZED: '/ai/personalized-suggestions',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  PREFERENCES: 'user_preferences',
  LAST_SEARCH: 'last_search_query',
  THEME: 'theme_preference',
};

// Movie Genres
export const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Horror' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Sci-Fi' },
  { id: 7, name: 'Thriller' },
  { id: 8, name: 'Animation' },
  { id: 9, name: 'Fantasy' },
  { id: 10, name: 'Adventure' },
];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MIN_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  USER_EXISTS: 'This email is already registered. Please login instead.',
  WEAK_PASSWORD: 'Password must be at least 6 characters long.',
  MISSING_FIELDS: 'Please fill in all required fields.',
  SOMETHING_WRONG: 'Something went wrong. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  TERMS_NOT_ACCEPTED: 'Please accept the terms and conditions.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  REGISTER_SUCCESS: 'Registration successful! Welcome to CineMind!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  ADDED_TO_FAVORITES: 'Added to your favorites!',
  REMOVED_FROM_FAVORITES: 'Removed from your favorites.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
};

// Animation Durations (in ms)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 600,
  VERY_SLOW: 1000,
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  TWO_XL: 1536,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
  GUEST: 'guest',
};

// Movie Sorting Options
export const MOVIE_SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
  { value: 'title', label: 'Title (A-Z)' },
];

// Content Ratings
export const CONTENT_RATINGS = [
  { value: 'G', label: 'G - General Audiences' },
  { value: 'PG', label: 'PG - Parental Guidance' },
  { value: 'PG-13', label: 'PG-13 - Parents Strongly Cautioned' },
  { value: 'R', label: 'R - Restricted' },
  { value: 'NC-17', label: 'NC-17 - Adults Only' },
];

// Feature Flags (for toggling features)
export const FEATURE_FLAGS = {
  ENABLE_AI_CHAT: true,
  ENABLE_SOCIAL_SHARING: false,
  ENABLE_USER_REVIEWS: false,
  ENABLE_WATCH_HISTORY: true,
  ENABLE_RECOMMENDATIONS: true,
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

export default {
  API_ENDPOINTS,
  STORAGE_KEYS,
  GENRES,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  HTTP_STATUS,
  USER_ROLES,
  MOVIE_SORT_OPTIONS,
  CONTENT_RATINGS,
  FEATURE_FLAGS,
  CACHE_DURATION,
  REGEX_PATTERNS,
};
