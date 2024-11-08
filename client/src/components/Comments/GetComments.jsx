import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization, likeComment } from '../../redux/actions/index';
import Swal from 'sweetalert2';
import CommentCard from './CommentCard';

export default function GetComments() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.allcoment);
  const userId = useSelector((state) => state.homeData?.id); 
  const localizationData = useSelector((state) => state.localizationData);

  useEffect(() => {
    dispatch(getLocalization());
  }, [dispatch]);

  useEffect(() => {
    const country = selectedCountry?.value || '';
    const city = selectedCity?.value || '';
    dispatch(getComments(country, city)).then(response => {
      if (response && response.data && response.data.length === 0) {
        setSelectedCountry(null);
        setSelectedCity(null);
        Swal.fire("City or country doesn't have un buen chisme");
      }
    });
  }, [dispatch, selectedCountry, selectedCity]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const readTextAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const spanishWords = ["el", "la", "y", "en", "que", "los", "se", "del", "las", "por"];
    const isSpanish = spanishWords.some(word => text.includes(word));
    utterance.lang = isSpanish ? 'en-US' : 'es-ES';
    speechSynthesis.speak(utterance);
  };

  const handleLike = (commentId) => {
    if (userId) {
      dispatch(likeComment(userId, commentId));
    } else {
      Swal.fire("Debes iniciar sesión para dar like");
    }
  };

  const countryOptions = localizationData
    ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
    : [];

  const cityOptions = selectedCountry
    ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city }))
    : [];

  return (
    <div className="container py-6">
    <div className="comment-container grid lg:grid-cols-3 gap-6">
      {comments && comments.length > 0 ? (
        comments.map((comment) => {
          const likesCount = comment.likes.length;
          const hasLiked = comment.likes.some(like => like?.userId === userId);
          return (
            <div key={comment.id} className="w-full px-16 lg:px-0 mx-auto ml-20 bg-white rounded-lg">
              <CommentCard
                comment={comment}
                readTextAloud={readTextAloud}
                handleLike={handleLike}
                hasLiked={hasLiked}
                likesCount={likesCount}
              />
            </div>
          );
        })
      ) : (
        <p className="nocomments text-center m-auto text-gray-700">No hay comentarios disponibles.</p>
      )}
    </div>
  </div>
  
  );
}
