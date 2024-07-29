import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/index'; 
import EditProfile from './EditProfile.jsx';
import { FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Sidebar } from '../menu/Sidebar.jsx';
import AuthWrapper from '../token/AuthWrapper.jsx';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    
    <>
      <Sidebar userData={userProfile}></Sidebar>
    <AuthWrapper>
      <div className="w-full max-w-70 mx-auto my-8">
        <div className="bg-[#1a1b1e] rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-40 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-28 h-28 border-4 border-[#1a1b1e] rounded-full overflow-hidden">
                <img src={userProfile.picture} alt="Imagen del perfil" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="pt-16 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
            <p className="text-sm text-[#9ca3af] mt-1">{userProfile.email}</p>
            <p className="text-sm text-[#9ca3af] mt-1">{userProfile.id}</p>
            <p className="text-sm text-[#9ca3af] mt-1">
              <span className="text-[#6b7280]">City:</span> {userProfile.originCity}
            </p>
            <p className="text-sm text-[#9ca3af] mt-1">
              <span className="text-[#6b7280]">Country:</span> {userProfile.originCountry}
            </p>
        <Link to={"/edit"} className='grid place-content-center mt-3' >
          <FaUserEdit style={{ color: 'black', fontSize: '24px' }} />
        </Link>
          </div>
          <div className="border-t border-[#2d3748] px-6 py-4">
            <div className="flex items-center justify-center text-white font-medium">
              Comments
            </div>
            <div className="bg-[#f9f9d3] rounded-md shadow-md p-6 max-w-sm mx-auto relative">
         
              <div className="space-y-6">
                {userProfile.comments && userProfile.comments.length > 0 ? (
                  userProfile.comments.map((comment, index) => (
                    <div key={index} className="space-y-4 p-4 border-b border-gray-700">
                      {comment.texto && (
                        <>
                          <div className="flex items-center gap-2">
                            <MessageCircleIcon className="w-5 h-5 text-muted-foreground" />
                            <p className="text-sm font-medium">Comment</p>
                          </div>
                          <p className="text-xl font-semibold text-muted-foreground">
                            {comment.texto}
                          </p>
                        </>
                      )}
                      {comment.audioFilePath && (
                        <>
                          <div className="flex items-center gap-2">
                            <MicIcon className="w-5 h-5 text-muted-foreground" />
                            <p className="text-sm font-medium">Voice</p>
                          </div>
                          <audio controls>
                            <source
                              src={`http://localhost:3001/${comment.audioFilePath}`}
                              type="audio/mpeg"
                              />
                            Your browser does not support the audio element.
                          </audio>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Created on: {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No tiene contenido</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
</AuthWrapper>
    </>
  );
};

export default UserProfile;

function MessageCircleIcon(props) {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
