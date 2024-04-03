import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import Select from 'react-select';
import '../../css/Cards.css';
import '../../css/Select.css';
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
        Swal.fire("City or country doesnt have un buen chisme");
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
    setFullCommentsVisibility(prevState => ({...prevState, [id]: !prevState[id]}));
  };

  const countryOptions = localizationData
    ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
    : [];

  const cityOptions = selectedCountry
    ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city }))
    : [];

  return (
    <div>

      <div className="comment-container">
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            const isLongComment = comment.texto.split(' ').length > 50;
            const shouldShowFullComment = fullCommentsVisibility[comment.id];
            const displayText = isLongComment && !shouldShowFullComment
              ? `${comment.texto.split(' ').slice(0, 50).join(' ')}...`
              : comment.texto;
              
            return (
              <div key={comment.id} className="comment-card">
                <img src={comment.user.picture} alt={`Imagen de ${comment.user.name}`} className="cardpicture" />
                <strong className="comment-name">{comment.user.name}</strong>
                <p className="comment-name">
                  {comment.user.originCountry}, {comment.user.originCity}
                </p>
                <p className="comment-text">{displayText}</p>
                {isLongComment && (
                  <button onClick={() => toggleCommentVisibility(comment.id)}>
                    {shouldShowFullComment ? 'ver menos' : 'ver más'}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className='nocomments'>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
}
