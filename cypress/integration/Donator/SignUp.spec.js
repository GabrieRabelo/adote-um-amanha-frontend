import { generate } from "gerador-validador-cpf";
describe("Create a new donator account", () => {
  it("Creating an account", () => {
    var gerar = generate();
    cy.visit("/auth");
    cy.contains('[class="link"]', "Cadastre-se!", {
      timeout: Cypress.env("timeOut"),
    }).click();
    cy.get('input[required="required"]').first().type("Exemplo de Souza");
    cy.contains('[class="v-text-field__slot"]', "CPF/CNPJ").type(gerar);
    cy.contains('[class="v-text-field__slot"]', "CEP").type("98765123");
    cy.contains('[class="v-text-field__slot"]', "Cidade").type("Rio Branco");
    cy.contains('[class="v-select__slot"]', "Estado").click();
    cy.contains('[class="v-list-item__title"]', "AC").click();
    cy.contains('[class="v-text-field__slot"]', "Bairro").type("Partenon");
    cy.contains('[class="v-text-field__slot"]', "Rua").type(
      "Rua Cavalo Marinho"
    );
    cy.contains('[class="v-text-field__slot"]', "Nº").type("100");
    cy.contains('[class="v-text-field__slot"]', "Complemento").type("apto 101");
    cy.contains('[class="v-text-field__slot"]', "E-mail").type(
      gerar + "@mail.com"
    );
    cy.contains('[class="v-text-field__slot"]', "Telefone").type("51923675552");
    cy.contains('[class="v-text-field__slot"]', "Senha").type("admin");
    cy.contains('[class="a-button--title"]', "Cadastrar").click();
  });
});
