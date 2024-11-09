import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/index';
import { types } from '../../redux/actions';
import axios from 'axios';

export default function CreateComments() {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [to, setTo] = useState("");  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [comments, setComments] = useState([]);

  const userId = useSelector((state) => state.homeData); 

  
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      dispatch({ type: types.SET_USER_EMAIL, payload: storedEmail });
    }

  }, [dispatch]);

 
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
      setAudioChunks([]);
    }

    const formData = new FormData();
    formData.append('texto', commentText);
    formData.append('to', to);  
    if (audioBlob) {
      formData.append('audio', audioBlob, 'audio.wav');
    }

    try {
      await dispatch(createComment(formData));
      setCommentText("");
      setTo("");  
      setIsPopupOpen(true);
      window.location.reload(); 
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="bg-[#FFFBEB] border-8 border-[#FFCC00] rounded-2xl shadow-xl p-8 w-[300px] right-[10vh] sm:w-[400px] transform rotate-[2deg] hover:rotate-0 transition-transform duration-300 relative">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <label htmlFor="name" className="text-lg font-medium">
            From
          </label>
          <input id="name" className="w-full" value={userId?.name} disabled/>
        </div>
        <div className="mr-4">
          <label htmlFor="to" className="text-lg font-medium">
            To
          </label>
          <input 
            id="to" 
            placeholder="Para quién ?" 
            value={to}
            onChange={(e) => setTo(e.target.value)} 
            className="w-full" 
          />
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <button 
          variant="secondary" 
          size="md" 
          className={`px-6 py-3 rounded-full 
                      ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-black-600'} 
                      text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? 'Detener grabación' : 'Grabar comentario'}
        </button>
      </div>
      <textarea
        id="comment"
        placeholder="Escribe un comentario"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={4}
        className="w-full h-24 resize-none rounded-lg mb-6"
      />
      <div className="flex justify-end">
        <button 
          className="px-6 py-3 rounded-full" 
          onClick={handleCommentSubmit}
        >
          Enviar comentario
        </button>
      </div>
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
