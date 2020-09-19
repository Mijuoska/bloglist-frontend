import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, user, removeBlog }) => {

  const [renderedBlog, renderBlog] = useState(blog)

 const likeBlog = async (event, blog) => {
   const updatedBlog = await blogService.updateBlog(event.target.id, {
     ...blog,
     likes: 1
   })
   renderBlog(updatedBlog)
 }



  return (

    <div className='blog'>
      {renderedBlog.title} by {renderedBlog.author}
      <Togglable buttonLabel='Show'>
        <p>
   URL: {renderedBlog.url}
        </p>
        <p>
   Likes: {renderedBlog.likes} <button id={renderedBlog.id} onClick={likeBlog}>Like</button>
        </p>
        <button style={{ display: user.id === blog.user.id ? '' : 'none' }} id={renderedBlog.id} onClick={removeBlog}>Delete</button>
      </Togglable>
    </div>
  )
}

export default Blog
