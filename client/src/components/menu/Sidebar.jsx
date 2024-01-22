import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../css/sidebar.css';
import Logout from './Logout';

function Sidebar({ userData }) {
  return (
    <div className="sidebar">
      {userData ? (
        <div>
          <Link to="/profile">{userData.name}</Link> 
          <p>{userData.email}</p>
          <p><img src={userData.picture} alt="Foto de perfil" /></p>
          <Logout />
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default Sidebar;
