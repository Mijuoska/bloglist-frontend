

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

beforeEach(()=> {
  component = render(
        <Blog blog={blog} user={user}/>
           )
})


test('Title and author are displayed', () => {
    expect(component.container).toHaveTextContent(
        'My Test Blog by Miika Kallasoja'
    )
})

test('At start URL and likes are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    

})

test('URL and likes are displayed on click', () => {
const div = component.container.querySelector('.togglableContent')

const button = component.getByText('Show');
fireEvent.click(button);

expect(div).not.toHaveStyle(
    'display: none'
)


})




})

