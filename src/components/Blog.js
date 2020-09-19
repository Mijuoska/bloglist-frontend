import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, user, removeBlog, likeBlog }) => {




  return (

    <div className='blog'>
      {blog.title} by {blog.author}
      <Togglable buttonLabel='Show'>
        <p>
   URL: {blog.url}
        </p>
        <p>
   Likes: {blog.likes} <button id={blog.id} onClick={likeBlog}>Like</button>
        </p>
        <button style={{ display: user.id === blog.user.id ? '' : 'none' }} id={blog.id} onClick={removeBlog}>Delete</button>
      </Togglable>
    </div>
  )
}

export default Blog
