import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions';

const FollowButton = ({ followingId }) => {
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.followers);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const isUserFollowing = followers.some(follower => follower.id === followingId);
    setIsFollowing(isUserFollowing);
  }, [followers, followingId]);

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unfollowUser(followingId));
    } else {
      dispatch(followUser(followingId));
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
        isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isFollowing ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
};

export default FollowButton;
