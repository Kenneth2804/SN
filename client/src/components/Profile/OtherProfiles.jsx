import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../css/UserProfile.css"
import axios from 'axios';

const OtherProfiles = () => {
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/profiles/${id}`); 
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div>Cargando perfil del usuario...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Perfil de Usuario</h1>
      <img src={userData.picture} alt="Imagen del perfil" />
      <p>Nombre: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>{userData.originCountry}</p>
      <p>{userData.originCity}</p>

        <div className="comments-section">

      <h2>Comentarios</h2>
      <ul>
        {userData.comments && userData.comments.map((comment, index) => (
          <li key={index}className="comment">{comment.texto}</li> 
          ))}
      </ul>
          </div>
    </div>
  );
};

export default OtherProfiles;
