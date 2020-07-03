import React, { useState } from 'react'

const Blog = ({ blog }) => {

const [visible, toggleVisibility] = useState(false)

  const margin = { marginTop: 10, padding: 3}
  const border = {border: '1px solid black', marginBottom: 4, marginTop: 8, padding: 8, width: '40%', boxShadow: '11px 13px 7px -7px rgba(0,0,0,0.75)'}
  const showDetails = {display: visible ? '' : 'none'}

return (

  <div style={{...border, ...margin}}>
    {blog.title} by {blog.author} <button onClick={() => toggleVisibility(visible ? false : true)}>{visible ? 'Hide' : 'Show'}</button>
  <div style={showDetails}>
  <p>
   URL: {blog.url} 
  </p>
  <p>
   Likes: {blog.likes} <button>Like</button>
   </p>
    </div>
    </div>
)
}

export default Blog
