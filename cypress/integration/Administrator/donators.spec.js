describe("Donators", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("emailAdmin")
    );
    cy.get("input[type='password']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("password")
    );
    cy.contains('[class="a-button--title"]', "Entrar", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/home", {
      timeout: Cypress.env("timeOut"),
    });
  });
  it("Open donator card and click back button", () => {
    cy.contains('[class="a-button--title"]', "Doadores", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Gabriel", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="a-button--title"]', "Voltar", {
      timeout: Cypress.env("timeOut"),
    }).click();
  });
  it("Open donator card and click back arrow button", () => {
    cy.contains('[class="a-button--title"]', "Doadores", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Gabriel", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get(
      "button[class='v-app-bar__nav-icon v-btn v-btn--icon v-btn--round theme--light v-size--default']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
  });
});
