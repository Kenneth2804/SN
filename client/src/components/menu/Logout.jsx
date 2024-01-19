import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';
import { useNavigate, useLocation } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Obtenemos la ubicación actual

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); // Borra la información del usuario
    dispatch(logout()); // Llama a tu acción de logout si es necesario

    // Si la ubicación actual es "/" (página de inicio), redirige al usuario a la página de inicio
    if (location.pathname === '/') {
      navigate('/');
    } else {
      // Si la ubicación actual es "/home" (u otra ruta), no permitas retroceder
      // Puedes mostrar un mensaje de error o redirigir a la página de inicio
      navigate('/');
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className='bn32'>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Logout;
