import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import Select from 'react-select';
import '../../css/Cards.css';
import '../../css/Select.css';

export default function SelectCountry() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const dispatch = useDispatch();
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

    
      const countryOptions = localizationData
        ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
        : [];
    
      const cityOptions = selectedCountry
        ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city }))
        : [];
    

  return (
    <div>
        <label>
          <Select 
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            isClearable
            className="selectsearchcards"
          />
        </label>
        <label>
          <Select 
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            isClearable
            isDisabled={!selectedCountry}
            className="selectsearchcards"
          />
        </label>
    </div>
  )
}
