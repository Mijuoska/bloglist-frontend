import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

 const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  useEffect(() => {
 blogService.getAll().then(blogs => {
   const sorted = blogs.sort((a, b) => {
     if (a.likes > b.likes) {
       return -1
     } else if (a.likes < b.likes) {
       return 1
     } else {
       return 0
     }
   })
   setBlogs(sorted)
 })
 
}, [blogs.length])
      

        


const createBlog = async (blogObject) => {
  blogFormRef.current.toggleVisibility()
  try {
  const createdBlog = await blogService.createBlog(blogObject)
  const blogsCopy = blogs.filter(blog => blog.id !== createdBlog.id);
  setBlogs(blogsCopy.concat(createdBlog))
  setMessageType('success')
  setMessage(`Added new blog: ${createdBlog.title} by ${createdBlog.author}`)
  setTimeout(() => {
    setMessage('')
  }, 5000);
  } catch (ex) {
    setMessageType('error')
    setMessage('Something went wrong with adding a new blog')
}
}

const removeBlog = async (event) => {
  const result = window.confirm('Are you sure you want to delete this blog?')
  if (result) {
    const ID = event.target.id
    const deletedBlog = await blogService.deleteBlog(ID)
    const remainingBlogs = blogs.filter(blog => blog.id !== ID)
    setBlogs(remainingBlogs)
    setMessageType('success')
    setMessage('Deleted blog')
    setTimeout(() => {
      setMessage('')
    }, 5000);
  }

}




  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      setMessageType('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = async () => {
   setUser(null)
   window.localStorage.removeItem('loggedInUser')
  }
  


 if (user === null) {
   return (
     <div>
    <h2>Log in to blog listing app</h2>
    <Notification message={message} messageType={messageType}/>
    <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
    </div>
   )
 }
  return (
    <div>
      <h2>Blog listing</h2>
      <p>
      <span>Hi {user.name}!</span><button onClick={() => logOut()}>Logout</button>
      </p>

      <Notification message={message} messageType={messageType}/>
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
     <BlogForm createBlog={createBlog}/>
     </Togglable>
       <div>
       <h3>List of blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog}/>)}
      </div>
    </div>
  )
}
  export default App
