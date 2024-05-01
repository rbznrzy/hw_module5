import { loginPageClass } from "../fixture/pages/loginPage";
import { commonMethodsClass } from "../fixture/common/commonMethods";
import { faker } from "@faker-js/faker";
import { navBarElements } from "../fixture/pages/navBarPage";

let loginData = require("../fixture/data/loginData.json");
let passwordData = require("../fixture/data/passwordData.json");
let validationTextData = require("../fixture/data/validationTextData.json");
let loginPage = new loginPageClass();
let navBarPage = new navBarElements();
let randomLogin = faker.internet.userName();
let randomPassword = faker.internet.password();

beforeEach(() => {
  cy.visit("/login");
});

describe("Логин с существующими валидными данными", () => {
  it("Логин с существующими валидными данными", () => {
    loginPage.loginOnUi(loginData[0].login, passwordData[0].password);
    navBarPage.elements.headerTabs()
    .should("be.visible");
  });
});

describe("Проверка поля логина", () => {
  it("Логин с несуществующим логином", () => {
    loginPage.loginOnUi(randomLogin, randomPassword);
    loginPage.elements.errorAlert()
    .should("be.visible");
  });

  it("Логин c пустым полем логина", () => {
    loginPage.elements.passwordField().click();
    loginPage.elements.validationField()
      .should("be.visible")
      .contains(validationTextData.emptyUserNameValidation);
  });

  it("Логин c пробелом в поле логина", () => {
    loginPage.loginOnUi(loginData[2].login, randomPassword);
    loginPage.elements.errorAlert()
    .should("be.visible");
  });
});

describe("Проверка поля ввода пароля", () => {
  it("Логин с несуществующим паролем", () => {
    loginPage.loginOnUi(randomLogin, passwordData[1].password);
    loginPage.elements.errorAlert()
    .should("be.visible");
  });

  it("Логин c пустым полем пароля", () => {
    loginPage.elements.passwordField().click();
    loginPage.elements.submitLoginButton().click();
    loginPage.elements.validationField()
      .should("be.visible")
      .contains(validationTextData.emptyPasswordValidation);
  });
  it("Логин с паролем менее 4 символов", () => {
    loginPage.loginOnUi(loginData[1].login, passwordData[2].password);
    loginPage.elements.errorAlert()
    .should("be.visible");
    loginPage.elements.temporaryToast()
    .should("be.visible");
  }),
    it("Логин c пробелом в поле ввода логина", () => {
      loginPage.loginOnUi(loginData[1].login, passwordData[3].password);
      loginPage.elements.errorAlert()
      .should("be.visible");
    });
});
