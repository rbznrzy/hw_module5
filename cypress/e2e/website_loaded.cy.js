
describe('Checking that website is loaded', () => {
    before(() => {
      cy.visit('/')
    })
  
    it('Nav-bar is displaying', () => {
      cy.get('[data-cy="navbar"]').should('be.visible')
    })
  })
  