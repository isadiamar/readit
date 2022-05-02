// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.get('input').eq(0).clear().type('user2@email.com')
  cy.get('input').eq(1).clear().type('password!')
  cy.get("button").contains("Log in").click();
})

Cypress.Commands.add('uploadFile', { prevSubject: true }, (subject, fileName, fileType = '') => {
  cy.fixture(fileName,'binary').then(content => {
    return Cypress.Blob.binaryStringToBlob(content, fileType).then(blob => {
      const el = subject[0];
      const testFile = new File([blob], fileName, {type: fileType});
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      el.files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
    });
  });
});

Cypress.Commands.add('completeStoryForm',()=>{
    cy.get('input[id=title]').clear().type("Title")
    cy.get('textarea').eq(0).clear().type('This is a description. And it is working')
    cy.get('mat-select').eq(0).click().get('mat-option').contains('Romance').click()
    cy.get('mat-select').eq(1).click().get('mat-option').contains('Horror').click()
    cy.get('mat-select').eq(2).click().get('mat-option').first().click()
    cy.get('mat-select').eq(3).click().get('mat-option').first().click()
    cy.get('input[type=color]')
      .invoke('val', '#d77c79')
      .trigger('change')
    cy.get("button").contains('Create').click()

})
