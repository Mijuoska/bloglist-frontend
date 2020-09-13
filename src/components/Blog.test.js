

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'


describe('Blog listing', () => {
let component

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
fireEvent.click(button);

expect(div).not.toHaveStyle(
    'display: none'
)

})

test('Clicking the Like button twice will call the event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} likeBlog={mockHandler}/>
           )

    const button = component.getByText('Like');
    fireEvent.click(button);
    fireEvent.click(button);



    expect(mockHandler.mock.calls).toHaveLength(2)


})


})

