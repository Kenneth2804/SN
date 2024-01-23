import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/index'; 
import "../../css/UserProfile.css"

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="user-profile">
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
  );
};

export default UserProfile;
