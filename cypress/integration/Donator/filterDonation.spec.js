describe("Filter Donation", () => {
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

  it("Filter by category", () => {
    cy.contains('[class="a-button--title"]', "Minhas doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get(
      "button[class='v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--default primary']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
    cy.contains('[class="v-chip__content"]', "Saúde", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="a-button--title"]', "Aplicar Filtros").click();
  });

  it("Filter by type", () => {
    cy.contains('[class="a-button--title"]', "Minhas doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get(
      "button[class='v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--default primary']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
    cy.contains('[class="v-chip__content"]', "Serviços", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="a-button--title"]', "Aplicar Filtros").click();
  });

  it("Filter by status", () => {
    cy.contains('[class="a-button--title"]', "Minhas doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get(
      "button[class='v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--default primary']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
    cy.contains('[class="v-chip__content"]', "Atendida", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="a-button--title"]', "Aplicar Filtros").click();
  });

  it("Filter by date", () => {
    cy.contains('[class="a-button--title"]', "Minhas doações", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get(
      "button[class='v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--default primary']",
      {
        timeout: Cypress.env("timeOut"),
      }
    ).click();
    cy.contains('[class="v-select__slot"]', "Data").click();
    cy.contains('[class="v-list-item__title"]', "12 meses", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.contains('[class="a-button--title"]', "Aplicar Filtros").click();
  });
});
