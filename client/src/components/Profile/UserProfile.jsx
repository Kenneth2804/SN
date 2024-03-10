import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/index'; 
import "../../css/UserProfile.css"
import EditProfile from './EditProfile.jsx';
import { FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Sidebar } from '../menu/Sidebar.jsx';

const UserProfile = ({userData} ) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const homeData = useSelector((state) => state.homeData);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <Sidebar userData={userProfile}></Sidebar>
      
    <div className="user-profile">
      <Link to={"/edit"} className='edit'>
      <FaUserEdit  style={{ color: 'black', fontSize: '24px' }} />
      </Link>
<img src={userProfile.picture} alt="Imagen del perfil" />
      <p>Nombre: {userProfile.name}</p>
      <p>{userProfile.originCountry}</p>
      <p>{userProfile.originCity}</p>
      
      <div className="comments-section">
        <h2>Comentarios</h2>
        {userProfile.comments && userProfile.comments.length > 0 ? (
          userProfile.comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment.texto}
            </div>
          ))
          ) : (
            <p>No tiene contenido</p>
            )}
      </div>
    </div>
            </div>
  );
};

export default UserProfile;
