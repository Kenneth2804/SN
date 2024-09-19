import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Sidebar } from '../menu/Sidebar';
import { getUserProfile, getFollowers } from '../../redux/actions/index';
import FollowButton from '../../components/Followers/FollowButton.jsx';

const TABS = {
  COMMENTS: "Comentarios",
  LIKES: "Me gusta",
  SAVED: "Guardados",
};

const OtherProfiles = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS.COMMENTS); 

  useEffect(() => {
    dispatch(getFollowers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/profiles/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  if (!userData) {
    return <div>Cargando perfil del usuario...</div>;
  }

  const renderTabContent = () => {
    const tabData = {
      [TABS.COMMENTS]: userData.comments,
      [TABS.LIKES]: userData.likes,
      [TABS.SAVED]: userData.saved,
    }[activeTab];

    if (!tabData || tabData.length === 0) {
      return <p className="text-gray-400">No hay datos para mostrar</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tabData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-md shadow-md border border-gray-200"
          >
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Sidebar userData={userProfile} />
      <div className="w-full max-w-70 mx-auto my-8">
        <div className="bg-[#1a1b1e] rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-40 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-28 h-28 border-4 border-[#1a1b1e] rounded-full overflow-hidden">
                <img src={userData.picture} alt="Imagen del perfil" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="pt-16 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
            <p className="text-sm text-[#9ca3af] mt-1">{userData.email}</p>
            <p className="text-sm text-[#9ca3af] mt-1">
              <span className="text-[#6b7280]">City:</span> {userData.originCity}
            </p>
            <p className="text-sm text-[#9ca3af] mt-1">
              <span className="text-[#6b7280]">Country:</span> {userData.originCountry}
            </p>

            {userData.id !== userProfile.id && (
              <div className="mt-4">
                <FollowButton followingId={userData.id} />
              </div>
            )}
          </div>
          <div className="border-t border-[#2d3748] px-6 py-4">
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
                {userData.comments ? userData.comments.length : 0})
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === TABS.LIKES
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(TABS.LIKES)}
              >
                Comentarios guardados (
                {userData.likes ? userData.likes.length : 0})
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === TABS.SAVED
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(TABS.SAVED)}
              >
                Comentarios con like (
                {userData.saved ? userData.saved.length : 0})
              </button>
            </div>
            <div className="mt-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherProfiles;

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
