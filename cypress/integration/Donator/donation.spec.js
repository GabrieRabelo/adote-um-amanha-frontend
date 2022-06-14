describe("Donations", () => {
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
      cy.contains('[class="a-button--title"]', "Minhas doações", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.url().should("include", "/donations", {
        timeout: Cypress.env("timeOut"),
      });
    });
  
    it("Create a new donation", () => {
      cy.contains('[class="a-button--title"]', "Doar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.url().should("include", "/create", { timeout: Cypress.env("timeOut") });
      cy.contains(".a-button--title", "Continuar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.contains(".a-button--title", "Continuar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get('input[required="required"]', { timeout: Cypress.env("timeOut") })
        .first()
        .type("Caixa de luvas");
      cy.get('textarea[required="required"]', { timeout: Cypress.env("timeOut") })
        .first()
        .type("Caixa contendo 50 pares de luvas da marca: Supermax");
      cy.contains(".a-button--title", "Confirmar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get(
        'button[class="a-button v-application px-9 py-5 button--confirm v-btn v-btn--has-bg v-btn--rounded theme--light elevation-0 v-size--default primary"]',
        {
          timeout: Cypress.env("timeOut"),
        }
      ).click();
      cy.get(".container", { timeout: Cypress.env("timeOut") }).should(
        "contain",
        "Caixa de luvas"
      );
    });
  
    it("Open donation description", () => {
      cy.url().should("contain", "/donations");
      cy.contains('[class="card__title"]', "Caixa de luvas", {
        timeout: Cypress.env("timeOut"),
      })
        .parent()
        .parent()
        .click();
      cy.get(".a-text__bold-title").should("contain", "Caixa de luvas");
      cy.url().should("contain", "/donations/");
    });
  
    it("Edit a donation", () => {
      cy.contains('[class="card__title"]', "Caixa de luvas", {
        timeout: Cypress.env("timeOut"),
      })
        .parent()
        .parent()
        .click();
      cy.get(".a-text__bold-title").should("contain", "Caixa de luvas");
      cy.contains(".a-button--title", "Editar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.url().should("include", "/edit", { timeout: Cypress.env("timeOut") });
      cy.get('input[type="text"]', { timeout: Cypress.env("timeOut") })
        .first()
        .type("{selectall}{backspace}Aulas de Matemática");
      cy.get('[class="v-select__selection v-select__selection--comma"]', {
        timeout: Cypress.env("timeOut"),
      })
        .first()
        .click();
      cy.contains('[class="v-list-item__title"]', "Serviço", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get('[class="v-select__selection v-select__selection--comma"]', {
        timeout: Cypress.env("timeOut"),
      })
        .last()
        .click();
      cy.contains('[class="v-list-item__title"]', "Educação", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get('textarea[name="input-descricao"]', {
        timeout: Cypress.env("timeOut"),
      })
        .first()
        .type(
          "{selectall}{backspace}05 Aulas de matemática básica para Ensino Médio"
        );
      cy.contains(".a-button--title", "Salvar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get(".container", { timeout: Cypress.env("timeOut") }).should(
        "contain",
        "Aulas de Matemática"
      );
      cy.get(".container", { timeout: Cypress.env("timeOut") }).should(
        "not.contain",
        "Caixas de luvas"
      );
    });
  
    it("Delete a donation", () => {
      cy.contains('[class="card__title"]', "Aulas de Matemática", {
        timeout: Cypress.env("timeOut"),
      })
        .parent()
        .parent()
        .click();
      cy.get(".a-text__bold-title").should("contain", "Aulas de Matemática");
      cy.contains(".a-button--title", "Editar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.contains(".a-button--title", "Excluir", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.contains(".a-button--title", "Confirmar", {
        timeout: Cypress.env("timeOut"),
      }).click();
      cy.get(".container", { timeout: Cypress.env("timeOut") }).should(
        "not.contain",
        "Aulas de Matemática"
      );
    });
  });