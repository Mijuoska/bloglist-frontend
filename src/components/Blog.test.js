

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'


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

     expect(component.container).toHaveTextContent(
         'URL'
     )
})


// test('URL and likes are displayed on click', () => {
//       const component = render(
//         <Blog blog={blog} user={user}/>
//            )


// component.debug()

// // const button = component.getByText('Show');
// // fireEvent.click(button);

// expect(component.container).toHaveTextContent(
//     'URL: test.com'
// )

// expect(component.container).toHaveTextContent(
//     'Likes: 1'
// )

// })

})

