import { faker } from "@faker-js/faker";
let loginData = require("../fixture/data/loginData.json");
let passwordData = require("../fixture/data/passwordData.json");
let emailData = require("../fixture/data/emailData.json");

let randomLogin = faker.internet.userName();
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

describe("Проверка регистрации через API", () => {
  after(() => {
    cy.deletingUser(randomLogin);
  });
  it("Логин с данными существующего польщователя", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      body: {
        login: randomLogin,
        email: randomEmail,
        password: randomPassword,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(201);
    });
  });
});

describe("Проверка поля логина через API", () => {
    it("Логин с невалидным значением в поле логина", () => {
        cy.request({
          method: "POST",
          url: "api/register",
          failOnStatusCode: false,
          body: {
            login: loginData[1].login,
            email: randomEmail,
            password: randomPassword,
            langKey: "ru"
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
        });
      });

  it("Логин с пустым полем логина", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: "",
        email: randomEmail,
        password: randomPassword,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Логин с пробелом в поле логина", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: " ",
        email: randomEmail,
        password: randomPassword,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });
});

describe("Проверка поля email через API", () => {
    it("Проверка с невалидным email длинной менее 5 символов", () => {
        cy.request({
          method: "POST",
          url: "api/register",
          failOnStatusCode: false,
          body: {
            login: randomLogin,
            email: emailData[1].email,
            password: randomPassword,
            langKey: "ru"
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it("Проверка с адресом без @", () => {
        cy.request({
          method: "POST",
          url: "api/register",
          failOnStatusCode: false,
          body: {
            login: randomLogin,
            email: emailData[2].email,
            password: randomPassword,
            langKey: "ru"
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
        });
      });
      it("Проверка с адресом без @", () => {
        cy.request({
          method: "POST",
          url: "api/register",
          failOnStatusCode: false,
          body: {
            login: randomLogin,
            email: emailData[3].email,
            password: randomPassword,
            langKey: "ru"
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
        });
      });

  it("Логин с пустым полем email", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: randomLogin,
        email: "",
        password: randomPassword,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Логин с пробелом в поле email", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: randomLogin,
        email: " ",
        password: randomPassword,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });
});

describe("Проверка поля ввода пароля через API", () => {
    it("Логин с пустым полем ввода пароля", () => {
        cy.request({
          method: "POST",
          url: "api/register",
          failOnStatusCode: false,
          body: {
            login: randomLogin,
            email: randomEmail,
            password: passwordData[2].password,
            langKey: "ru"
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
        });
      });
    it("Логин с пустым полем ввода пароля", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: randomLogin,
        email: randomEmail,
        password: "",
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it("Логин с пробелом в поле ввода пароля", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: randomLogin,
        email: randomEmail,
        password: " ",
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it("Логин со значением иеньше 4 в поле ввода пароля", () => {
    cy.request({
      method: "POST",
      url: "api/register",
      failOnStatusCode: false,
      body: {
        login: randomLogin,
        email: randomEmail,
        password: passwordData[2].password,
        langKey: "ru"
      },
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
