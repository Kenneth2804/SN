import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/actions/index.js";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "../css/Login.css"

export default function Login2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authToken = useSelector((state) => state.authToken);


    useEffect(() => {
      if (authToken) {
        navigate("/home");
      }
    }, [authToken, navigate]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await dispatch(login(email, password));
  
        if (response.success) {
          // Login was successful
          // You can optionally save the token in localStorage here
        } else {
          // Login failed, display an error message
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("An error occurred during login.");
      }
    };
  
    return (
      <div className="loginviewClass">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="title">Welcome</div>
            <div className="inputField">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="inputField">
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <button className="submit" type="submit">
              Login
            </button>
  
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    );
  }