export class deletingUserClass {
  deletingUserApi(userName) {
    cy.request({
      method: "POST",
      url: "api/authenticate",
      body: {
        username: "admin_automation",
        password: "admin_automation",
        rememberMe: false,
      },
    }).then((response) => {
      const authorizationHeader = response.body.id_token;
      cy.request({
        method: "GET",
        url: "api/account",
        headers: {
          Authorization: `Bearer ${authorizationHeader}`,
        },
      });
      cy.request({
        method: "DELETE",
        url: `api/admin/users/${userName}`,
        headers: {
          Authorization: `Bearer ${authorizationHeader}`,
        },
      });
    });
  }
}
