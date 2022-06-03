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
    cy.get('input[id="lastName"]').should('be.visible').type('da Silva')
    cy.get('input[id="email"]').should('be.visible').type('fulano@fulano.com')
    cy.get('textarea[id="open-text-area"]').should('be.visible').type('Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, ', {'delay' : 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').should('be.visible').type('Fulano')
    cy.get('#lastName').should('be.visible').type('da Silva')
    cy.get('#email').should('be.visible').type('fulano@fulano')
    cy.get('#open-text-area').should('be.visible').type('Me ajudem')
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Valida campo telefonico fique vazio ao digitar alpha', () => {
    cy.get('input[id="phone"]').type('AAAAAAAAABBBBBCCCC').should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').should('be.visible').type('Fulano')
    cy.get('#lastName').should('be.visible').type('da Silva')
    cy.get('#email').should('be.visible').type('fulano@fulano.com')
    cy.get('#phone-checkbox').should('be.visible').check()
    cy.get('textarea').should('be.visible').type('Me ajudem')
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Fulano')
      .should('have.value', 'Fulano')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .should('be.visible')
      .type('da Silva')
      .should('have.value', 'da Silva')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .should('be.visible')
      .type('fulano@fulano.com')
      .should('have.value', 'fulano@fulano.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .should('be.visible')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

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
});