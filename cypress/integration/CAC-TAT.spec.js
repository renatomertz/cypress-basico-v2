/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]').should('be.visible').type('Fulano')
    .get('input[id="lastName"]').should('be.visible').type('da Silva')
    .get('input[id="email"]').should('be.visible').type('fulano@fulano.com')
    .get('textarea[id="open-text-area"]').should('be.be.visible').type('Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, ', {'delay' : 0})
    .get('form').contains('Enviar').click()
    .get('.success').should('be.visible')
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').should('be.visible').type('Fulano')
    .get('#lastName').should('be.visible').type('da Silva')
    .get('#email').should('be.visible').type('fulano@fulano')
    .get('#open-text-area').should('be.be.visible').type('Me ajudem')
    .get('form').contains('Enviar').click()
    .get('.error').should('be.be.visible')
  })

  it('Valida campo telefonico só aceite números', () => {
    cy.get('input[id="phone"]').type('AAAAAAAAABBBBBCCCC').should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').should('be.visible').type('Fulano').get('#lastName').should('be.visible').type('da Silva')
    .get('#email').should('be.visible').type('fulano@fulano.com')
    .get('#phone-checkbox').should('be.visible').check()
    .get('textarea').should('be.be.visible').type('Me ajudem')
    .get('form').contains('Enviar').click()
    .get('.error').should('be.be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').should('be.visible').type('Fulano').should('have.value', 'Fulano').clear().should('have.value', '')
    .get('#lastName').should('be.visible').type('da Silva').should('have.value', 'da Silva').clear().should('have.value', '')
    .get('#email').should('be.visible').type('fulano@fulano.com').should('have.value', 'fulano@fulano.com').clear().should('have.value', '')
    .get('#phone').should('be.be.visible').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('form').contains('Enviar').click()
    .get('.error').should('be.be.visible')
  })
});