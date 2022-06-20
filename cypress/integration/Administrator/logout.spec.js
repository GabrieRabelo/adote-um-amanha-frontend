describe("Logout", () => {
  it("Logout 1", () => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("emailAdmin")
    );
    cy.get("input[type='password']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("password")
    );
    cy.get(
      "button[class='a-button v-application px-9 py-5 v-btn v-btn--has-bg v-btn--rounded theme--light elevation-0 v-size--default primary']",
      { timeout: Cypress.env("timeOut") }
    ).click();
    cy.url().should("include", "/home", { timeout: Cypress.env("timeOut") });

    cy.get(
      'button[class="v-app-bar__nav-icon v-btn v-btn--icon v-btn--round theme--light v-size--default"]',
      { timeout: Cypress.env("timeOut") }
    ).click();

    cy.contains('[class="v-list-item__title"]', "Sair", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/auth");
  });

  it("Logout 2", () => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("emailAdmin")
    );
    cy.get("input[type='password']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("password")
    );
    cy.get(
      "button[class='a-button v-application px-9 py-5 v-btn v-btn--has-bg v-btn--rounded theme--light elevation-0 v-size--default primary']",
      { timeout: Cypress.env("timeOut") }
    ).click();
    cy.url().should("include", "/home", { timeout: Cypress.env("timeOut") });

    cy.contains('[class="a-button--title"]', "Sair", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/auth");
  });
});
