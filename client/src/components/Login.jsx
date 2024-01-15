import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postuser } from "../redux/actions/index.js";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "../css/LandingView.css"


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
     const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const user = { email, password, name };

        const response = await dispatch(postuser(user));
      
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Welcome! Enjoy your new account',
            showConfirmButton: false,
            timer: 1500
          });
          setRedirect(true);
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Registration failed!',
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
 
    if (redirect) {
      return navigate("/login")
    }
  
    return (
      <div>     
        <form onSubmit={handleSubmit}>
          <div className="title">Welcome</div>
          <div className="subtitle">
            <p> Want an account?</p>
            <p> well let's create one! just fill out the form</p>
          </div>
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
            <div className="cut"></div>
          </div>
          <div className="inputField">
            <input
              type="name"
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
  
        
          <button className="submit" type="submit">Register</button>
          <p><h2>or</h2></p>
          <Link to={"/login"}>
            <button className="submit" type="submit">Login</button>
          </Link>
          <Link>
  <p className="terms">Terms and conditions</p>
          </Link>
        </form>
      </div>
    );
  };