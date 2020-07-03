  import React from 'react'
  

  const BlogForm = ( { handleSubmit, title, author, url, setTitle, setAuthor, setUrl } ) => {
      return (
          <div>
  <form onSubmit={handleSubmit}>
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