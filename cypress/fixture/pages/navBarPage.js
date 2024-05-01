export class navBarElements {
    elements = {
        navBar: () => cy.get('[data-cy="navbar"]'),
        headerTabs: () => cy.get('#header-tabs'),
        mainButton: () => cy.get(".nav-item [aria-current='page']"),
        entityMenu: () => cy.get('#entity-menu'),
        tasksbutton: () => cy.get("#entity-menu [role='menuitem']"),
        docsMenu: () => cy.get("#docs-menu"),
        apiButton: () => cy.get("#docs-menu [role='menuitem']"),
        localizationButton: () => cy.get("[data-icon='flag']"),
        menuButton: () => cy.get("[role='menu'"),
        accountMenu: () => cy.get('#account-menu'),
        adminMenu: () => cy.get("#admin-menu")
    }
}