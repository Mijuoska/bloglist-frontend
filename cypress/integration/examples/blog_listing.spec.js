describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to blog listing app')
        cy.contains('username')
        cy.contains('password')
    })
})