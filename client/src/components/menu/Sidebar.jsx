import React from 'react';
import '../../css/sidebar.css'
import Logout from './Logout';

function Sidebar({ userData }) {
  return (
    <div className="sidebar">
      {userData ? (
        <div>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p><img src={userData.picture} alt="Foto de perfil" /></p>
          <Logout></Logout>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default Sidebar;
