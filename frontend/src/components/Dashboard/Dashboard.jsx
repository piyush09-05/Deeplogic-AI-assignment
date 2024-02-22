import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import axios from "../../axiosConfig";

import {useNavigate} from 'react-router-dom'

import "./Dashboard.css"


function Dashboard() {

  const [postData, setPostData] = useState([]);

  const navigate = useNavigate();

  useEffect( () => {

    const fetchData = async () => {
      try {
        const response  = await axios.get("http://localhost:3000/getPosts");
 
        setPostData(response.data);
       
      } catch (error) {
         console.log(error);
      }


     
    }
    fetchData();
 
  }, [])
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  
  
  return (
    <div className='container'>
      <div className='navbar'>
        <div className='btn-1'>
        <button onClick={() => {
          navigate("/create")
        }}>Create a Post</button>
        <button onClick={() => {
          navigate("/schedule")
        }}>Schedule a Post</button>
        </div>
        <div className='btn-2'>
          <button onClick={handleLogout}>Logout</button>
        </div>
    
      </div>
      <div className='postContainer'>
      {postData.map(post => (
            <Post post = {post} key={post.title}/>
        ))}
      </div>
       
    </div>
  )
}

export default Dashboard