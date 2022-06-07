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

import 'cypress-file-upload';


Cypress.Commands.add('login', () => {
  cy.get('input').eq(0).clear().type('user@user.com')
  cy.get('input').eq(1).clear().type('uSer*Password1')
  cy.get("button").contains("Log in").click();
})


Cypress.Commands.add('completeStoryForm', () => {
  cy.get('input[id=title]').clear().type("Test Title")
  cy.get('textarea').eq(0).clear().type('This is a description. And it is working')
  cy.get('mat-select').eq(0).click().get('mat-option').contains('Romance').click()
  cy.get('mat-select').eq(1).click().get('mat-option').contains('Comedy').click()
  cy.get('mat-select').eq(2).click().get('mat-option').first().click()
  cy.get('mat-select').eq(3).click().get('mat-option').first().click()
  cy.get('input[type=color]')
    .invoke('val', '#d77c79')
    .trigger('input')
  cy.get("button").contains('Create').click()

})


Cypress.Commands.add('createStory', (navigate) => {
  cy.get("button").contains('WRITE').click().get("button").contains(navigate).click();
})

Cypress.Commands.add('navigateToStories', () => {
  cy.get("button").contains('USER').click().get("button").contains("Account").click().get("div").contains("My Stories").click()
})

Cypress.Commands.add('completeEpisodeForm', () => {
  const fixture_pdf = 'lorem-ipsum.pdf';
  cy.get("input").eq(0).type("Episodio de prueba");
  cy.get('input[type=file]').attachFile(fixture_pdf);
  cy.get("button").contains("POST EPISODE").click();
})
