/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000;

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('Show the cat', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')
  })
})