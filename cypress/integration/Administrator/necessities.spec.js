describe("Necessity", () => {
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

  it("Recusa necessidade e volta ao menu", () => {
    cy.contains('[class="a-button--title"]', "Necessidades", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Leite em pó desnatado").click();
    cy.contains('[class="a-button--title"]', "Recusar").click();
    cy.contains('[class="v-text-field__slot"]', "Motivo").type(
      "Não condiz com o que deve ser."
    );
    cy.contains('[class="a-button--title"]', "Confirmar").click();
  });

  it("Vincula doador e volta ao menu", () => {
    cy.contains('[class="a-button--title"]', "Necessidades", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="card__title"]', "Leite em pó desnatado").click();
    cy.contains('[class="a-button--title"]', "Vincular Doador").click();
    cy.get(
      "button[class='v-app-bar__nav-icon v-btn v-btn--icon v-btn--round theme--light v-size--default']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
    cy.get(
      "button[class='v-app-bar__nav-icon v-btn v-btn--icon v-btn--round theme--light v-size--default']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
  });
});
