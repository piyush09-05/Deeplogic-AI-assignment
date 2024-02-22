import React, { useState } from 'react'
import axios from '../../axiosConfig'

import {useNavigate} from "react-router-dom";


import "./CreatePost.css"

function CreatePost() {

    const navigate = useNavigate();

    const[title, setTitle]  = useState("");
    const[description, setDescription]  = useState("");
    const[image_link, setImageLink]  = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/create", {
                title,
                description,
                image_link
            })

           
            navigate("/");
            
        } catch (error) {
            console.log("Post failed", error)
        }

    }
  return (
    <div className='container'>
        <div className='navbar'>
        <button className =  'homeButton' onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/schedule")}  className='scheduleButton'>Schedule a Post</button>
             <button onClick={handleLogout} className='logoutButton'>Logout</button>
            
        </div>
 
    <div className='formContainer'>
    <h2 className='formTitle'>Create a Post</h2>
    <form onSubmit={handleSubmit} className='createForm'>
        <div className='formGroup'>
            <label htmlFor="title" className='formLabel'>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='formInput' />
        </div>
        <div className='formGroup'>
            <label htmlFor="description" className='formLabel'>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='formInput' />
        </div>
        <div className='formGroup'>
            <label htmlFor="image_link" className='formLabel'>Image Link:</label>
            <input type="text" value={image_link} onChange={(e) => setImageLink(e.target.value) } className='formInput' />
        </div>
        <button type='submit' className='formButton'>Create Post</button>
    </form>
</div>
</div>

  )
}

export default CreatePost