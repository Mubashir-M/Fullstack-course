import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'


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
  const handleLogOut = () => {
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



  const likesUpdate = async (event) => {
    event.preventDefault()
    const blog = blogs.find(blog => blog.id === event.target.value)
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
        .then((returnedBlog) => {
          setSuccessMessage(`Incremented like count for blog ${blog.title} to ${blog.likes}`)
          console.log(returnedBlog)
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

  const removeBlog = (event) => {
    event.preventDefault()
    const blog = blogs.find(blog => blog.id === event.target.value)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      const removedBlog = blog
      try{
        blogService
          .remove(blog)
          .then(returnedBlog => {
            console.log(returnedBlog)
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
        title = {title}
        author = {author}
        url = {url}
        changeTitle = { (event) => setTitle (event.target.value)}
        changeAuthor = { (event) => setAuthor (event.target.value)}
        changeUrl = { (event) => setUrl (event.target.value)}
        createBlog = {createBlog}
        successMessage= {successMessage}
        errorMessage= {errorMessage}
      />
    </Togglable>
  )


  return (
    <div>

      <Notification errorMessage={errorMessage} successMessage ={successMessage} />
      {user === null ?
        <LoginForm setUsername = {setUsername} setPassword = {setPassword} handleLogin = {handleLogin} username = {username} password = {password}/> :
        <div>
          <h2>blogs</h2>
          <h4>{user.name} has logged in <button onClick = {handleLogOut}>logout</button></h4>
          {blogForm()}
          {blogs.sort((blog1,blog2) => blog2.likes-blog1.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user = {user} likesUpdate =  {likesUpdate} removeBlog = {removeBlog}/>)
          }
        </div>
      }
    </div>
  )

}

export default App