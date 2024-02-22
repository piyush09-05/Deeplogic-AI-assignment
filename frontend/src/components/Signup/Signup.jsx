import React, { useState } from 'react';
import axios from "axios"
import  {useNavigate} from "react-router-dom";

import "./Signup.css"

function Signup() {

  const navigate  = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    // Implement your signup logic here using the formData state
   

    try {
        const response = await axios.post("http://localhost:3000/signup", formData);
        localStorage.setItem("token", response.data.token);
        navigate("/");

    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div className='signupContainer'>
      <h2 className='signupTitle'>Signup</h2>
      <form className='signupForm'>
        <div className='inputGroup'>
          <label htmlFor="username" className='inputLabel'>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className='inputField'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor="firstName" className='inputLabel'>First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className='inputField'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor="lastName" className='inputLabel'>Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
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
            value={formData.password}
            onChange={handleInputChange}
            className='inputField'
          />
        </div>
        <button type="button" onClick={handleSignup} className='signupButton'>
          Sign up
        </button>
      </form>
      <div className='login'>
        <p>Already have an account? <button className='loginButton' onClick={() => navigate("/login")}>Login</button></p>
      </div>
    </div>
  );
}

export default Signup;
