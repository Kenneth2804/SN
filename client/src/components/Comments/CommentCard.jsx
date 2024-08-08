import React from 'react';
import { FaThumbsUp, FaBackward, FaForward, FaHeart } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CommentCard = ({ comment, readTextAloud, handleLike, hasLiked, likesCount }) => {
  const userProfile = useSelector((state) => state.userProfile);

  const isOwnComment = userProfile?.id === comment.user.id;

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-full">
      <div className="w-full flex justify-between items-center space-x-2">
        <Link to={isOwnComment ? `/profile` : `/profiles/${comment.user.id}`}>
          <img src={comment.user.picture} alt={`Imagen de ${comment.user.name}`} className="w-16 h-16 rounded-full border-3 border-white shadow-md mb-4" />
        </Link>
        <div className="flex-grow text-center">
          <h2 className="font-bold text-lg">{comment.user.name} <span className="text-sm text-gray-700">To</span> {comment.to}</h2>
          <div className="flex items-center justify-center space-x-1 text-gray-700 text-sm">
            <FiMapPin />
            <span>{comment.user.originCountry}, {comment.user.originCity}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-40 bg-black text-white rounded-lg p-4 overflow-auto">
        {comment.texto}
      </div>
      <button onClick={() => readTextAloud(comment.texto)} className="text-green-500 hover:underline mt-2">
        Leer en voz alta
      </button>
      <div className="w-full flex justify-between items-center text-2xl">
        <FaBackward />
        {comment.audioFilePath ? (
          <div className="mt-4 p-4 rounded-lg shadow-lg bg-pink-100 flex items-center justify-center">
            <audio controls className="w-44 rounded-lg">
              <source src={comment.audioFilePath} type="audio/wav" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        ) : (
          <h2 className="mt-4 text-lg font-semibold text-pink-600">No hay audio</h2>
        )}
        <FaForward />
      </div>
      <div className="w-full flex justify-center items-center text-2xl">
        <button onClick={() => handleLike(comment.id)} className={`text-2xl ${hasLiked ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-700 transition-colors duration-200`}>
          <FaHeart />
        </button>
        <span className="ml-2 text-black font-bold">{likesCount}</span>
      </div>
    </div>
  );
};

export default CommentCard;
