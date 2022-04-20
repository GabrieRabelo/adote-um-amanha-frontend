describe("Login", () => {
  it("Logar", () => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("email")
    );
    cy.get("input[type='password']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("senha")
    );
    cy.get(
      "button[class='a-button v-application px-9 py-5 v-btn v-btn--has-bg v-btn--rounded theme--light elevation-0 v-size--default primary']",
      { timeout: Cypress.env("timeOut") }
    ).click();
    cy.url().should("include", "/home", { timeout: Cypress.env("timeOut") });
  });
});
