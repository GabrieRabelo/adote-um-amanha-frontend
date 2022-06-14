describe("Create a new donator account", () => {
  it("Creating an account", () => {
    cy.visit("/auth");
    cy.contains('[class="link"]', "Cadastre-se!", {
      timeout: Cypress.env("timeOut"),
    }).click();
  });
});
