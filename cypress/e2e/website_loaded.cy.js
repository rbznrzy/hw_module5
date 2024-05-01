import { navBarElements } from "../fixture/pages/navBarPage"

let navBarPage = new navBarElements();

describe('Checking that website is loaded', () => {
    before(() => {
      cy.visit('/')
    })
  
    it('Nav-bar is displaying', () => {
      navBarPage.elements.navBar().should('be.visible')
    })
  })
  