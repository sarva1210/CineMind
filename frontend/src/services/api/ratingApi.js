import axios from './axios';

const API_BASE = '/api/ratings';

export default {
  // Submit a rating
  submitRating(movieId, data) {
    return axios.post(`${API_BASE}`, { movieId, ...data }).then((res) => res.data.data);
  },


  // Get all ratings for a movie
  getMovieRatings(movieId, page = 1, sortBy = 'newest') {
    return axios
      .get(`${API_BASE}/movie/${movieId}`, { params: { page, sortBy, limit: 10 } })
      .then((res) => res.data.data);
  },

  
  // Get user's rating for a movie
  getUserRating(movieId) {
    return axios.get(`${API_BASE}/user/${movieId}`).then((res) => res.data.data);
  },

  // Mark review as helpful
  markHelpful(ratingId, helpful = true) {
    return axios.put(`${API_BASE}/${ratingId}/helpful`, { helpful }).then((res) => res.data.data);
  },

  // Delete rating
  deleteRating(movieId) {
    return axios.delete(`${API_BASE}/${movieId}`).then((res) => res.data);
  },
};