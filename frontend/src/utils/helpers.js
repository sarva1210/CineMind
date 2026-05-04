/**
 * Common utility functions for the application
 */

// Format date to readable format
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time to readable format
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate text to specified length
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// Format movie rating
export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return (Math.round(rating * 10) / 10).toFixed(1);
};

// Get image URL with fallback
export const getImageUrl = (url, fallback = null) => {
  if (!url) {
    return fallback || 'https://via.placeholder.com/300x450?text=No+Image';
  }
  // Add base URL if relative path
  if (url.startsWith('/')) {
    return `${import.meta.env.VITE_API_URL}${url}`;
  }
  return url;
};

// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Check if URL is valid
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Get YouTube video ID from URL
export const getYouTubeId = (url) => {
  if (!url) return null;
  
  let id;
  
  // Handle youtube.com/watch?v=
  id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (id && id[1]) return id[1];
  
  // Handle youtube.com/embed/
  id = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
  if (id && id[1]) return id[1];
  
  return null;
};

// Format movie duration
export const formatDuration = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Parse error message from API response
export const getErrorMessage = (error) => {
  if (!error) return 'An error occurred';
  
  if (error.message) {
    return error.message;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.response?.statusText) {
    return error.response.statusText;
  }
  
  return 'An error occurred. Please try again.';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get stored user data
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Slugify string for URLs
export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Check if value is empty
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Compare two objects
export const objectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// Get gradient class based on rating
export const getRatingGradient = (rating) => {
  if (!rating) return 'from-gray-500 to-gray-600';
  if (rating >= 8) return 'from-green-500 to-emerald-600';
  if (rating >= 6) return 'from-yellow-500 to-orange-600';
  return 'from-red-500 to-pink-600';
};

export default {
  formatDate,
  formatTime,
  truncateText,
  formatRating,
  getImageUrl,
  debounce,
  getInitials,
  isValidUrl,
  getYouTubeId,
  formatDuration,
  getErrorMessage,
  isAuthenticated,
  getStoredUser,
  slugify,
  isEmpty,
  deepClone,
  objectsEqual,
  getRatingGradient,
};
