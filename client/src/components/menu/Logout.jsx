import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/';
  };
  

  return (
    <div>
      <button onClick={handleLogout} className='bn32'>Cerrar sesión</button>
    </div>
  );
};

export default Logout;