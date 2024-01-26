import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization } from '../../redux/actions/index';
import Select from 'react-select';
import '../../css/Cards.css';

export default function GetComments() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.allcoment);
  const localizationData = useSelector((state) => state.localizationData);

  useEffect(() => {
    dispatch(getLocalization());
  }, [dispatch]);

  useEffect(() => {
    const country = selectedCountry?.value || '';
    const city = selectedCity?.value || '';
    dispatch(getComments(country, city)).then(response => {
      // If no comments are returned, reset selections
      if (response && response.data && response.data.length === 0) {
        setSelectedCountry(null);
        setSelectedCity(null);
      }
    });
  }, [dispatch, selectedCountry, selectedCity]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const countryOptions = localizationData
    ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
    : [];

  const cityOptions = selectedCountry 
    ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city })) 
    : [];

  return (
    <div>
      <h1>Comentarios</h1>
      <div>
        <label>
          Country:
          <Select 
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            isClearable
            className="selectsearch"
          />
        </label>
        <label>
          City:
          <Select 
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            isClearable
            isDisabled={!selectedCountry}
            className="selectsearch"
          />
        </label>
      </div>
      <div className="comment-container">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <strong className="comment-name">{comment.user?.name}</strong>
              <p className="comment-details">
                {comment.user?.originCountry}, {comment.user?.originCity} 
              </p>
              <p className="comment-text">{comment.texto}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
}
