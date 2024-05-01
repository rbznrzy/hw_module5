export class registrationPage {
    elements = {
        usernameField: () => cy.get('#username'),
        emailField: () => cy.get('#email'),
        passwordField: () => cy.get('#firstPassword'),
        confirmPasswordField: () => cy.get('#secondPassword'),
        submitRegButton: () => cy.get('#register-submit'),
        errorAlert: () => cy.get("[data-cy='loginError']"),
        validationField: () => cy.get(".invalid-feedback"),
        temporaryToast: () => cy.get(".Toastify__toast-body"),
    }
    
    regOnUi(login, email, password, confirmPass) {
        this.elements.usernameField().type(login),
        this.elements.emailField().type(email),
        this.elements.passwordField().type(password),
        this.elements.confirmPasswordField().type(confirmPass),
        this.elements.submitRegButton().click()
     };
    
}