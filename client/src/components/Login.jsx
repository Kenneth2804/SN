import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from 'react-redux';
import { postuser, getLocalization } from "../redux/actions/index.js";
import Select from "react-select"
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import "../css/LandingView.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const localizationData = useSelector(state => state.localizationData); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLocalization());
}, [dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = { email, password, name, originCountry: selectedCountry ? selectedCountry.value : '',
            originCity: selectedCity ? selectedCity.value : '' };

            const response = await dispatch(postuser(user));
          
            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Welcome! Enjoy your new account',
                    showConfirmButton: false,
                    timer: 1500
                });
                setRedirect(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Registration failed!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (redirect) {
        return navigate("/login");
    }
    const countryOptions = localizationData ? localizationData.map(country => ({ label: country.country, value: country.country })) : [];
    let cityOptions = [];
    if (selectedCountry && localizationData) {
      const selectedCountryData = localizationData.find(country => country.country === selectedCountry.value);
      cityOptions = selectedCountryData ? selectedCountryData.cities.map(city => ({ label: city, value: city })) : [];
    }
  
    return (
        <div>     
            <form onSubmit={handleSubmit}>
                <div className="title">Welcome</div>
                <div className="subtitle">
                    <p> Want an account?</p>
                    <p> well let's create one! just fill out the form</p>
                </div>
                <div className="inputField">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="inputField">
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="inputField">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <Select 
                    options={countryOptions}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
                    isClearable
                    className="selectsearch"
                />
                <Select 
                    options={cityOptions}
                    onChange={setSelectedCity}
                    placeholder="Select City"
                    isClearable
                    isDisabled={!selectedCountry}
                    className="selectsearch"
                />
                <div className="submitform">
                <button className="submit" type="submit">Register</button>
                </div>
                <p className="or"><h2>or</h2></p>
                <Link to={"/login"}>
                    <button className="submit" type="submit">Login</button>
                </Link>
                <Link to={"/forgotpassword"}>
                    <p className="terms">Forget your password?</p>
                </Link>
          
            </form>
        </div>
    );
};
