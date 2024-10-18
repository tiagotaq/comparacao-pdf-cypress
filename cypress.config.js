const { defineConfig } = require('cypress');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        lerPdf({ filePath }) {
          const caminhoAbsolutoArquivo = path.resolve(filePath);
          const arquivoBuffer = fs.readFileSync(caminhoAbsolutoArquivo);
          return pdf(arquivoBuffer).then(dadosArquivo => {
            return dadosArquivo.text;  // Retorna o texto extraído do PDF
          });
        }
      });
    },
  },
});
