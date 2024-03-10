import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/actions/index.js";
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
        } else {
 
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Wrong Email or Password.");
      }
    };
  
    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="title">Welcome</div>
            <div className="subtitle">
            <p> Do you have an account?</p>
            <p> Login and have some fun!</p>
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
            </div>
  
            <button className="submit" type="submit">
              Login
            </button>
            <Link to={"/forgotpassword"}>
                    <p className="terms">Forgot your password?</p>
                </Link>
  
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    );
  }