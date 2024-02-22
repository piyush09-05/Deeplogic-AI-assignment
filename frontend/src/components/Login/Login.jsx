import React, { useState } from 'react';
import axios from '../../axiosConfig'

import "./Login.css"

import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement your login logic here using the credentials state
     
     try {
        const response = await axios.post("http://localhost:3000/signin", credentials);
        console.log(response.data.token)
        // console.log("Log in successful", response.data.token);
       
        const tokenKey = 'token';
        const existingToken = localStorage.getItem(tokenKey);
             if (!existingToken) {
               localStorage.setItem(tokenKey, response.data.token);
            }
          
        setCredentials({username:"", password:""})
        navigate("/")


     } catch (error) {
        console.error('Login failed', error.message);
     }

  };

  return (
    <div className='loginContainer'>
      <h2 className='loginTitle'>Login</h2>
      <form className='loginForm'>
        <div className='inputGroup'>
          <label htmlFor="username" className='inputLabel'>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            className='inputField'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor="password" className='inputLabel'>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className='inputField'
          />
        </div>
        <button type="button" onClick={handleLogin} className='loginButton'>
          Login
        </button>
      </form>
      <div className='signup'>
        <p>Don't have an account? <button className='signupButton' onClick={() => navigate("/signup")}>Sign Up</button></p>
      </div>
    </div>
  );
}

export default Login;
