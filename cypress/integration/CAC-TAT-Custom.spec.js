/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    const cactat = {
      firstName: 'Fulano',
      lastName: 'da Silva',
      email: 'fulano@fulano.com',
      mensage: 'Me ajuda!!!!!!!!!'
    }

    cy.fillMandatoryFieldsAndSubmit(cactat)
    .get('.success').should('be.visible')
  })
})