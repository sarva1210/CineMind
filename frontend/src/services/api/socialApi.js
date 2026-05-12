import axios from './axios';

const API_BASE = '/api/social';

export default {
  // Follow a user
  followUser(userId) {
    return axios.post(`${API_BASE}/${userId}/follow`).then((res) => res.data.data);
  },

  
  // Unfollow a user
  unfollowUser(userId) {
    return axios.delete(`${API_BASE}/${userId}/follow`).then((res) => res.data);
  },

  // Get followers of a user
  getFollowers(userId, page = 1) {
    return axios
      .get(`${API_BASE}/${userId}/followers`, { params: { page, limit: 20 } })
      .then((res) => res.data.data);
  },

  // Get users that a user is following
  getFollowing(userId, page = 1) {
    return axios
      .get(`${API_BASE}/${userId}/following`, { params: { page, limit: 20 } })
      .then((res) => res.data.data);
  },

  // Check if following a user
  isFollowing(userId) {
    return axios.get(`${API_BASE}/${userId}/is-following`).then((res) => res.data.data);
  },

  // Get follower/following counts
  getFollowerCount(userId) {
    return axios.get(`${API_BASE}/${userId}/count`).then((res) => res.data.data);
  },
};
