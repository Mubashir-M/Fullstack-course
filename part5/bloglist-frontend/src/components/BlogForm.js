import React from 'react'

const BlogForm = ({
  title, author, url,
  changeTitle, changeAuthor, changeUrl,
  createBlog
}) => {


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {createBlog}>
        <div>
            title:
          <input
            id = 'title'
            type = "text"
            value = {title}
            name = "Title"
            onChange = { changeTitle }
          />
        </div>
        <div className = 'author'>
            author:
          <input
            id = 'author'
            type = "text"
            value = {author}
            name = "Author"
            onChange = { changeAuthor }
          />
        </div>
        <div className = 'url'>
            url:
          <input
            id = 'url'
            type = "text"
            value = {url}
            name = "Url"
            onChange = { changeUrl }
          />
        </div>
        <button id = 'create-button' type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm