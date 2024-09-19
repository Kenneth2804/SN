import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, getLikes } from "../../redux/actions/index";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import FollowersModal from "../Followers/FollowersModal.jsx";
import AuthWrapper from "../token/AuthWrapper.jsx";
import { Sidebar } from "../menu/Sidebar.jsx";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; 

const TABS = {
  COMMENTS: "Comentarios",
  LIKES: "Me gusta",
  SAVED: "Guardados",
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const userProfile = useSelector((state) => state.userProfile);
  const likesData = useSelector((state) => state.likesData);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.COMMENTS);
  
  const handleUserClick = (userId) => {
    if (userId === userProfile.id) {
      navigate('/profile'); 
    } else {
      navigate(`/profiles/${userId}`); 
    }
  };

 useEffect(() => {
    if (userProfile && userProfile.id) {
      dispatch(getLikes(userProfile.id)); 
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  const handleFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const handleCloseFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const renderTabContent = () => {
    const tabData = {
      [TABS.COMMENTS]: userProfile.comments,
      [TABS.LIKES]: likesData?.likes || [],
      [TABS.SAVED]: userProfile.saved,
    }[activeTab];

    if (!tabData || tabData.length === 0) {
      return <p className="text-gray-400">No hay datos para mostrar</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tabData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-md shadow-md border border-gray-200"
          >
            {activeTab === TABS.LIKES && item.comment && (
              <>
          
                <div className="flex items-center mb-8">
                 
                  <img
                    src={item.comment.user?.picture || '/default-profile.png'}
                    alt="Foto del creador" 
                    className="w-8 h-8 rounded-full mr-6 cursor-pointer"
                    onClick={() => handleUserClick(item.comment.user.id)}
                    />
                    
                  <p className="text-md font-semibold cursor-pointer" onClick={() => handleUserClick(item.comment.user.id)}>
                    {item.comment.user?.name || 'Anónimo'}
                  </p>
                  <p className="text-sm text-gray-500 flex">
                 To: <strong>{item.comment.to || 'Desconocido'}</strong>
                </p>
                </div>
 
                <p className="text-xl font-semibold text-gray-700 text-left">
                  {item.comment.texto || 'Comentario sin texto'}
                </p>
                
                <p className="text-xs text-gray-500 mt-2">
                  Fecha: {new Date(item.comment.createdAt).toLocaleDateString()}
                </p>
              </>
            )}

            {activeTab !== TABS.LIKES && (
              <>
                {item.texto && (
                  <>
                    <div className="flex items-center gap-2">
                      <MessageCircleIcon className="w-5 h-5 text-gray-500" />
                      <p className="text-sm font-medium">Comentario</p>
                    </div>
                    <p className="text-xl font-semibold text-gray-700">
                      {item.texto}
                    </p>
                  </>
                )}
                {item.audioFilePath && (
                  <>
                    <div className="flex items-center gap-2">
                      <MicIcon className="w-5 h-5 text-gray-500" />
                      <p className="text-sm font-medium">Audio</p>
                    </div>
                    <audio controls className="w-full mt-2">
                      <source src={item.audioFilePath} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Fecha: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Sidebar userData={userProfile}></Sidebar>
      <AuthWrapper>
        <div className="container mx-auto my-8 p-4 bg-neutral-800 rounded-lg shadow-lg">
          <div className="flex">
            <div className="flex flex-col items-center p-4">
              <div className="w-24 h-24 border-2 border-gray-300 rounded-full overflow-hidden mb-4">
                <img
                  src={userProfile.picture}
                  alt="Imagen del perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {userProfile.name}
                </h2>
                <p className="text-sm text-gray-500 flex flex-col items-center">
                  <FiMapPin color="red" />
                  <span>
                    {userProfile.originCity}, {userProfile.originCountry}
                  </span>
                </p>

                <Link
                  to="/edit"
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 mt-2"
                >
                  <FaUserEdit />
                  <span>Editar perfil</span>
                </Link>
              </div>
              <button
                onClick={handleFollowersModal}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              >
                Mostrar seguidores
              </button>
            </div>
            <div className="flex-1 ml-8">
              <div className="mt-6 flex justify-around border-t border-gray-200 pt-4">
                <button
                  className={`px-4 py-2 font-semibold ${
                    activeTab === TABS.COMMENTS
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(TABS.COMMENTS)}
                >
                  Comentarios creados (
                  {userProfile.comments ? userProfile.comments.length : 0})
                </button>
                <button
                  className={`px-4 py-2 font-semibold ${
                    activeTab === TABS.LIKES
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(TABS.LIKES)}
                >
                  Me gusta (
                  {likesData?.likes ? likesData.likes.length : 0})
                </button>
                <button
                  className={`px-4 py-2 font-semibold ${
                    activeTab === TABS.SAVED
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(TABS.SAVED)}
                >
                  Guardados (
                  {userProfile.saved ? userProfile.saved.length : 0})
                </button>
              </div>
              <div className="mt-4">{renderTabContent()}</div>
            </div>
          </div>
          <FollowersModal
            show={showFollowersModal}
            handleClose={handleCloseFollowersModal}
            userId={userProfile.id}
          />
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
