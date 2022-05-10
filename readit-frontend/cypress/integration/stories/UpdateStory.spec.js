beforeEach(() => {
  // GET STORIES REQUEST
  cy.intercept('GET', Cypress.env("API_URL") + '/private/stories', {
    statusCode: 200,
    fixture: 'stories.json'
  })

  //Navigate
  cy.login()
  cy.navigateToStories("My stories")

})


describe("Update Story Test", ()=> {
  it('Should Open Story', () => {

    cy.intercept('GET', Cypress.env("API_URL") + '/private/stories/*', (req) => {
      req.reply({statusCode: 200, fixture: 'story.json'})
    });

    cy.get("button[id = 'update']").eq(0).click();
    cy.get('input[id=title]').clear().type("Test Edited Title")

    cy.get("button").contains('Edit').parent().should('be.enabled')

  })

  it('Should Update Story', () => {

    cy.intercept('GET', Cypress.env("API_URL") + '/private/stories/*', (req) => {
      req.reply({statusCode: 200, fixture: 'story.json'})
    });

    cy.get("button[id = 'update']").eq(0).click();
    cy.get('input[id=title]').clear().type("Test Edited Title")
    cy.get('mat-select').eq(0).click().get('mat-option').contains('Horror').click()

    cy.intercept('GET', Cypress.env("API_URL") + '/private/stories/*', (req) => {
      req.reply({statusCode: 200, body: updatedStory()})
    });

    cy.get("button").contains('Edit').click()
    _assertTextExists("Test Edited Title")
  })

});

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

function updatedStory() {
  return {
    "id": 1,
    "title": "Test Edited Title",
    "description": "This is a description for a test",
    "genre1": "HORROR",
    "genre2":"COMEDY",
    "privacy":"PRIVATE",
    "status":"COMPLETE",
    "color":"#139086",
    "username": "user"
  }

}
