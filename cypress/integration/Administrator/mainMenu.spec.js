describe("Login", () => {
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

  it("Open necessities tab", () => {
    cy.contains('[class="a-button--title"]', "Necessidades", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/admin/necessities", {
      timeout: Cypress.env("timeOut"),
    });
  });

  it("Open donations tab", () => {
    cy.contains('[class="a-button--title"]', "Doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/admin/donations", {
      timeout: Cypress.env("timeOut"),
    });
  });

  it("Open match requests tab", () => {
    cy.contains('[class="a-button--title"]', "Solicitações de Match", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/admin/matches", {
      timeout: Cypress.env("timeOut"),
    });
  });

  it("Open donators tab", () => {
    cy.contains('[class="a-button--title"]', "Doadores", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.url().should("include", "/admin/donators", {
      timeout: Cypress.env("timeOut"),
    });
  });
});
