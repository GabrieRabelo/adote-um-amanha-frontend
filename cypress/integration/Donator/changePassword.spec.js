describe("Change password", () => {
  it("Request password change", () => {
    cy.visit("/auth");
    cy.contains('[class="link"]', " Esqueci minha senha", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get('input[type="email"]', {
      timeout: Cypress.env("timeOut"),
    })
      .last()
      .type(Cypress.env("emailDonator"));

    cy.contains('[class="a-button--title"]', "Enviar", {
      timeout: Cypress.env("timeOut"),
    }).click();

    cy.get('[class="v-snack__content"]', {
      timeout: Cypress.env("timeOut"),
    }).should("contain", "E-mail enviado!", {
      timeout: Cypress.env("timeOut"),
    });
  });
});
