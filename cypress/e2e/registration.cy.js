import { faker } from "@faker-js/faker";

/** Посещение страницы регистарации перед каждым тестом*/
beforeEach(() => {
  cy.visit("/account/register");
});

/** Импорт */
let registrationPageSelectors = require("../fixture/pages/registrationPageSelectors.json");
let loginData = require("../fixture/data/loginData.json");
let emailData = require("../fixture/data/emailData.json");
let passwordData = require("../fixture/data/passwordData.json");
let validationText = require('../fixture/data/validationTextData.json')
let validElements = require("../fixture/pages/validElements.json");
let invalidElements = require("../fixture/pages/invalidElements.json");

/** Объявление переменных */
let randomLogin = faker.internet.userName();
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

describe("Проверка с валидными данными", () => {
  after(() => {
    cy.deletingUser(randomLogin)
  })
  it("Проверка с валидным логином, имейлом и паролем", () => {
    cy.regOnUi(randomLogin, randomEmail, randomPassword, randomPassword);
    validElements.forEach((selector) => {
      cy.displayingElement(selector.element);
    });
  });
});

describe("Проверка обязательности полей", () => {
  it("Валидация полей ввода", () => {
    cy.clickSelector(registrationPageSelectors.registerSubmitButton);
    invalidElements.forEach((selector) => {
      cy.displayingElement(selector.element);
    });
  });
});

describe("Проверка поля логина", () => {
  it("Проверка с невалидным логином, состоящим из символов", () => {
    cy.regOnUi(
      loginData[1].login, 
      randomEmail, 
      randomPassword, 
      randomPassword);
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.validationUserNameText);
  }),
    it("Проверка с пробелом в поле ввода логина", () => {
      cy.regOnUi(
        loginData[2].login,
        randomEmail,
        randomPassword,
        randomPassword
      );
      cy.displayingElement(registrationPageSelectors.validationField)
        .contains(validationText.validationUserNameText);

    });
});

describe("Проверка поля email", () => {
  it("Проверка с невалидным email длинной менее 5 символов", () => {
    cy.regOnUi(randomLogin, emailData[1].email, randomPassword, randomPassword);
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.minCharactersValidationEmailText);
  }),
    it("Проверка с адресом без @", () => {
      cy.regOnUi(
        randomLogin,
        emailData[2].email,
        randomPassword,
        randomPassword
      );
      cy.displayingElement(registrationPageSelectors.validationField)
        .contains(validationText.validationEmailText);
    }),
    it("Проверка с email с двумя @", () => {
      cy.regOnUi(
        randomLogin,
        emailData[3].email,
        randomPassword,
        randomPassword
      );
      cy.displayingElement(registrationPageSelectors.validationField)
        .contains(validationText.validationEmailText);
    });
  it("Проверка с пробелом в поле ввода имейла", () => {
    cy.regOnUi(randomLogin, emailData[4].email, randomPassword, randomPassword);
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.requiredValidationEmailText);
  });
});

describe("Проверка поля пароля", () => {
  it("Проверка с паролем длинной менее четырех символов", () => {
    cy.regOnUi(
      randomLogin,
      randomEmail,
      passwordData[2].password,
      randomPassword
    );
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.minCharactersValidationPasswordText);
  });

  it("Проверка с пробелом в поле ввода пароля", () => {
    cy.regOnUi(
      randomLogin,
      randomEmail,
      passwordData[3].password,
      randomPassword
    );
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.minCharactersValidationPasswordText);
  });
});

describe("Проверка поля подтверждения пароля", () => {
  it("Проверка с введенным значением в поле подтверждения пароля длинной менее четырех символов", () => {
    cy.regOnUi(
      randomLogin,
      randomEmail,
      randomPassword,
      passwordData[2].password
    );
    cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.minCharactersValidationConfirmPasswordText);
  });

  it("Проверка с пробелом в поле ввода подтверждения пароля", () => {
    cy.regOnUi(
      randomLogin,
      randomEmail,
      randomPassword,
      passwordData[3].password
    );
    cy.displayingElement(registrationPageSelectors.validationField)
    .contains(validationText.minCharactersValidationConfirmPasswordText);

  }),
    it("Проверка с введенным значением в поле подтверждения пароля, не совпадающим с введенным паролем", () => {
      let anotherRandomPassword = faker.internet.password();
      cy.regOnUi(
        randomLogin,
        randomEmail,
        randomPassword,
        anotherRandomPassword
      );
      cy.displayingElement(registrationPageSelectors.validationField)
      .contains(validationText.notMatchedValidationPasswordText);
    });
});
