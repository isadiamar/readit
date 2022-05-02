// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

beforeEach(()=>{

  _setupDefaultApiResponses();
  cy.viewport(1920, 1080)
  localStorage.clear();
  cy.visit("/")
})

function _setupDefaultApiResponses(){

  // LOGIN
  cy.intercept('POST', Cypress.env("API_URL") + '/auth/login', {
    statusCode: 200,
  })

  // SIGNUP
  cy.intercept('POST', Cypress.env("API_URL") + '/auth/register', {
    statusCode: 200,
    fixture: 'auth.json'
  })


}
