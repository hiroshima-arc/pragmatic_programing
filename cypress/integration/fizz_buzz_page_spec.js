describe('FizzBuzz Page', function() {
  it('successfully loads', function() {
    cy.visit('http://localhost:8080') // change URL to match your dev URL
    cy.get('h2').should('contain', 'FizzBuzz')
  })
})
