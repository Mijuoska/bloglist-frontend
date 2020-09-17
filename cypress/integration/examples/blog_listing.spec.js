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