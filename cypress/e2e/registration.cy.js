beforeEach(() => {
        cy.visit('/account/register')
})
let loginData = require('../fixture/loginData.json');
let emailData = require('../fixture/emailData.json');
let passwordData = require('../fixture/passwordData.json');
let validElements = require('../fixture/validElements.json');
let invalidElements = require('../fixture/invalidElements.json')

describe('Проверка с валидными данными', () => {
    it('Проверка с валидным логином, имейлом и паролем', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[0].password, passwordData[0].password);
        validElements.forEach(selector => {
            cy.displayingElement(selector.element)
        });
    })
})

describe('Проверка обязательности полей', () => {
    it('Валидация полей ввода', () => {
        cy.clickSelector('#register-submit')
        invalidElements.forEach(selector => {
            cy.displayingElement(selector.element)
        });
    })
})

describe('Проверка поля логина', () => {
    it('Проверка с невалидным логином, состоящим из символов', () => {
        cy.regOnUi(loginData[1].login, emailData[0].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your username is invalid.')
    }),

    it('Проверка с пробелом в поле ввода логина', () => {
        cy.regOnUi(loginData[2].login, emailData[0].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your username is invalid.')
    })
})

describe('Проверка поля email', () => {

    it('Проверка с невалидным email длинной менее 5 символов', () => {
        cy.regOnUi(loginData[0].login, emailData[1].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your email is required to be at least 5 characters.')
    }),

    it('Проверка с адресом без @', () => {
        cy.regOnUi(loginData[0].login, emailData[2].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your email is invalid.')
    }),

    it('Проверка с email с двумя @', () => {
        cy.regOnUi(loginData[0].login, emailData[3].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your email is invalid.')
    })
    it('Проверка с пробелом в поле ввода имейла', () => {
        cy.regOnUi(loginData[0].login, emailData[4].email, passwordData[0].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your email is required.')
    })
})

describe('Проверка поля пароля', () => {

    it('Проверка с паролем длинной менее четырех символов', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[2].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your password is required to be at least 4 characters.')
    })

    it('Проверка с пробелом в поле ввода пароля', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[3].password, passwordData[0].password);
        cy.displayingElement('.invalid-feedback').contains('Your password is required to be at least 4 characters.')
    })

})

describe('Проверка поля подтверждения пароля', () => {

    it('Проверка с введенным значением в поле подтверждения пароля длинной менее четырех символов', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[0].password, passwordData[2].password);
        cy.displayingElement('.invalid-feedback').contains('Your confirmation password is required to be at least 4 characters.')
    })

    it('Проверка с пробелом в поле ввода подтверждения пароля', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[0].password, passwordData[3].password);
        cy.displayingElement('.invalid-feedback').contains('Your confirmation password is required to be at least 4 characters.')
    }),

    it('Проверка с введенным значением в поле подтверждения пароля, не совпадающим с введенным паролем', () => {
        cy.regOnUi(loginData[0].login, emailData[0].email, passwordData[0].password, passwordData[1].password);
        cy.displayingElement('.invalid-feedback').contains('The password and its confirmation do not match!')
    })


})