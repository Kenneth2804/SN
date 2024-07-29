import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../redux/actions/index'; 
import Swal from 'sweetalert2';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      const tokenData = parseJwt(token);
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;

      if (timeLeft > 180000) {
        setTimeout(() => showModal(timeLeft - 180000), timeLeft - 180000);
        setTimeRemaining(timeLeft - 180000);
      } else {
        showModal(timeLeft);
        setTimeRemaining(timeLeft);
      }
    }
  }, [dispatch, navigate]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleKeepSession = () => {
    dispatch(refreshToken());
    Swal.close();
  };

  const handleEndSession = () => {
    localStorage.removeItem('token');
    navigate('/');
    Swal.close();
  };

  const showModal = (timeLeft) => {
    Swal.fire({
      title: '¿Quiere mantener la sesión?',
      html: `<div class="text-3xl font-bold">${Math.ceil(timeLeft / 1000)} <span class="text-lg">segundos</span></div>`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleKeepSession();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleEndSession();
      }
    });
  };

  return (
    <div>
      {children}
    </div>
  );
};

export default AuthWrapper;
