describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Miika Kallasoja',
            username: 'mijuoska',
            password: '123abc'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to blog listing app')
        cy.contains('username')
        cy.contains('password')
    })
    
})

describe('Login', function () {

    it('Login succeeds with right credentials', function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('mijuoska')
        cy.get('#password').type('123abc')
        cy.get('#login-button').click()
        cy.contains('Hi Miika Kallasoja!');
        cy.contains('Blog listing')
    })

    it('Login fails with wrong credentials', function () {
         cy.visit('http://localhost:3000')
         cy.get('#username').type('nobody')
         cy.get('#password').type('xyz')
         cy.get('#login-button').click()
         cy.get('.error').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })

})

describe('When logged in', function () {
            beforeEach(function () {
                cy.visit('http://localhost:3000')
                cy.get('#username').type('mijuoska')
                cy.get('#password').type('123abc')
                cy.get('#login-button').click()
                 cy.contains('Hi Miika Kallasoja!');
                 cy.contains('Blog listing')
            })
            it('A blog can be added', function () {
                cy.visit('http://localhost:3000')
                cy.contains('new Blog').click()
                cy.get('#title').type('How to do E2E testing')
                cy.get('#author').type('Cypress')
                cy.get('#url').type('testing.com')
                cy.contains('Create').click()
                cy.get('.success')
                cy.contains('How to do E2E testing by Cypress')
            })
            it('A blog can be liked', function () {
                cy.contains('Show').click()
                cy.contains('Likes')
                cy.contains('Like').click()
                cy.contains('Likes: 1')
            })

})