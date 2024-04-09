
describe('Checking that website is loaded', () => {
    before(() => {
      cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com/')
    })
  
    it('Nav-bar displaying', () => {
      cy.get('[data-cy="navbar"]').should('be.visible')
    })

  })
  