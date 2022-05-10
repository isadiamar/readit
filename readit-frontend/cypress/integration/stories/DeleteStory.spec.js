beforeEach(() => {
  // GET STORIES REQUEST
  cy.intercept('GET', Cypress.env("API_URL") + '/private/stories', {
    statusCode: 200,
    fixture: 'stories.json'
  })

  //Navigate
  cy.login()
})

describe("Delete Story Test", ()=> {
  it('Should Delete Story', () => {
    cy.navigateToStories('My stories')

    // DELETE STORY REQUEST
    cy.intercept('DELETE', Cypress.env("API_URL") + '/private/stories/*', (req) => {
      req.reply({statusCode: 200})
    });

    cy.get("button[id = 'delete']").eq(1).click();

    // GET STORIES REQUEST
    cy.intercept('GET', Cypress.env("API_URL") + '/private/stories', {
      statusCode: 200,
      body: _resultBody()
    })

    cy.get("mat-dialog-container").should('exist')
    cy.get("button").contains("Yes").click()
    cy.get("mat-dialog-container").should('not.exist')

    cy.contains("Test 2 Title").should('not.exist')
  })

  it('Should Not Delete Story',  () =>{
    cy.navigateToStories('My stories')

    // DELETE STORY REQUEST
    cy.intercept('DELETE', Cypress.env("API_URL") + '/private/stories/*', (req) => {
      req.reply({statusCode: 200})
    });

    cy.get("button[id = 'delete']").eq(1).click();


    cy.get("mat-dialog-container").should('exist')
    cy.get("button").contains("No").click()
    cy.get("mat-dialog-container").should('not.exist')

    cy.contains("Test Title").should('exist')
    cy.contains("Test 2 Title").should('exist')
  });
});


function _getDeleteButton() {
  return cy.get("button").contains("Yes");
}

function _clickDeleteButton() {
  _getDeleteButton().click()
  cy.focused().click()
}


function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

function _resultBody(){
  return [{
    "id": 1,
    "title": "Test Title",
    "description": "This is a description for a test",
    "genre1": "ROMANCE",
    "genre2":"COMEDY",
    "privacy":"PRIVATE",
    "status":"COMPLETE",
    "color":"#139086",
    "username": "user"
  }
  ]

}
