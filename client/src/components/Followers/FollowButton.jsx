import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/index.js";
import axios from "axios";

const FollowButton = ({ followingId }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = useSelector((state) => state.user.id); 
  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/following-status/${followingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error al verificar el estado de seguimiento:", error);
      }
    };
  
    checkFollowingStatus();
  }, [followingId, userId]);
  

  const handleFollow = async () => {
    if (isFollowing) {
      await dispatch(unfollowUser(followingId));
    } else {
      await dispatch(followUser(followingId));
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded ${
        isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
    >
      {isFollowing ? "Dejar de Seguir" : "Seguir"}
    </button>
  );
};

export default FollowButton;
