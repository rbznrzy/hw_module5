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

 /** Отображение селектора */
 Cypress.Commands.add('displayingElement', (selector) => { 
    cy.get(selector).should('be.visible')
});

/** Нажатие на селектор */
Cypress.Commands.add('clickSelector', (selector) =>{
    cy.get(selector).click();
})

/** Ввод текста в селектор */
Cypress.Commands.add('typeText', (selector, text) => {
    cy.get(selector).click().type(text);
})

/** Login */
Cypress.Commands.add('loginOnUi', (login, password) => { 
    cy.typeText('#username', login),
    cy.typeText('#password', password),
    cy.clickSelector('[data-cy="submit"]')
 });

 /** Registration */
Cypress.Commands.add('regOnUi', (login, email, password, confirmPass) => {
    cy.typeText('#username', login),
    cy.typeText('#email', email),
    cy.typeText('#firstPassword', password),
    cy.typeText('#secondPassword', confirmPass),
    cy.clickSelector('#register-submit')
 });


