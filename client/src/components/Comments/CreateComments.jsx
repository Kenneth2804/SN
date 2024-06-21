import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/index';
import { types } from '../../redux/actions';
import axios from 'axios';
import '../../css/inputcreator.css';

export default function CreateComments() {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      dispatch({ type: types.SET_USER_EMAIL, payload: storedEmail });
    }

    fetchComments();
  }, [dispatch]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/postcomment');
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      setAudioChunks((prev) => [...prev, event.data]);
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const handleCommentSubmit = async () => {
    let audioBlob = null;
    if (audioChunks.length > 0) {
      audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioChunks([]); // Reset audio chunks
    }

    const formData = new FormData();
    formData.append('texto', commentText);
    if (audioBlob) {
      formData.append('audio', audioBlob, 'audio.wav');
    }

    dispatch(createComment(formData));
    setCommentText("");
    setIsPopupOpen(true);
    window.location.reload();
  };

  return (
    <div className="create-comments-container">
      <div className='post-it'>
        <div className="to-from">
          <p>To: <span contenteditable="true">Nombre</span></p>
          <p>From: <span contenteditable="true">Tu Nombre</span></p>
        </div>
        <textarea
          placeholder="Escribe un comentario"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
        ></textarea>
      </div>
      <button 
        className="record-button" 
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? 'Detener grabación' : 'Grabar comentario'}
      </button>
      <button className="comment-button" onClick={handleCommentSubmit}>
        Enviar comentario
      </button>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p>{comment.texto}</p>
            {comment.audioFilePath && (
              <audio controls>
                <source src={`/${comment.audioFilePath}`} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
