import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { requestPasswordReset, resetPassword } from "../../redux/actions/index.js"; 
import { Link, useNavigate } from "react-router-dom";
import postit from "../../images/postit.png";
import "../../css/Login.css"; // Assuming you have a similar CSS file

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRequestReset = async (event) => {
    event.preventDefault();
    try {
      await dispatch(requestPasswordReset(email));
      Swal.fire({
        title: 'Success!',
        text: 'If there is an account associated with this email, a reset password link has been sent.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error("Error during password reset request:", error);
      setErrorMessage("There was an issue sending the reset email. Please try again.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await dispatch(resetPassword(email, verificationCode, newPassword));
      Swal.fire({
        title: 'Password Reset Successfully',
        icon: 'success',
        confirmButtonText: 'Login'
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      console.error("Error during password reset:", error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      {/* Form section */}
      <div className="bg-[#0f0f0f] flex flex-col items-center justify-center px-8 py-12 md:px-16 md:py-24 order-first md:order-last w-full">
      <div className="max-w-md space-y-6 w-full"> 
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#c0c0c0]">Reset Your Password</h2>
            <p className="text-[#a0a0a0] text-lg">Enter your email to receive a verification code.</p>
          </div>
          <form onSubmit={handleRequestReset} className="space-y-4">
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
            <button
              type="submit"
              className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50"
            >
              Send Code
            </button>
          </form>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-[#c0c0c0] block">Verification Code</label>
              <input
                id="verificationCode"
                type="text"
                className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-[#c0c0c0] block">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50"
            >
              Change Password
            </button>
            <div className="text-center">
              <Link to="/login" className="text-[#808080] hover:text-[#c0c0c0]">
                Back to Login
              </Link>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>

      {/* Welcome section */}
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-8 py-12 md:px-16 order-last md:order-first">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-4">
            <MoonIcon className="w-8 h-8 text-[#c0c0c0]" />
            <h1 className="text-3xl font-bold text-[#c0c0c0]">Welcome to SECRET NOTES</h1>
          </div>
          <p className="text-[#a0a0a0] text-lg">
            Step into the enigmatic world of Whispering Shadows, where hidden secrets and clandestine messages intertwine.
          </p>
          <img src={postit} alt="Dreamscape Landscape" className="rounded-2xl shadow-lg" />
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
      <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H16l5-5V5c0-1.1-.9-2-2-2z" />
      <polyline points="16 3 16 8 21 8" />
    </svg>
  );
}
