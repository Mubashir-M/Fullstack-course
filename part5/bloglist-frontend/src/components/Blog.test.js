import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const User = {
  username: 'mluukkai',
  name: 'Matti Kuukkanen',
}


const testBlog = {
  title : 'Test sample title',
  author: 'sample8',
  url : 'sample8.com',
  likes: 1111,
  user:User
}


test ('renders only title and author', () => {


  const component = render (
    <Blog  blog = {testBlog} user = {User}/>
  )



  expect(component.container.querySelector('.fullBlog')).not.toBeVisible()
  expect(component.container).toHaveTextContent(
    `${testBlog.title} by ${testBlog.author}`
  )




})

test ('renders blogs url and likes count when view button is clicked', () => {

  const component = render (
    <Blog  blog = {testBlog} user = {User}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent(
    `likes ${testBlog.likes}`
  )

  expect(component.container.querySelector('.fullBlog')).toBeVisible()

})

test ('if like button is clicked twice, the event handler the component received as props is called twice.',() => {

  const mockhandler = jest.fn()

  const component = render (
    <Blog  blog = {testBlog} user = {User} likesUpdate = {mockhandler}/>
  )

  const like_Button = component.getByText('like')
  fireEvent.click(like_Button)
  fireEvent.click(like_Button)

  expect(mockhandler.mock.calls).toHaveLength(2)


})

test ('should check, that the form calls the event handler it received as props with the right details when a new blog is created', () => {

  const mockhandler = jest.fn()
  const component = render (
    <Blog  blog = {testBlog} user = {User} likesUpdate = {mockhandler}/>
  )
  const full_Blog = component.container.querySelector('.fullBlog')
  expect(full_Blog).toHaveStyle('display: none')

  const blog_Title = component.getByText('Test sample title by sample8')
  fireEvent.click(blog_Title)
  expect(blog_Title).toHaveStyle('')


})