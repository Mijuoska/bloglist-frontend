import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {

const [visible, toggleVisibility] = useState(false)
const [renderedBlog, renderBlog] = useState(blog)

  const margin = { marginTop: 10, padding: 3}
  const border = { border: '1px solid black', marginBottom: 4, marginTop: 8, padding: 8, width: '40%', boxShadow: '11px 13px 7px -7px rgba(0,0,0,0.75)'}
  const showDetails = {display: visible ? '' : 'none'}

const likeBlog = async(event) => {
  const updatedBlog = await blogService.updateBlog(event.target.id, {...blog, likes: 1})
  renderBlog(updatedBlog)
}

return (

  <div style={{...border, ...margin}}>
    {renderedBlog.title} by {renderedBlog.author} <button onClick={() => toggleVisibility(visible ? false : true)}>{visible ? 'Hide' : 'Show'}</button>
  <div style={showDetails}>
  <p>
   URL: {renderedBlog.url} 
  </p>
  <p>
   Likes: {renderedBlog.likes} <button id={renderedBlog.id} onClick={likeBlog}>Like</button>
   </p>
    </div>
    </div>
)
}

export default Blog
