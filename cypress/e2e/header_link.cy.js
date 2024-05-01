let navBarElements = require('../fixture/pages/navBarElements.json')

let env = Cypress.env("environment");
let login = "3hrsforsleep";
let password = "123456789";

describe("Header-links checking", () => {
  if (env == "staging") {
    login = "3hrsforsleep";
    password = "123456789";
  } else {
    login = "3hrsforsleep";
    password = "tydamurabepaw3*";
  }

  beforeEach(() => {
    cy.visit("/login");
    cy.loginOnUi(login, password);
  });

  it.only("Click Main Button", () => {
    cy.displayingElement(navBarElements.mainButton),
      cy.get(navBarElements.mainButton).click(),
      cy.displayingElement(navBarElements.mainButton);
  }),
    it("Click Task Button", () => {
      cy.displayingElement(navBarElements.entityMenu),
        cy.get(navBarElements.entityMenu).click(),
        cy.get(navBarElements.tasksbutton).contains("Task").click(),
        cy.get("#task-heading").contains("Tasks"),
        cy.displayingElement("#jh-create-entity");
    }),
    it("Click User Task Button", () => {
      cy.displayingElement(navBarElements.entityMenu),
        cy.get(navBarElements.entityMenu).click(),
        cy.get(navBarElements.tasksbutton).contains("User Task").click(),
        cy.get("#user-task-heading").contains("User Tasks"),
        cy.displayingElement("#jh-create-entity");
    }),
    it("Click API Button", () => {
      cy.displayingElement(navBarElements.docsMenu),
        cy.get(navBarElements.docsMenu).click(),
        cy.get(navBarElements.apiButton)
          .should("have.attr", "href", "/docs/docs")
          .click(),
        cy.displayingElement('[data-cy="swagger-frame"]');
    }),
    it("Click English Button", () => {
      cy.displayingElement(navBarElements.localizationButton),
        cy.get(navBarElements.localizationButton).click(),
        cy.get(navBarElements.menuButton).contains("English").click(),
        cy.get(navBarElements.headerTabs).contains("English");
    }),
    it("Click Francais Button", () => {
      cy.displayingElement(navBarElements.localizationButton),
        cy.get(navBarElements.localizationButton).click(),
        cy.get(navBarElements.menuButton).contains("Français").click(),
        cy.get(navBarElements.headerTabs).contains("Français");
    }),
    it("Click Ukranian Button", () => {
      cy.displayingElement(navBarElements.localizationButton),
        cy.get(navBarElements.localizationButton).click(),
        cy.get(navBarElements.menuButton).contains("Українська").click(),
        cy.get(navBarElements.headerTabs).contains("Українська");
    }),
    it("Click Russian Button", () => {
      cy.displayingElement(navBarElements.localizationButton),
        cy.get(navBarElements.localizationButton).click(),
        cy.get(navBarElements.menuButton).contains("Русский").click(),
        cy.get(navBarElements.headerTabs).contains("Русский");
    }),
    it("Click Settings Button", () => {
      cy.get(navBarElements.accountMenu).click(),
        cy.get(navBarElements.menuButton).contains("Настройки").click(),
        cy.displayingElement("#settings-title");
    });

  it("Click Password Button", () => {
    cy.displayingElement(navBarElements.accountMenu),
      cy.get(navBarElements.accountMenu).click(),
      cy.get(navBarElements.menuButton).contains("Пароль").click(),
      cy.displayingElement("#password-title");
  });

  it("Click Exit Button", () => {
    cy.displayingElement(navBarElements.accountMenu),
      cy.get(navBarElements.accountMenu).click(),
      cy.get(navBarElements.menuButton).contains("Выйти").click(),
      cy.get("#app-view-container").contains("Logged out successfully!");
  });
});
