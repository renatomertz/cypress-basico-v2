/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TATs');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]').should('be.visible').type('Fulano')
    cy.get('input[id="lastName"]').should('be.visible').type('da Silva')
    cy.get('input[id="email"]').should('be.visible').type('fulano@fulano.com')
    cy.get('textarea[id="open-text-area"]').should('be.visible').type('Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, Me ajudem, ', {'delay' : 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').should('be.visible').type('Fulano')
    cy.get('#lastName').should('be.visible').type('da Silva')
    cy.get('#email').should('be.visible').type('fulano@fulano')
    cy.get('#open-text-area').should('be.visible').type('Me ajudem')
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('valida campo telefonico fique vazio ao digitar alpha', () => {
    cy.get('input[id="phone"]').type('AAAAAAAAABBBBBCCCC').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').should('be.visible').type('Fulano')
    cy.get('#lastName').should('be.visible').type('da Silva')
    cy.get('#email').should('be.visible').type('fulano@fulano.com')
    cy.get('#phone-checkbox').should('be.visible').check()
    cy.get('textarea').should('be.visible').type('Me ajudem')
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const cactat = {
      firstName: 'Fulano',
      lastName: 'da Silva',
      email: 'fulano@fulano.com',
      mensage: 'Me ajuda!!!!!!!!!'
    }

    cy.fillMandatoryFieldsAndSubmit(cactat)
    .get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .should('be.visible')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .should('be.visible')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .should('be.visible')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .should('be.visible')
      .check()
      .should('have.value', 'feedback')
      
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')   
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) =>{ 
        expect($input[0].files[0].name).to.equal('example.json')
      })
      
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json' , { action: 'drag-drop' })
        .should(($input) =>{ 
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('simpleFile')
      
      cy.get('#file-upload')
          .should('not.have.value')
          .selectFile('@simpleFile')
          .should(($input) =>{ 
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('CAC TAT - Política de privacidade').should('be.visible')
      cy.contains('Talking About Testing').should('be.visible')
    }) 
    
});