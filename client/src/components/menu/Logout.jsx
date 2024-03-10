import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';
import { MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Obtenemos la ubicación actual

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    dispatch(logout());

    if (location.pathname === '/') {
      navigate('/');
    } else {
    
      navigate('/');
    }
  };

  return (
    <div>
      <a onClick={handleLogout} className='logout-link '>
      <MdLogout style={{ color: 'red', fontSize: '30px', cursor:'pointer' }}/>
      </a>
    </div>
  );
};

export default Logout;
