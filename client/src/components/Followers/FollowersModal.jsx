import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers } from '../../redux/actions/index.js';
import { useNavigate } from 'react-router-dom'; 

const FollowersModal = ({ show, handleClose, userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const followers = useSelector((state) => state.followersList); 

    const handleUserClick = (userId) => {
      navigate(`/profiles/${userId}`); 
    };

    useEffect(() => {
      if (show) {
          dispatch(getFollowers(userId));
      }
    }, [show, userId, dispatch]);
  
    if (!show) return null;
  
    return (
      <>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 " 
          onClick={handleClose}
        ></div>
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
            <button 
              className="absolute top-2 right-2 text-red-600 hover:text-gray-900 text-4xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Seguidores</h2>
            <div className="overflow-y-auto h-64">
              <ul className="space-y-2">
                {followers.length > 0 ? (
                  followers.map((follower) => (
                    <li key={follower.id} className="flex items-center space-x-4 border-b py-2">
                      <img 
                        src={follower.picture || '/placeholder.svg'} 
                        alt={follower.name} 
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm font-medium cursor-pointer" onClick={() => handleUserClick(follower.id)}>{follower.name}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-center text-black">No se encontraron seguidores.</li>
                )}
              </ul>
            </div>
            <button 
              className="mt-4 px-4 py-2 bg-gray-600 text-red rounded hover:bg-gray-700"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </>
    );
  };
  
export default FollowersModal;
