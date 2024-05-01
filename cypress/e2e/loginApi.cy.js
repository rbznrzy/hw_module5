import { faker } from "@faker-js/faker";
let usernameData = require("../fixture/data/loginData.json");
let passwordData = require("../fixture/data/passwordData.json");

let randomLogin = faker.internet.userName();
let randomPassword = faker.internet.password();


describe("Проверка авторизации через API", () => {
  it("Логин с данными существующего польщователя", () => {
    cy.request({
      method: "POST",
      url: "api/authenticate",
      body: {
        username: usernameData[0].login,
        password: passwordData[0].password,
        rememberMe: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const authorizationHeader = response.body.id_token;
      cy.request({
        method: "GET",
        url: "api/account",
        headers: {
          Authorization: `Bearer ${authorizationHeader}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("login", usernameData[0].login);
      });
    });
  });

  it("Логин с данными несуществующего пользователя", () => {
    cy.request({
      method: "POST",
      url: "api/authenticate",
      failOnStatusCode: false,
      body: {
        username: randomLogin,
        password: randomPassword,
        rememberMe: false,
      },
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("detail", "Bad credentials");
      expect(response.body).to.have.property("title", "Unauthorized");
      });
    });
  });

  describe('Проверка поля логина через API', () => {
    it("Логин с пустым полем логина", () => {
      cy.request({
        method: "POST",
        url: "api/authenticate",
        failOnStatusCode: false,
        body: {
          username: "",
          password: randomPassword,
          rememberMe: false,
        },
      }).should((response) => {
        expect(response.status).to.eq(400);
        });
      });

      it("Логин с пробелом в поле логина", () => {
        cy.request({
          method: "POST",
          url: "api/authenticate",
          failOnStatusCode: false,
          body: {
            username: " ",
            password: randomPassword,
            rememberMe: false,
          },
        }).should((response) => {
          expect(response.status).to.eq(401);
          });
        });
  })

  describe('Проверка поля ввода пароля через API', () => {
    it("Логин с пустым полем ввода пароля", () => {
      cy.request({
        method: "POST",
        url: "api/authenticate",
        failOnStatusCode: false,
        body: {
          username: randomLogin,
          password: "",
          rememberMe: false,
        },
      }).should((response) => {
        expect(response.status).to.eq(400);
        });
      });
      it("Логин с пробелом в поле ввода пароля", () => {
        cy.request({
          method: "POST",
          url: "api/authenticate",
          failOnStatusCode: false,
          body: {
            username: randomLogin,
            password: " ",
            rememberMe: false,
          },
        }).should((response) => {
          expect(response.status).to.eq(400);
          });
        });
        it("Логин со значением иеньше 4 в поле ввода пароля", () => {
          cy.request({
            method: "POST",
            url: "api/authenticate",
            failOnStatusCode: false,
            body: {
              username: randomLogin,
              password: passwordData[2].password,
              rememberMe: false,
            },
          }).should((response) => {
            expect(response.status).to.eq(400);
            });
          });
  })
