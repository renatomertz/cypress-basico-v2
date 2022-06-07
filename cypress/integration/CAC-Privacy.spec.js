/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('./src/privacy.html');
});

it('Verifica o título da aplicação', () => {
  cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
})