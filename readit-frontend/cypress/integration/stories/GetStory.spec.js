beforeEach(()=>{
  cy.login()
  cy.wait(500)

  //CREATE STORIES
  cy.intercept('POST', Cypress.env("API_URL") + '/private/stories/new', {
    statusCode: 200,
    fixture:'story.json'
  })
})

describe('StoryTest',()=>{
  it('should load',  () => {
    cy.createStory('Create a new story')

    cy.completeStoryForm()

    cy.wait(500)

    //GET STORY
    cy.intercept('GET', Cypress.env("API_URL") + '/private/stories/*', {
      statusCode: 200,
      fixture:'story.json'
    })

    _assertTextExists('Test Title')
    _assertTextExists('This is a description for a test')
    _assertTextExists('user')
    _assertTextExists('Complete')
  });
})

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}
