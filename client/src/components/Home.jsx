import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.homeData);

  useEffect(() => {
    dispatch(home());
  }, [dispatch]);

  return (
    <div>
      {homeData ? (
        <div>
          <p>Nombre:  {homeData.name}</p>
          <p>Email: {homeData.email}</p>
          <p>Foto: <img src={homeData.picture} alt="Foto de perfil" /></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
