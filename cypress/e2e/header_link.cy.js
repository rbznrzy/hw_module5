
describe('', () => {
    beforeEach(() => {
      cy.visit('/login')
      cy.get('#username').click().type('3hrsforsleep'),
      cy.get('#password').click().type('tydamurabepaw3*'),
      cy.get('[data-cy="submit"]').click(),
      cy.get('[data-cy="navbar"]').should('be.visible')
    })

    it('Click Main Button', () => {
      cy.get('.nav-item [aria-current="page"]').should('be.visible'),
      cy.get('.nav-item [aria-current="page"]').click(),
      cy.get('.nav-item [aria-current="page"]').should('be.visible')
    }),

    it('Click Task Button', () => {
      cy.get('#entity-menu').should('be.visible'),
      cy.get('#entity-menu').click(),
      cy.get('#entity-menu [role="menuitem"]').contains('Task').click(),
      cy.get('#task-heading').contains('Tasks'),
      cy.get('#jh-create-entity').should('be.visible')
    }),

    it('Click User Task Button', () => {
      cy.get('#entity-menu').should('be.visible'),
      cy.get('#entity-menu').click(),
      cy.get('#entity-menu [role="menuitem"]').contains('User Task').click(),
      cy.get('#user-task-heading').contains('User Tasks'),
      cy.get('#jh-create-entity').should('be.visible')
    }),

    it('Click API Button', () => {
      cy.get('#docs-menu').should('be.visible'),
      cy.get('#docs-menu').click(),
      cy.get('#docs-menu [role="menuitem"]').should('have.attr', 'href', '/docs/docs').click(),
      cy.get('[data-cy="swagger-frame"]').should('be.visible')
    }),

    it('Click English Button', () => {
      cy.get('[data-icon="flag"]').should('be.visible'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"]').contains('English').click(),
      cy.get('#header-tabs').contains('English')
    }),

    it('Click Francais Button', () => {
      cy.get('[data-icon="flag"]').should('be.visible'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Français').click(),
      cy.get('#header-tabs').contains('Français')
    }),

    it('Click Ukranian Button', () => {
      cy.get('[data-icon="flag"]').should('be.visible'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Українська').click(),
      cy.get('#header-tabs').contains('Українська')
    }),

    it('Click Russian Button', () => {
      cy.get('[data-icon="flag"]').should('be.visible'),
      cy.get('[data-icon="flag"]').click(),
      cy.get('[role="menu"').contains('Русский').click(),
      cy.get('#header-tabs').contains('Русский')
    }),

    it('Click Settings Button', () => {
      cy.get('#account-menu').should('be.visible'),
      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Настройки').click(),
      cy.get('#settings-title').should('be.visible')
    })

    it('Click Password Button', () => {
      cy.get('#account-menu').should('be.visible'),
      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Пароль').click(),
      cy.get('#password-title').should('be.visible')
    })

    it('Click Exit Button', () => {
      cy.get('#account-menu').should('be.visible'),
      cy.get('#account-menu').click(),
      cy.get('[role="menu"]').contains('Выйти').click(),
      cy.get('#app-view-container').contains('Logged out successfully!')
    })
  })
  