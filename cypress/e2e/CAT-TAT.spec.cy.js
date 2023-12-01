/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
    // cy.viewport(880, 1280)       //tamanho da página de visualização do teste
  })
  
  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche ps campos obrigatórios e envia o formulário', function() {
    const longText = 'Texto inserido na caixa de texto ==> Teste de automação com Cypress'
    //     ^nome da variavel
    cy.get('#firstName').type('Augusto')     //o # significa ID do elemento
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('augustooliveira1406@gmail.com')
        // cy.get('#email-checkbox')
    // cy.get('#phone-checkbox')
    cy.get('#open-text-area').type(longText, { delay: 0})     //delay padrão é 10 ms, então para ir mais rápido ou mais demorado deve-se alterar o valor
    //Formar 1 de clique no botão
    // cy.get('button[type="submit"]').click()          //forma mais usual de utilizar botões
    
    // Forma 2 de clique no botão
    cy.contains('button', 'Enviar').click()         //clicar no botão com o contains
    cy.get('.success').should('be.visible')          //para utilizar uma classe utiliza-se ('.nomedaclasse')
    
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('augustooliveira1406@gmail,com')
    cy.get('#open-text-area').type('Teste de automação com Cypress')    
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')  
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
    cy.get('#phone')
      .type('aghjjk')
      .should('have.value', '')    
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('augustooliveira1406@gmail.com')
    // cy.get('#phone-checkbox').click()
    cy.get('#phone-checkbox').check()     //refatorado para check
    cy.get('#open-text-area').type('Teste de automação com Cypress')    
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')  
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Augusto')
      .should('have.value', 'Augusto')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Oliveira')      
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('augustooliveira1406@gmail.com')
      .should('have.value', 'augustooliveira1406@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11996481333')   
      .should('have.value', '11996481333')
      .clear()
      .should('have.value', '')      
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')  
  })

  it('exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {     
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')  
  })

  it('envia o formulário com sucesso usando um comando customizado', function() {     
    cy.fillMandatoryFieldsAndsubmit()         // comando customizado inserido dentro do arquivo support/commands.js
    cy.get('.success').should('be.visible')
  })

  // Selecionando itens por seleção suspensa
  it('seleciona um produto (Youtube) pelo seu texto', function() {     
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) pelo seu valor (value)', function() {     
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')  
  })

  it('seleciona um produto (Blog) pelo seu índice', function() {     
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')  
  })

  // Selecionando itens por radio
  it('marca o tipo de atendimento "Feedback', function() {     
    cy.get('input[type="radio"][value="feedback"]')
      .check()    
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {     
    cy.get('input[type="radio"]')   //pega todos os elementos do mesmo tipo
      .should('have.length', 3)     //confirma a quantidade encontrada
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')    //confirma se o mesmo está marcado no momento
      })
  })

  // Selecionando itens por checkbox
  it('marcar ambos os checkboxes, e depois desmarca o último', function() {     
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck() 
      .should('not.be.checked')
  })

 //Selecionando arquivos
  it('selecione um arquivo da pasta fixtures', function() {
   //  cy.get('#file-upload')
   cy.get('input[type="file"]')
     .should('not.have.value')
     .selectFile('./cypress/fixtures/example.json')       //caminho relativo
     .should(function($input) {
       expect($input[0].files[0].name).to.equal('example.json')    
      })
  })

  it('selecione um arquivo simulando drag-and-drop', function() {    
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })       
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')    
       })
   })
 
  it('selecione um arquivo utilizando um fixtures para a qual foi dado um alias', function() {    
    cy.fixture('example.json').as('sampleFile')      //alias se definie com o .as
    cy.get('input[type="file"]')    
      .selectFile('@sampleFile')                //para chamar o alias utiliza-se o @momedoalias
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')    
       })
  })
 
  //Validando links
  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {    
      cy.get('#privacy a')    
        .should('have.attr', 'target','_blank')        // verificando se existe o link sem clicar
  })

  it('acessa a página da política de privcaciade removendo o target e então clicando no link', function() {    
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')         //utilizo a função invoke para remover o atributo 
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })

})


