import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomUsers } from '../../redux/actions/index';
import "../../css/randomuser.css"

const RandomUsers = () => {
  const dispatch = useDispatch();
  const allusersFromRedux = useSelector(state => state.allusers);
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    dispatch(getRandomUsers());
  }, [dispatch]);

  useEffect(() => {
    setAllUsers(allusersFromRedux);
  }, [allusersFromRedux]);

  return (
    <div>
      <ul>
        {allusers.map((user, index) => (
          <li className='piclist' key={index}> 
            <img className='randompic' src={user.picture} alt={`User ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomUsers;
