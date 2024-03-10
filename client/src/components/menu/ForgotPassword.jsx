import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { requestPasswordReset, resetPassword } from "../../redux/actions/index.js"; 
import { Link, useNavigate } from "react-router-dom";
import "../../css/forgotpassword.css";

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
    <div>     
      <form onSubmit={handleRequestReset}>
        <div className="title">Reset your Password</div>
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
        <button className="submit" type="submit">Send Code</button>
      </form>
      <br></br>

      <form onSubmit={handleResetPassword}>
        <div className="inputField">
          <input
            type="text"
            placeholder="Verification Code"
            className="input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <input
            type="password"
            placeholder="New Password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit" type="submit">Change Password</button>
      </form>

      <Link to="/login" className="back-to-login">Back to Login</Link>
    </div>
  );
}
