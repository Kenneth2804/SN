// En tu componente React
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../redux/actions/index';
import '../../css/Cards.css'; // Importa el archivo CSS

export default function GetComments() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.allcoment);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Comentarios</h1>
      <div className="comment-container">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <strong className="comment-name">{comment.commentname}</strong>
              <p className="comment-text">{comment.texto}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
}
