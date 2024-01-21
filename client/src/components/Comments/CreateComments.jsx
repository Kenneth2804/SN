import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/index';
import { types } from '../../redux/actions';
import '../../css/inputcreator.css';

export default function CreateComments() {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCommentSubmit = () => {
    dispatch(createComment({ texto: commentText }));
    setCommentText("");
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      dispatch({ type: types.SET_USER_EMAIL, payload: storedEmail });
    }
  }, [dispatch]);

  return (
    <div className="create-comments-container">
      <textarea
        className="comment-input"
        placeholder="Escribe un comentario"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={4} 
      />
      <button className="comment-button" onClick={handleCommentSubmit}>
        Enviar comentario
      </button>
    </div>
  );
}
