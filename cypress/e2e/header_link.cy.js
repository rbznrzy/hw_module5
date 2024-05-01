import { loginPageClass } from "../fixture/pages/loginPage";
import { navBarElements } from "../fixture/pages/navBarPage";

let env = Cypress.env("environment");
let login = "3hrsforsleep";
let password = "123456789";
let navBarPage = new navBarElements();
let loginPage = new loginPageClass();

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
    loginPage.loginOnUi(login, password);
  });

  it("Click Main Button", () => {
    navBarPage.elements.mainButton().should("be.visible"),
      navBarPage.elements.mainButton().click(),
      navBarPage.elements.mainButton().should("be.visible");
  }),
    it("Click Task Button", () => {
      navBarPage.elements.entityMenu().should("be.visible"),
        navBarPage.elements.entityMenu().click(),
        navBarPage.elements.tasksbutton().contains("Task").click(),
        cy.get("#task-heading").contains("Tasks"),
        cy.get("#jh-create-entity").should("be.visible");
    }),
    it("Click User Task Button", () => {
      navBarPage.elements.entityMenu().should("be.visible"),
        navBarPage.elements.entityMenu().click(),
        navBarPage.elements.tasksbutton().contains("User Task").click(),
        cy.get("#user-task-heading").contains("User Tasks"),
        cy.get("#jh-create-entity").should("be.visible");
    }),
    it("Click API Button", () => {
      navBarPage.elements.docsMenu(),
        navBarPage.elements.docsMenu().click(),
        navBarPage.elements
          .apiButton()
          .should("have.attr", "href", "/docs/docs")
          .click(),
        cy.get('[data-cy="swagger-frame"]').should("be.visible");
    }),
    it("Click English Button", () => {
      navBarPage.elements.localizationButton().should("be.visible"),
        navBarPage.elements.localizationButton().click(),
        navBarPage.elements.menuButton().contains("English").click(),
        navBarPage.elements.headerTabs().contains("English");
    }),
    it("Click Francais Button", () => {
      navBarPage.elements.localizationButton().should("be.visible"),
        navBarPage.elements.localizationButton().click(),
        navBarPage.elements.menuButton().contains("Français").click(),
        navBarPage.elements.headerTabs().contains("Français");
    }),
    it("Click Ukranian Button", () => {
      navBarPage.elements.localizationButton().should("be.visible"),
        navBarPage.elements.localizationButton().click(),
        navBarPage.elements.menuButton().contains("Українська").click(),
        navBarPage.elements.headerTabs().contains("Українська");
    }),
    it("Click Russian Button", () => {
      navBarPage.elements.localizationButton().should("be.visible"),
        navBarPage.elements.localizationButton().click(),
        navBarPage.elements.menuButton().contains("Русский").click(),
        navBarPage.elements.headerTabs().contains("Русский");
    }),
    it("Click Settings Button", () => {
      navBarPage.elements.accountMenu().click(),
        navBarPage.elements.menuButton().contains("Настройки").click(),
        cy.get("#settings-title").should("be.visible");
    });

  it("Click Password Button", () => {
    navBarPage.elements.accountMenu(),
      navBarPage.elements.accountMenu().click(),
      navBarPage.elements.menuButton().contains("Пароль").click(),
      cy.get("#password-title").should("be.visible");
  });

  it("Click Exit Button", () => {
    navBarPage.elements.accountMenu(),
      navBarPage.elements.accountMenu().click(),
      navBarPage.elements.menuButton().contains("Выйти").click(),
      cy.get("#app-view-container").contains("Logged out successfully!");
  });
});
