import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers } from '../../redux/actions/index.js';

const FollowersModal = ({ show, handleClose, userId }) => {
    const dispatch = useDispatch();
    const followers = useSelector((state) => state.followersList); 
    console.log("followers", followers);
  
    useEffect(() => {
      if (show) {
          dispatch(getFollowers(userId));
      }
    }, [show, userId, dispatch]);
  
    if (!show) return null;
  
    return (
      <>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50" 
          onClick={handleClose}
        ></div>
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Followers</h2>
            <ul className="space-y-2">
              {followers.length > 0 ? (
                followers.map((follower) => (
                  <li key={follower.id} className="border-b py-2">
                    {follower.name}
                    <img src={follower.picture}></img>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-600">No followers found.</li>
              )}
            </ul>
            <button 
              className="absolute bottom-2 right-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  };
  
export default FollowersModal;
