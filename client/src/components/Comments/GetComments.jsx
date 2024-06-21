import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SelectCountry from '../general/SelectCountry';

export default function GetComments() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.allcoment);
  const localizationData = useSelector((state) => state.localizationData);
  const navigate = useNavigate();
  const [fullCommentsVisibility, setFullCommentsVisibility] = useState({});
  
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
  
  const toggleCommentVisibility = (id) => {
    setFullCommentsVisibility(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };
  
  const readTextAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const spanishWords = ["el", "la", "y", "en", "que", "los", "se", "del", "las", "por"];
    const isSpanish = spanishWords.some(word => text.includes(word));
    utterance.lang = isSpanish ? 'es-ES' : 'en-US';
    speechSynthesis.speak(utterance);
  };
  
  const countryOptions = localizationData
    ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
    : [];
  
  const cityOptions = selectedCountry
    ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city }))
    : [];
  
  return (
    <div className="container mx-auto p-4">
      <div className="comment-container flex flex-wrap justify-center items-start p-15 gap-5 relative">
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            const commentText = comment.texto || 'Comentario no disponible'; // Asegúrate de que comment.texto esté definido
            const isLongComment = commentText.split(' ').length > 50;
            const shouldShowFullComment = fullCommentsVisibility[comment.id];
            const displayText = isLongComment && !shouldShowFullComment
              ? `${commentText.split(' ').slice(0, 50).join(' ')}...`
              : commentText;

            // Corregir la barra invertida en la ruta del archivo de audio
            const audioFilePath = comment.audioFilePath ? comment.audioFilePath.replace(/\\/g, '/') : '';
            console.log("audios", audioFilePath); // Verificar la ruta del archivo de audio
            
            return (
              <div key={comment.id} className="comment-card flex flex-col items-center justify-center bg-yellow-100 shadow-lg p-5 m-5 rotate-[-2deg] flex-basis-1/4 max-w-[350px] w-[250px] rounded-lg relative transition-shadow duration-300 hover:shadow-xl">
                <div className="absolute top-[-10px] left-[10%] w-[80px] h-[20px] bg-white opacity-50 rotate-[-5deg]"></div>
                <div className="flex items-center">
                  <img src={comment.user.picture} alt={`Imagen de ${comment.user.name}`} className="w-20 h-20 rounded-full border-3 border-white shadow-md mb-4" />
                  <div className="grid text-center">
                    <h2 className="font-bold text-black text-shadow-sm">{comment.user.name}</h2>
                    <h5 className="absolute !text-gray-700 top-1 text-xs">{comment.user.originCountry}, {comment.user.originCity}</h5>
                  </div>
                </div>
                <p className="comment-text text-black font-bold p-2 text-shadow-sm">{displayText}</p>
                {isLongComment && (
                  <button
                    onClick={() => toggleCommentVisibility(comment.id)}
                    className="text-blue-500 hover:underline"
                  >
                    {shouldShowFullComment ? 'ver menos' : 'ver más'}
                  </button>
                )}
                <button
                  onClick={() => readTextAloud(displayText)}
                  className="text-green-500 hover:underline mt-2"
                >
                  Leer en voz alta
                </button>
                {audioFilePath ? (
  <audio controls className="mt-2">
    <source src={`http://localhost:3001/${audioFilePath}`} type="audio/wav" />
    Tu navegador no soporta el elemento de audio.
  </audio>
) : (
  <h2>"no hay audio"</h2>
)}

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
