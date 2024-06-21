import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getLocalization } from '../../redux/actions/index';
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

    const countryOptions = localizationData
        ? localizationData.map(loc => ({ value: loc.country, label: loc.country }))
        : [];

    const cityOptions = selectedCountry
        ? localizationData.find(loc => loc.country === selectedCountry.value)?.cities.map(city => ({ value: city, label: city }))
        : [];

    return (
        <div className="flex gap-4 items-center">
            <label className="flex flex-col">
    
                <Select 
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    isClearable
                    className="bg-gray-800 px-4 py-2 rounded-md flex text-black items-center justify-between w-50"
                    classNamePrefix="react-select"
                />
            </label>
            <label className="flex flex-col">
 
                <Select 
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={cityOptions}
                    isClearable
                    isDisabled={!selectedCountry}
                    className="bg-gray-800 px-4 py-2 rounded-md flex text-black items-center justify-between w-50"
                    classNamePrefix="react-select"
                />
            </label>
        </div>
    );
}
