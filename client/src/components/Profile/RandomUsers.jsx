import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomUsers } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "../../css/randomuser.css";

const RandomUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook useNavigate
  const allusers = useSelector(state => state.allusers);

  useEffect(() => {
    dispatch(getRandomUsers());
  }, [dispatch]);

  const handleUserClick = (userId) => {
    navigate(`/profiles/${userId}`); 
  };

  return (
    <div>
      <ul>
        {allusers.map((user, index) => (
          <li className='piclist' key={index} onClick={() => handleUserClick(user.id)}> 
            <img className='randompic' src={user.picture} alt={`User ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomUsers;
