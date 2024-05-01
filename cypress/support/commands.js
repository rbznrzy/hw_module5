// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


let loginPageSelectors = require('../fixture/pages/loginPageSelectors.json')
let registrationPageSelectors = require('../fixture/pages/registrationPageSelectors.json')
let navBarElements = require('../fixture/pages/navBarElements.json')
/** Отображение селектора */
Cypress.Commands.add("displayingElement", (selector) => {
  cy.get(selector).should("be.visible");
});

/** Нажатие на селектор */
Cypress.Commands.add("clickSelector", (selector) => {
    cy.get(selector).click();
});

/** Ввод текста в селектор */
Cypress.Commands.add("typeText", (selector, text) => {
    cy.get(selector).type(text);
});

/** Login */
Cypress.Commands.add("loginOnUi", (login, password) => {
    cy.typeText(loginPageSelectors.userNameField, login),
    cy.typeText(loginPageSelectors.passwordField, password),
    cy.clickSelector(loginPageSelectors.submitButton);
});

/** Registration */
Cypress.Commands.add("regOnUi", (login, email, password, confirmPass) => {
    cy.typeText(registrationPageSelectors.userNameField, login),
    cy.typeText(registrationPageSelectors.emailField, email),
    cy.typeText(registrationPageSelectors.passwordField, password),
    cy.typeText(registrationPageSelectors.confirmPasswordField, confirmPass),
    cy.clickSelector(registrationPageSelectors.registerSubmitButton);
});


/** Deleting User */
Cypress.Commands.add("deletingUser", (userName) => {
    cy.request({
        method: "POST",
        url: "api/authenticate",
        body: {
            username: "admin_automation",
            password: "admin_automation",
            rememberMe: false
        },
    }).then((response) => {
        const authorizationHeader = response.body.id_token;
        cy.request({
            method: "GET",
            url: "api/account",
            headers: {
              Authorization: `Bearer ${authorizationHeader}`
            }
        });
        cy.request({
            method: "DELETE",
            url: `api/admin/users/${userName}`,
            headers: {
              Authorization: `Bearer ${authorizationHeader}`
            }
        });
    });
});
