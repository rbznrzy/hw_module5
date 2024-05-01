import { registrationPage } from "../fixture/pages/registrationPage";
import { commonMethodsClass } from "../fixture/common/commonMethods";
import { deletingUserClass } from "../fixture/common/deletingUser";
import { faker } from "@faker-js/faker";

let loginData = require("../fixture/data/loginData.json");
let emailData = require("../fixture/data/emailData.json");
let passwordData = require("../fixture/data/passwordData.json");
let validElements = require("../fixture/data/validElements.json");
let invalidElements = require("../fixture/data/invalidElements.json");
let validationTextData = require("../fixture/data/validationTextData.json");
let regPage = new registrationPage();
let commonMethods = new commonMethodsClass();
let deletingUser = new deletingUserClass();
let randomLogin = faker.internet.userName();
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

beforeEach(() => {
  cy.visit("/account/register");
});

describe("Проверка с валидными данными", () => {
  after(() => {
    deletingUser.deletingUserApi(randomLogin);
  });
  it("Проверка с валидным логином, имейлом и паролем", () => {
    regPage.regOnUi(randomLogin, randomEmail, randomPassword, randomPassword);
    validElements.forEach((selector) => {
      commonMethods.displayingElement(selector.element);
    });
  });
});

describe("Проверка обязательности полей", () => {
  it("Валидация полей ввода", () => {
    regPage.elements.submitRegButton().click();
    invalidElements.forEach((selector) => {
      commonMethods.displayingElement(selector.element);
    });
  });
});

describe("Проверка поля логина", () => {
  it("Проверка с невалидным логином, состоящим из символов", () => {
    regPage.regOnUi(
      loginData[1].login,
      randomEmail,
      randomPassword,
      randomPassword
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.validationUserNameText);
  }),
    it("Проверка с пробелом в поле ввода логина", () => {
      regPage.regOnUi(
        loginData[2].login,
        randomEmail,
        randomPassword,
        randomPassword
      );
      regPage.elements
        .validationField()
        .should("be.visible")
        .contains(validationTextData.validationUserNameText);
    });
});

describe("Проверка поля email", () => {
  it("Проверка с невалидным email длинной менее 5 символов", () => {
    regPage.regOnUi(
      randomLogin,
      emailData[1].email,
      randomPassword,
      randomPassword
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.minCharactersValidationEmailText);
  }),
    it("Проверка с адресом без @", () => {
      regPage.regOnUi(
        randomLogin,
        emailData[2].email,
        randomPassword,
        randomPassword
      );
      regPage.elements
        .validationField()
        .should("be.visible")
        .contains(validationTextData.validationEmailText);
    }),
    it("Проверка с email с двумя @", () => {
      regPage.regOnUi(
        randomLogin,
        emailData[3].email,
        randomPassword,
        randomPassword
      );
      regPage.elements
        .validationField()
        .should("be.visible")
        .contains(validationTextData.validationEmailText);
    });
  it("Проверка с пробелом в поле ввода имейла", () => {
    regPage.regOnUi(
      randomLogin,
      emailData[4].email,
      randomPassword,
      randomPassword
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.requiredValidationEmailText);
  });
});

describe("Проверка поля пароля", () => {
  it("Проверка с паролем длинной менее четырех символов", () => {
    regPage.regOnUi(
      randomLogin,
      randomEmail,
      passwordData[2].password,
      randomPassword
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.minCharactersValidationPasswordText);
  });

  it("Проверка с пробелом в поле ввода пароля", () => {
    regPage.regOnUi(
      randomLogin,
      randomEmail,
      passwordData[3].password,
      randomPassword
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.minCharactersValidationPasswordText);
  });
});

describe("Проверка поля подтверждения пароля", () => {
  it("Проверка с введенным значением в поле подтверждения пароля длинной менее четырех символов", () => {
    regPage.regOnUi(
      randomLogin,
      randomEmail,
      randomPassword,
      passwordData[2].password
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.minCharactersValidationConfirmPasswordText);
  });

  it("Проверка с пробелом в поле ввода подтверждения пароля", () => {
    regPage.regOnUi(
      randomLogin,
      randomEmail,
      randomPassword,
      passwordData[3].password
    );
    regPage.elements
      .validationField()
      .should("be.visible")
      .contains(validationTextData.minCharactersValidationConfirmPasswordText);
  }),
    it("Проверка с введенным значением в поле подтверждения пароля, не совпадающим с введенным паролем", () => {
      let anotherRandomPassword = faker.internet.password();
      regPage.regOnUi(
        randomLogin,
        randomEmail,
        randomPassword,
        anotherRandomPassword
      );
      regPage.elements
        .validationField()
        .should("be.visible")
        .contains(validationTextData.notMatchedValidationPasswordText);
    });
});
