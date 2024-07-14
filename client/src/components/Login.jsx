import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postuser, getLocalization } from "../redux/actions/index.js";
import Select from "react-select";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import postit from "../images/postit.png"


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
      const user = {
        email, password, name,
        originCountry: selectedCountry ? selectedCountry.value : '',
        originCity: selectedCity ? selectedCity.value : ''
      };

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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-8 py-12 md:px-16 ">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-4">
            <MoonIcon className="w-8 h-8 text-[#c0c0c0]" />
            <h1 className="text-3xl font-bold text-[#c0c0c0]">Welcome to SECRET NOTES</h1>
          </div>
          <p className="text-[#a0a0a0] text-lg">
          Step into the enigmatic world of Whispering Shadows, where hidden secrets and clandestine messages intertwine, and every note holds the key to unraveling a deeper mystery.
          </p>
          <img src={postit} alt="Dreamscape Landscape" className="rounded-2xl shadow-lg" />
        </div>
      </div>
      <div className="bg-[#0f0f0f] flex flex-col items-center justify-center px-8 py-12 md:px-16 md:py-24">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#c0c0c0]">Enter to SECRET NOTES</h2>
            <p className="text-[#a0a0a0] text-lg">Create your account to unlock the secrets of the ethereal realm.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
            <label htmlFor="email" className="text-[#c0c0c0] block">Email</label>
            <input
                id="email"
                type="email"
                className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
             />
                </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[#c0c0c0]">Password</label>
                <input
                  id="password"
                  type="password"
                  className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[#c0c0c0] block" >Name</label>
                <input
                  id="name"
                  type="text"          
                  className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-[#c0c0c0]">Country</label>
                <Select
                  id="country"
                  options={countryOptions}
                  onChange={setSelectedCountry}
                  placeholder="Select Country"
                  isClearable
                  className="selectsearch text-[black] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-[#c0c0c0]">City</label>
              <Select
                id="city"
                options={cityOptions}
                onChange={setSelectedCity}
                placeholder="Select City"
                isClearable
                isDisabled={!selectedCountry}
                className="selectsearch text-[black] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50"
              >
                Register
              </button>
                <Link to="/login" className="hover:bg-[#1a1a1a]">
              <div className="flex justify-center">
            <button
                type="button"
                className="border-[#404040] text-[#c0c0c0] hover:border-[#8b5cf6]"
            >
                    Login
            </button>
            </div>
                </Link>

            </div>
            <div className="text-center">
              <Link to="/forgotpassword" className="text-[#808080] hover:text-[#c0c0c0]">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function MoonIcon(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="yellow"
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
>
    <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H16l5-5V5c0-1.1-.9-2-2-2z"/>
    <polyline points="16 3 16 8 21 8"/>
</svg>

  );
}
