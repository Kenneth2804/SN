import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/actions/index.js";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "../css/Login.css";

export default function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.authToken);

  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(login(email, password));

      if (response.success) {
        // Handle successful login
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Wrong Email or Password.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-8 py-12 md:px-16 md:py-24">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-4">
            <MoonIcon className="w-8 h-8 text-[#c0c0c0]" />
            <h1 className="text-3xl font-bold text-[#c0c0c0]">Welcome to Dreamfall</h1>
          </div>
          <p className="text-[#a0a0a0] text-lg">
            Immerse yourself in the ethereal realm of Dreamfall, where the boundaries between reality and fantasy blur,
            and the whispers of the cosmos guide your journey.
          </p>
          <img src="/placeholder.svg" alt="Dreamscape Landscape" className="rounded-2xl shadow-lg" />
        </div>
      </div>
      <div className="bg-[#0f0f0f] flex flex-col items-center justify-center px-8 py-12 md:px-16 md:py-24">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#c0c0c0]">Enter the Dreamfall</h2>
            <p className="text-[#a0a0a0] text-lg">Login to continue your journey.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label htmlFor="password" className="text-[#c0c0c0] block">Password</label>
              <input
                id="password"
                type="password"
                className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50"
              >
                Login
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="border-[#404040] text-[#c0c0c0] hover:bg-[#1a1a1a] hover:border-[#8b5cf6]"
                >
                  Register
                </button>
              </Link>
            </div>
            <div className="text-center">
              <Link to="/forgotpassword" className="text-[#808080] hover:text-[#c0c0c0]">
                Forgot password?
              </Link>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
            )}
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
