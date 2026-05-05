import axios from './axios';

const API_BASE = '/api/watchlist';

export default {
  // Add to watchlist
  addToWatchlist(data) {
    return axios.post(`${API_BASE}`, data).then((res) => res.data.data);
  },

  // Get watchlist
  getWatchlist(status = null, page = 1) {
    return axios
      .get(`${API_BASE}`, { params: { status, page, limit: 20 } })
      .then((res) => res.data.data);
  },

  // Update watchlist item
  updateItem(movieId, data) {
    return axios.put(`${API_BASE}/${movieId}`, data).then((res) => res.data.data);
  },

  // Remove from watchlist
  removeItem(movieId) {
    return axios.delete(`${API_BASE}/${movieId}`).then((res) => res.data);
  },

  // Get stats
  getStats() {
    return axios.get(`${API_BASE}/stats`).then((res) => res.data.data);
  },
};
