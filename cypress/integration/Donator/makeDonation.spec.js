describe("Make donation", () => {
  beforeEach(() => {
    cy.visit("/auth");
    cy.get("input[type='email']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("emailDonator")
    );
    cy.get("input[type='password']", { timeout: Cypress.env("timeOut") }).type(
      Cypress.env("password")
    );
    cy.get(
      "button[class='a-button v-application px-9 py-5 v-btn v-btn--has-bg v-btn--rounded theme--light elevation-0 v-size--default primary']",
      { timeout: Cypress.env("timeOut") }
    ).click();
  });

  it("Make donation and cancel", () => {
    cy.contains('[class="a-button--title"]', "Necessidades das Casas", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Consulta Nutricional").click();
    cy.contains('[class="a-button--title"]', "Doar").click();
    cy.contains('[class="a-button--title"]', "Cancelar").click();
  });

  it("Make a necessity donation", () => {
    cy.contains('[class="a-button--title"]', "Necessidades das Casas", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Consulta Nutricional").click();
    cy.contains('[class="a-button--title"]', "Doar").click();
    cy.contains('[class="a-button--title"]', "Confirmar").click();
    cy.contains('[class="a-button--title"]', "Ok").click();
  });
});
