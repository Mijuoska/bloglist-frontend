

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
    const blog = {
        id: 1,
        title: 'My Test Blog',
        author: 'Miika Kallasoja',
        user: {
            username: 'mijuoska', id: 1
        }
    }


    const user = {
        id: 1
    }


    const component = render(
        <Blog blog={blog} user={user}/>
    )


    expect(component.container).toHaveTextContent(
        'My Test Blog by Miika Kallasoja'
    )
});
