let env = Cypress.env("environment");
let login = "3hrsforsleep"
let password = "123456789"

describe('Header-links checking', () => {

  if (env == "staging") {
    login = "3hrsforsleep";
    password = "123456789";
  } else {
    login = "3hrsforsleep";
    password = "tydamurabepaw3*";
  }


    beforeEach(() => {
      cy.visit('/login')
      cy.loginOnUi(login, password)
    })

    it.only('Click Main Button', () => {
      cy.displayingElement('.nav-item [aria-current="page"]'),
      cy.get('.nav-item [aria-current="page"]').click(),
      cy.displayingElement('.nav-item [aria-current="page"]')
    }),

    it('Click Task Button', () => {
      cy.displayingElement('#entity-menu'),
      cy.get('#entity-menu').click(),
      cy.get('#entity-menu [role="menuitem"]').contains('Task').click(),
      cy.get('#task-heading').contains('Tasks'),
      cy.displayingElement('#jh-create-entity')
    }),

    it('Click User Task Button', () => {
      cy.displayingElement('#entity-menu'),
      cy.get('#entity-menu').click(),
      cy.get('#entity-menu [role="menuitem"]').contains('User Task').click(),
      cy.get('#user-task-heading').contains('User Tasks'),
      cy.displayingElement('#jh-create-entity')
    }),

    it('Click API Button', () => {
      cy.displayingElement('#docs-menu'),
      cy.get('#docs-menu').click(),
      cy.get('#docs-menu [role="menuitem"]').should('have.attr', 'href', '/docs/docs').click(),
      cy.displayingElement('[data-cy="swagger-frame"]')
    }),

    it('Click English Button', () => {
      cy.displayingElement('[data-icon="flag"]'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"]').contains('English').click(),
      cy.get('#header-tabs').contains('English')
    }),

    it('Click Francais Button', () => {
      cy.displayingElement('[data-icon="flag"]'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Français').click(),
      cy.get('#header-tabs').contains('Français')
    }),

    it('Click Ukranian Button', () => {
      cy.displayingElement('[data-icon="flag"]'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Українська').click(),
      cy.get('#header-tabs').contains('Українська')
    }),

    it('Click Russian Button', () => {
      cy.displayingElement('[data-icon="flag"]'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Русский').click(),
      cy.get('#header-tabs').contains('Русский')
    }),

    it('Click Settings Button', () => {

      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Настройки').click(),
      cy.displayingElement('#settings-title')
    })

    it('Click Password Button', () => {
      cy.displayingElement('#account-menu'),
      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Пароль').click(),
      cy.displayingElement('#password-title')
    })

    it('Click Exit Button', () => {
      cy.displayingElement('#account-menu'),
      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Выйти').click(),
      cy.get('#app-view-container').contains('Logged out successfully!')
    })
  })
  