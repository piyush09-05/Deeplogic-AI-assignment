import React from 'react'
import "./Post.css";

function Post({post}) {


  return (
    <div className='postContainer'>
      <div className='titleContainer'>
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        </div>

        <div className='imageContainer'>
        <img src={post.image_link} alt="" />
        </div>

        <div className='statsContainer'>
            <p>Likes:{post.likes}</p>
            <p>Comments:{post.comments}</p>
            <p>Share:{post.shares}</p>

        </div>
    </div>
  )
}

export default Post