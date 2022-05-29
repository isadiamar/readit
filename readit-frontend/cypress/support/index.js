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
  cy.visit("/welcome")
})

function _setupDefaultApiResponses(){

  // LOGIN
  cy.intercept('POST', Cypress.env("API_URL") + '/auth/login', {
    statusCode: 200,
    fixture: 'auth.json'
  })

  // SIGNUP
  cy.intercept('POST', Cypress.env("API_URL") + '/auth/register', {
    statusCode: 200,
    fixture: 'auth.json'
  })

  //CREATE STORIES
  cy.intercept('POST', Cypress.env("API_URL") + '/private/stories/new', {
    statusCode: 200,
    fixture:'story.json'
  })

  //GET STORY
  cy.intercept('GET', Cypress.env("API_URL") + '/private/stories/*', {
    statusCode: 200,
    fixture:'story.json'
  })

  //GET ALL STORIES
  cy.intercept('GET', Cypress.env("API_URL") + '/private/stories', {
    statusCode: 200,
    fixture:'stories.json'
  })

  //DELETE STORY
  cy.intercept('DELETE', Cypress.env("API_URL") + '/private/stories/*', {
    statusCode: 200
  })

  //UPDATE STORY
  cy.intercept('PUT', Cypress.env("API_URL") + '/private/stories/*', {
    statusCode: 200,
    fixture:'story.json'
  })

  //CREATE EPISODE
  cy.intercept('POST', Cypress.env("API_URL") + '/private/episodes/new', {
    statusCode:200,
    fixture:'episode.json'
  })

  //GET EPISODE
  cy.intercept('GET', Cypress.env("API_URL") + '/private/episodes/*/from/*', {
    statusCode:200,
    fixture:'episode.json'
  })

  //GET ALL EPISODES
  cy.intercept('GET', Cypress.env("API_URL") + '/private/episodes?storyId=*',{
    statusCode:200,
    fixture:'episodes.json'
  })

  //DELETE EPISODE
  cy.intercept('DELETE', Cypress.env("API_URL") + '/private/episodes?storyId=*&episode_id=*',{
    statusCode:200
  })

}
