

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog listing', () => {

 const blog = {
     id: 1,
     title: 'My Test Blog',
     author: 'Miika Kallasoja',
     url: 'test.com',
     likes: 1,
     user: {
         username: 'mijuoska',
         id: 1
     }
 }


 const user = {
     id: 1
 }



test('Title and author are displayed', () => {
 const component = render(
        <Blog blog={blog} user={user}/>
           )

    expect(component.container).toHaveTextContent(
        'My Test Blog by Miika Kallasoja'
    )
})

test('At start URL and likes are not displayed', () => {
 const component = render(
        <Blog blog={blog} user={user}/>
           )

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    

})

test('URL and likes are displayed on click', () => {
     const component = render(
        <Blog blog={blog} user={user}/>
           )
const div = component.container.querySelector('.togglableContent')

const button = component.getByText('Show');
fireEvent.click(button)

expect(div).not.toHaveStyle(
    'display: none'
)

})

test('Clicking the Like button twice will call the event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} likeBlog={mockHandler}/>
           )

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)


    expect(mockHandler.mock.calls).toHaveLength(2)


})

test('Blog form is submitted with correct info', () => {
    const createBlog = jest.fn()
    const component =  render(<BlogForm createBlog={createBlog}/>)
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputURL = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, 
        {target: {value: "This is a test created by Jest"}
    })
      fireEvent.change(inputAuthor, {
          target: { value: "Jest"}
      })
    
        fireEvent.change(inputURL, 
        {target: {value: "jest.com"}
        })

    fireEvent.submit(form)
    
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("This is a test created by Jest")
    expect(createBlog.mock.calls[0][0].author).toBe("Jest")
    expect(createBlog.mock.calls[0][0].url).toBe("jest.com")




})

})

