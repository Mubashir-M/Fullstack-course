import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title,setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
 

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
        const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('login successful')
      console.log(successMessage)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000) 
    } catch (exception) {
      setErrorMessage('wrong username of password')
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogOut = () =>{
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title : title,
      author: author,
      url : url,
    }  
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added `)
        console.log(successMessage)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })        
  }

  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit = {handleLogin}>
          <div>
            username
            <input
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type = "text"
            value = {password}
            name = "Password"
            onChange = {({target}) => setPassword(target.value)}
            />
          </div>
          <button type = "submit">login</button>
        </form>
      </div>
  )

  const likesUpdate = async (blog) => {

    try {
      const newBlog = {
        title : blog.title,
        author: blog.author,
        url : blog.url,
        likes: blog.likes+1,
        user:blog.user.id,
        id: blog.id
        
      }
      
      await blogService
        .update(newBlog)
        .then(returnedBlog => {
          setSuccessMessage(`Incremented like count for blog ${blog.title} to ${blog.likes}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          
        })
        updateBlogs()
    } catch (error) {
      setErrorMessage(error)
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
       
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      const removedBlog = blog
      try{
          blogService
          .remove(blog)
          .then(returnedBlog => {
            updateBlogs()
            })
          setSuccessMessage(`removed blog ${removedBlog.title} `)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        } catch (error){
          setErrorMessage(error)
          console.log(error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }
  }
 
 
  const blogForm = () => (
    <Togglable buttonLabel ='new blog' blogs = {blogs} user = {user} likesUpdate = {likesUpdate} removeBlog = {removeBlog} >
      <BlogForm
        user = {user}
        title = {title}
        author = {author}
        url = {url}
        blogs = {blogs}
        setTitle = {setTitle}
        setAuthor = {setAuthor}
        setUrl = {setUrl}
        setBlogs = {setBlogs}
        createBlog = {createBlog}
        handleLogout = {handleLogOut}
        successMessage= {successMessage}
        errorMessage= {errorMessage}
      />
    </Togglable>
  )
    
  

  return (
    <div>
      
    <Notification errorMessage={errorMessage} successMessage ={successMessage} />
    {user === null ? 
    loginForm() : 
    <div>
      <h2>blogs</h2>
      <h4>{user.name} has logged in <button onClick = {handleLogOut}>logout</button></h4>
      {blogForm()}
    </div>
    }

    </div>
  )

}

export default App