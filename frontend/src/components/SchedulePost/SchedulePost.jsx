import React from 'react'
import { useState } from 'react'
import axios from "../../axiosConfig"

import "./SchedulePost.css"

import {useNavigate} from "react-router-dom";

function SchedulePost() {

    const navigate = useNavigate();

    const[title, setTitle]  = useState("");
    const[description, setDescription]  = useState("");
    const[image_link, setImageLink]  = useState("");
    const [dateTime, setDateTime] = useState('');
    const [date, setDate] = useState('');

    const handleDateChange = (event) => {
        const date = event.target.value;
        
        setDate(date);
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
       
        const dateTime = `${date}T${time}:00.000+05:30`;
    
        setDateTime(dateTime);
        console.log(dateTime);
    }
    
    const handleTimeChange = (event, date) => {
        const time = event.target.value;
        console.log(date);
        const dateTime = `${date}T${time}:00.000+05:30`;
        setDateTime(dateTime);
        console.log(dateTime);
       
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/create", {
                title,
                description,
                image_link,
                scheduledTime: dateTime

            })
            alert("Post Scheduled");
            setTitle(' ');
            setDescription(' ');
            setImageLink(' ')

            navigate("/");

            console.log("Post Created", response.data);
            
        } catch (error) {
            console.log("Post failed", error)
        }

    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      }

    return (

        <div className='container'>
        <div className='navbar'>
        <button className =  'homeButton' onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/create")} className='createbutton'>Create a Post</button>
            <button onClick={handleLogout} className='logoutButton'>Logout</button>
            
        </div>
        <div className='formContainer'>
            <h2 className='formTitle'>Schedule a Post</h2>
            <form onSubmit={handleSubmit} className='scheduleForm'>
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
                    <input type="text" value={image_link} onChange={(e) => setImageLink(e.target.value)} className='formInput' />
                </div>
                <div className='formGroup'>
                    <label htmlFor="date" className='formLabel'>Date:</label>
                    <input type="date" id="date" onChange={handleDateChange} value={date} className='formInput' />
                </div>
                <div className='formGroup'>
                    <label htmlFor="time" className='formLabel'>Time:</label>
                    <input type="time" id="time" onChange={(e) => handleTimeChange(e, date)} className='formInput' />
                </div>
                <button type='submit' className='formButton'>Schedule Post</button>
            </form>
        </div>
    </div>
    
      )
}

export default SchedulePost