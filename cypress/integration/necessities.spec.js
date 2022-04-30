describe("Necessities", () => {
  beforeEach(() => {
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

  it("Create a new necessity", () => {
    cy.get('.a-button', { timeout: Cypress.env("timeOut") }).click()
    cy.url().should("include", "/create", { timeout: Cypress.env("timeOut") });
    cy.get('.v-btn--has-bg', { timeout: Cypress.env("timeOut") }).click()
    cy.contains('.a-button--title', 'Continuar', { timeout: Cypress.env("timeOut") }).click()
    cy.get('input[required="required"]', { timeout: Cypress.env("timeOut") }).first().type('Caixa de luvas')
    cy.get('textarea[required="required"]', { timeout: Cypress.env("timeOut") }).first().type('Caixa contendo 50 pares de luvas da marca: Supermax')
    cy.contains('.a-button--title', 'Confirmar', { timeout: Cypress.env("timeOut") }).click()
    cy.get('.container', { timeout: Cypress.env("timeOut") }).should('contain', 'Caixa de luvas')
  })

  it('Edit a necessity', () => {
    cy.contains(':nth-child(2) > .card > :nth-child(1)', 'Caixa de luvas', { timeout: Cypress.env("timeOut") }).first().click()
    cy.contains('.a-button--title', 'Editar', { timeout: Cypress.env("timeOut") }).click()
    cy.url().should("include", "/edit", { timeout: Cypress.env("timeOut") });
    cy.get('input[type="text"]', { timeout: Cypress.env("timeOut") }).first().type('{selectall}{backspace}Aulas de Matemática')
    cy.get('[class="v-select__selection v-select__selection--comma"]', { timeout: Cypress.env("timeOut") }).click()
    cy.get('#list-item-89-1 > .v-list-item__content > .v-list-item__title', { timeout: Cypress.env("timeOut") }).click()
    cy.get('textarea[name="input-descricao"]', { timeout: Cypress.env("timeOut") }).first().type('{selectall}{backspace}05 Aulas de matemática básica para Ensino Médio')
    cy.contains('.a-button--title', 'Salvar', { timeout: Cypress.env("timeOut") }).click()
    cy.get('.container', { timeout: Cypress.env("timeOut") }).should('contain', 'Aulas de Matemática')
    cy.get('.container', { timeout: Cypress.env("timeOut") }).should('not.contain', 'Caixas de luvas')
  })

  it('Delete a necessity', () => {
    cy.contains(':nth-child(2) > .card > :nth-child(1)', 'Aulas de Matemática', { timeout: Cypress.env("timeOut") }).first().click()
    cy.contains('.a-button--title', 'Editar', { timeout: Cypress.env("timeOut") }).click()
    cy.contains('.a-button--title', 'Excluir', { timeout: Cypress.env("timeOut") }).click()
    cy.contains('.a-button--title', 'Confirmar', { timeout: Cypress.env("timeOut") }).click()
    cy.get('.container', { timeout: Cypress.env("timeOut") }).should('not.contain', 'Aulas de Matemática')
  })
});
