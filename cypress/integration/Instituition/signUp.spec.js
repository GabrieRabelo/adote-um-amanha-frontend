import * as cnpj from "@fnando/cnpj";
describe("Create a new institution account", () => {
  it("Creating an account", () => {
    var gerar = cnpj.generate();
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

    cy.contains('[class="a-button--title"]', " Registrar Instituição ", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get('input[required="required"]', {
      timeout: Cypress.env("timeOut"),
    })
      .first()
      .type("Casa de exemplo");
    cy.contains('[class="v-text-field__slot"]', "CNPJ").type(gerar);
    cy.contains('[class="v-text-field__slot"]', "CEP").type("98765123");
    cy.contains('[class="v-text-field__slot"]', "Cidade").type("Rio Branco");
    cy.contains('[class="v-select__slot"]', "Estado").click();
    cy.contains('[class="v-list-item__title"]', "BA").click();
    cy.contains('[class="v-text-field__slot"]', "Bairro").type("Partenon");
    cy.contains('[class="v-text-field__slot"]', "Rua").type("Rua das Conchas");
    cy.contains('[class="v-text-field__slot"]', "Nº").type("1200");
    cy.contains('[class="v-text-field__slot"]', "Complemento").type("Prédio 3");
    cy.contains('[class="v-text-field__slot"]', "E-mail").type(
      gerar + "@mail.com"
    );
    cy.contains('[class="v-text-field__slot"]', "Telefone").type("51923675552");
    cy.contains('[class="v-text-field__slot"]', "Senha").type("admin");
    cy.contains('[class="a-button--title"]', "Cadastrar").click();

    cy.get(".v-snack--active > .v-snack__wrapper > .v-snack__content").should(
      "contain",
      "Cadastro realizado com sucesso",
      { timeout: Cypress.env("timeOut") }
    );
  });
});
