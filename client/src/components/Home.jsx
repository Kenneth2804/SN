import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../redux/actions/index';
import { Sidebar } from './menu/Sidebar.jsx';
import { useNavigate } from 'react-router-dom'; 
import GetComments from './Comments/GetComments';
import CreateComments from './Comments/CreateComments';
import Popup from './general/Popup';
import RandomUsers from './Profile/RandomUsers';
import '../css/createcomments.css';
import AuthWrapper from './token/AuthWrapper.jsx';


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
  
  const styles = {
    contentLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '20vh'
    },
  };

  return (
    <div>
      <Sidebar userData={homeData} />
      <AuthWrapper>

      <button 
        className="bg-[#1a1a1a] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#2a2a2a] transition-colors createcomment" 
        onClick={openCreateComments}
        >
        <PencilIcon className="w-5 h-5" />
        CREA TU COMENTARIO
      </button>
      <div style={styles.contentLayout}>
        <GetComments />
        <RandomUsers />
      </div>
      <Popup
        isOpen={isCreateCommentsOpen}
        onClose={closeCreateComments}
        component={<CreateComments />}
        />

        </AuthWrapper>
    </div>
  );
}

function PencilIcon(props) {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
