describe('ListStories Test', ()=> {

  it("Should load", () => {
    // GET STORIES REQUEST
    cy.intercept('GET', Cypress.env("API_URL") + 'private/stories', {
      statusCode: 200,
      fixture: 'stories.json'
    })

    cy.login()
    cy.wait(500)
    cy.navigateToStories('My stories')

    _assertTextExists('Open')
    _assertTextExists('New Chapter')
    _assertTextExists('Delete')
  });

});

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}
