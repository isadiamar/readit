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
  cy.request({
    method: 'POST',
    url: 'http://localhost:4200/welcome',
    form:true,
    failOnStatusCode: false,
    body: {
        email: 'user@user.com',
        password: 'uSer*Password1',
    }
  })
    .then((resp) => {
      cy.window().then(win => win.localStorage.setItem('token', resp.body.token))
      console.log(resp.body.token)
    })
  cy.get('input').eq(0).clear().type('user@user.com')
  cy.get('input').eq(1).clear().type('uSer*Password1')
  cy.get("button").contains("Log in").click();
})


Cypress.Commands.add('completeStoryForm',()=>{
    cy.get('input[id=title]').clear().type("Title")
    cy.get('textarea').eq(0).clear().type('This is a description. And it is working')
    cy.get('mat-select').eq(0).click().get('mat-option').contains('Romance').click()
    cy.get('mat-select').eq(1).click().get('mat-option').contains('Horror').click()
    cy.get('mat-select').eq(2).click().get('mat-option').first().click()
    cy.get('mat-select').eq(3).click().get('mat-option').first().click()
    cy.get('input[type=color]')
      .invoke('val', '#d77c79')
      .trigger('input')
    cy.get("button").contains('Create').click()

})
