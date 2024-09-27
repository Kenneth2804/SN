import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { requestPasswordReset, resetPassword } from "../../redux/actions/index.js"; 
import { Link, useNavigate } from "react-router-dom";
import postit from "../../images/postit.png"

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRequestReset = async (event) => {
    event.preventDefault();
    dispatch(requestPasswordReset(email))
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'If there is an account associated with this email, a reset password link has been sent.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch((error) => {
        console.error("Error during password reset request:", error);
        Swal.fire('Error', 'There was an issue sending the reset email. Please try again.', 'error');
      });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    dispatch(resetPassword(email, verificationCode, newPassword))
      .then(() => {
        Swal.fire({
          title: 'Password Reset Successfully',
          icon: 'success',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      })
      .catch((error) => {
        console.error("Error during password reset:", error);
        Swal.fire('Error', 'Failed to reset password. Please try again.', 'error');
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="bg-[#1a1a1a] flex flex-col items-center justify-center px-8 py-12 md:px-16 md:py-24">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-4">
            <MoonIcon className="w-8 h-8 text-[#c0c0c0]" />
            <h1 className="text-3xl font-bold text-[#c0c0c0]">Welcome to SecretNotes</h1>
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
            <button className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50 w-1/2 rounded-lg h-8 " type="submit">
              Send Code
            </button>
          </form>

          <form onSubmit={handleResetPassword} className="space-y-4 mt-8">
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-[#c0c0c0] block">Verification Code</label>
              <input
                id="verificationCode"
                type="text"
                placeholder="Enter code"
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
                placeholder="Enter new password"
                className="bg-[#1a1a1a] border-[#404040] text-[#c0c0c0] placeholder-[#808080] focus:ring-4 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] w-full p-2 sm:p-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-[#8b5cf6] text-[#c0c0c0] hover:bg-[#7c3aed] shadow-lg shadow-[#8b5cf6]/50 w-65 rounded-lg h-8" type="submit">
                Change Password
              </button>
              <Link
                to="/login"
                className="inline-block w-full text-center text-[#808080] hover:text-[#c0c0c0] flex justify-center"
              >
                Back to Login
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
