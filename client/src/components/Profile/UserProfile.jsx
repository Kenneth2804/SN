import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/index'; 

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
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Imagen: <img src={userProfile.picture} alt="Imagen del perfil" /></p>
      <div>
        <h2>Comentarios</h2>
        {userProfile.comments.map((comment, index) => (
          <p key={index}>{comment.texto}</p>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
