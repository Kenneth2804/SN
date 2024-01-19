import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../redux/actions/index';
import Sidebar from './menu/Sidebar';
import { useNavigate } from 'react-router-dom'; 
import GetComments from './Comments/GetComments';
import CreateComments from './Comments/CreateComments';
import Popup from './general/Popup';

export default function Home() {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.homeData);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      dispatch(home());
    }
  }, [dispatch, navigate]);

  const [isCreateCommentsOpen, setIsCreateCommentsOpen] = useState(false);

  const openCreateComments = () => {
    setIsCreateCommentsOpen(true);
  };

  const closeCreateComments = () => {
    setIsCreateCommentsOpen(false);
  };

  return (
    <div>
      <Sidebar userData={homeData} />
      <button onClick={openCreateComments}>Mostrar CreateComments</button>
      <GetComments />
      <Popup
        isOpen={isCreateCommentsOpen}
        onClose={closeCreateComments}
        component={<CreateComments />}
      />
    </div>
  );
}
