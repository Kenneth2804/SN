import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/index';
import { types } from '../../redux/actions'; // Importa los tipos de acción

export default function CreateComments() {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");
  
    const handleCommentSubmit = () => {
      dispatch(createComment({ texto: commentText }));
      setCommentText(""); 
    };

    useEffect(() => {
      // En tu componente principal o en un componente de inicio
      const storedEmail = localStorage.getItem("userEmail");

      if (storedEmail) {
        // Si hay un correo electrónico almacenado, actualiza el estado con él
        dispatch({ type: types.SET_USER_EMAIL, payload: storedEmail });
      }
    }, [dispatch]);
  
    return (
      <div>
        <input
          type="text"
          placeholder="Escribe un comentario"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Enviar comentario</button>
      </div>
    );
  }
