  import React, { useState } from 'react'
  
   
  const BlogForm = ( { createBlog } ) => {
      const [title, setTitle] = useState('')
      const [author, setAuthor] = useState('')
      const [url, setUrl] = useState('')
      
  
    const handleBlogSubmit = async(event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  


      return (
          <div>
  <form onSubmit={handleBlogSubmit}>
  <div>
  Title: <input type="text" name="Title" value={title} onChange={({ target }) => setTitle(target.value)}/>
     </div>
     <div>
     Author: <input type="text" name="Author" value={author}  onChange={({ target }) => setAuthor(target.value)} />
     </div>
     <div>
     Url: <input type="text" name="Url" value={url} onChange={({ target }) => setUrl(target.value)}/>
     </div>
    <button type="submit">Create</button>
  </form>  
  
  </div>
)
      }

    export default BlogForm