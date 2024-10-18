const path = require('path');

describe('Teste de download e validação de PDF', () => {
  it('Deve baixar e validar o conteúdo do PDF simples', () => {
    cy.visit('/app/index.html'); 
    cy.get('[href="simples.pdf"]').click()

    // Obtém o caminho do arquivo concatenando a pasta + o nome do arquivo
    const caminhoArquivo = path.join(Cypress.config('downloadsFolder'), 'simples.pdf');

    // Valida se o arquivo foi baixado
    //Se o arquivo for grande, pode ser colocado um timeout. Exemplo: cy.readFile(pdfFilePath, { timeout: 5000 }).should('exist');
    cy.readFile(caminhoArquivo).should('exist');

    // Usa a task para ler e analisar o conteúdo do PDF
    cy.task('lerPdf', { filePath: caminhoArquivo }).then((textoPdf) => {
        // Valida o conteúdo do PDF
        expect(textoPdf).to.include('Hello darkness my old friend');
      });
  });


  it('Deve baixar e validar o conteúdo do PDF complexo', () => {
    cy.visit('/app/index.html'); 
    cy.get('[href="complexo.pdf"]').click()

    // Obtém o caminho do arquivo concatenando a pasta + o nome do arquivo
    const caminhoArquivo = path.join(Cypress.config('downloadsFolder'), 'complexo.pdf');

    // Valida se o arquivo foi baixado
    //Se o arquivo for grande, pode ser colocado um timeout. Exemplo: cy.readFile(pdfFilePath, { timeout: 5000 }).should('exist');
    cy.readFile(caminhoArquivo).should('exist');

    // Usa a task para ler e analisar o conteúdo do PDF
    cy.task('lerPdf', { filePath: caminhoArquivo }).then((textoPdf) => {
        // Valida o conteúdo do PDF
        expect(textoPdf).to.include('INVOICE');
        expect(textoPdf).to.include('Attention: Trenz Pruca');
        expect(textoPdf).to.include('920,00');
        expect(textoPdf).to.include('Thank you for your business.');
      });
  });
});