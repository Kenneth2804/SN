import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../redux/actions';
import Sidebar from './menu/Sidebar';

export default function Home() {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.homeData);

  useEffect(() => {
    dispatch(home());
  }, [dispatch]);

  return (
    <div>
        <Sidebar userData={homeData} />
    </div>
  );
}
