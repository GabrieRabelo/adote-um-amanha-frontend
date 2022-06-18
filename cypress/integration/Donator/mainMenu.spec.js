describe("Menu", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("emailDonator")
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

  it("Open necessities tab", () => {
    cy.contains('[class="a-button--title"]', "Necessidades das Casas", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/necessities", {
      timeout: Cypress.env("timeOut"),
    });
  });

  it("Open donations tab", () => {
    cy.contains('[class="a-button--title"]', "Doação personalizada", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/create", {
      timeout: Cypress.env("timeOut"),
    });
  });

  it("Open my donations tab", () => {
    cy.contains('[class="a-button--title"]', "Minhas doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/donations", {
      timeout: Cypress.env("timeOut"),
    });
  });
});
