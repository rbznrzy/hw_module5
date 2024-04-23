beforeEach(() => {
    cy.visit('/login')
})

let loginData = require('../fixture/loginData.json');
let passwordData = require('../fixture/passwordData.json');

describe('Логин с существующими валидными данными', () => {
it('Логин с существующими валидными данными', () => {
    cy.loginOnUi(loginData[0].login, passwordData[0].password);
    cy.displayingElement('.collapse');
})
})

describe('Проверка поля логина', () => {
    it('Логин с несуществующим логином', () => {
        cy.loginOnUi(loginData[1].login, passwordData[0].password);
        cy.displayingElement('[data-cy="loginError"]');
    })

    it('Логин c пустым полем логина', () => {
        cy.clickSelector('[name="password"]');
        cy.displayingElement('.invalid-feedback').contains('Username cannot be empty!');
    })
    
    it('Логин c пробелом в поле логина', () => {
        cy.loginOnUi(loginData[2].login, passwordData[0].password);
        cy.displayingElement('[data-cy="loginError"]');
})
})

describe('Проверка поля ввода пароля', () => {
    it('Логин с несуществующим паролем', () => {
        cy.loginOnUi(loginData[0].login, passwordData[1].password);
        cy.displayingElement('[data-cy="loginError"]');
    })

    it('Логин c пустым полем пароля', () => {
        cy.clickSelector('[name="password"]');
        cy.clickSelector('[data-cy="submit"]');
        cy.get('.invalid-feedback').contains('Password cannot be empty!');
    })
    it('Логин с паролем менее 4 символов', () => {
        cy.loginOnUi(loginData[1].login, passwordData[2].password);
        cy.displayingElement('[data-cy="loginError"]');
        cy.displayingElement('.Toastify__toast-body');
}),
    it('Логин c пробелом в поле ввода логина', () => {
        cy.loginOnUi(loginData[1].login, passwordData[3].password);
        cy.displayingElement('[data-cy="loginError"]');

})
})