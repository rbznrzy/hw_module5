export class loginPageClass {
    elements = {
        usernameField: () => cy.get('#username'),
        passwordField: () => cy.get('#password'),
        submitLoginButton: () => cy.get('[data-cy="submit"]'),
        errorAlert: () => cy.get("[data-cy='loginError']"),
        validationField: () => cy.get(".invalid-feedback"),
        temporaryToast: () => cy.get(".Toastify__toast-body"),
    }

    loginOnUi(login, password) { 
        this.elements.usernameField().type(login),
        this.elements.passwordField().type(password),
        this.elements.submitLoginButton().click()
     };
}