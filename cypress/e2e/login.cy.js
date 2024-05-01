import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.visit("/login");
});

let loginData = require("../fixture/data/loginData.json");
let passwordData = require("../fixture/data/passwordData.json");
let loginPageSelectors = require('../fixture/pages/loginPageSelectors.json')
let validationtextData = require('../fixture/data/validationTextData.json')
let randomUserName = faker.internet.userName();
let randomPassword = faker.internet.password();


describe("Логин с существующими валидными данными", () => {
  it("Логин с существующими валидными данными", () => {
    cy.loginOnUi(loginData[0].login, passwordData[0].password);
    cy.displayingElement(".collapse");
  });
});

describe("Проверка поля логина", () => {
  it("Логин с несуществующим логином", () => {
    cy.loginOnUi(randomUserName, randomPassword);
    cy.displayingElement(loginPageSelectors.errorAlert);
  });

  it("Логин c пустым полем логина", () => {
    cy.clickSelector(loginPageSelectors.userNameField);
    cy.displayingElement(loginPageSelectors.validationField)
      .contains(validationtextData.emptyUserNameValidation);
  });

  it("Логин c пробелом в поле логина", () => {
    cy.loginOnUi(loginData[2].login, passwordData[0].password);
    cy.displayingElement(loginPageSelectors.errorAlert);
  });
});

describe("Проверка поля ввода пароля", () => {
  it("Логин с несуществующим паролем", () => {
    cy.loginOnUi(loginData[0].login, passwordData[1].password);
    cy.displayingElement(loginPageSelectors.errorAlert);
  });
  it("Логин c пустым полем пароля", () => {
    cy.clickSelector(loginPageSelectors.passwordField);
    cy.clickSelector(loginPageSelectors.submitButton);
    cy.get(loginPageSelectors.validationField)
      .contains(validationtextData.emptyPasswordValidation);
  });
  it("Логин с паролем менее 4 символов", () => {
    cy.loginOnUi(loginData[1].login, passwordData[2].password);
    cy.displayingElement(loginPageSelectors.errorAlert);
    cy.displayingElement(loginPageSelectors.temporaryToast);
  }),
    it("Логин c пробелом в поле ввода логина", () => {
      cy.loginOnUi(loginData[1].login, passwordData[3].password);
      cy.displayingElement(loginPageSelectors.errorAlert);
    });
});
