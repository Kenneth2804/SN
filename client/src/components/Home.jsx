import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../redux/actions/index';
import Sidebar from './menu/Sidebar';
import { useNavigate } from 'react-router-dom'; 
import GetComments from './Comments/GetComments';
import CreateComments from './Comments/CreateComments';

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

  return (
    <div>
      <Sidebar userData={homeData} />
      <CreateComments></CreateComments>
      <GetComments></GetComments>
    </div>
  );
}
