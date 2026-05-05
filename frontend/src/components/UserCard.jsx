import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUserMinus, FaShare } from 'react-icons/fa';
import socialApi from '../services/api/socialApi';

export default function UserCard({ user, isCurrentUser = false, onFollowChange }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isCurrentUser) {
      loadFollowStatus();
      loadCounts();
    }
  }, [user?._id, isCurrentUser]);

  const loadFollowStatus = async () => {
    try {
      const data = await socialApi.isFollowing(user._id);
      setIsFollowing(data.isFollowing);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const loadCounts = async () => {
    try {
      const data = await socialApi.getFollowerCount(user._id);
      setCounts(data);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  const handleFollowClick = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await socialApi.unfollowUser(user._id);
        setIsFollowing(false);
      } else {
        await socialApi.followUser(user._id);
        setIsFollowing(true);
      }
      await loadCounts();
      onFollowChange?.();
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const userUrl = `${window.location.origin}/user/${user._id}`;
    navigator.clipboard.writeText(userUrl);
    alert('User profile link copied!');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-purple-900/40 to-black backdrop-blur border border-purple-500/30 rounded-xl p-6 text-center"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="mb-4 mx-auto"
      >
        <img
          src={user.avatar || 'https://via.placeholder.com/80'}
          alt={user.username}
          className="w-20 h-20 rounded-full border-2 border-purple-500 mx-auto"
        />
      </motion.div>

      {/* Username */}
      <h3 className="font-bold text-lg mb-2">{user.username}</h3>
      <p className="text-gray-400 text-sm mb-4">{user.email}</p>

      {/* Stats */}
      <div className="flex justify-around mb-4 py-3 border-y border-purple-500/30">
        <div>
          <p className="font-bold text-purple-400">{counts.followers}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div>
          <p className="font-bold text-pink-400">{counts.following}</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
      </div>

      {/* Actions */}
      {!isCurrentUser && (
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFollowClick}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all ${
              isFollowing
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {isFollowing ? (
              <>
                <FaUserMinus /> Following
              </>
            ) : (
              <>
                <FaUserPlus /> Follow
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleShare}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
          >
            <FaShare />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
