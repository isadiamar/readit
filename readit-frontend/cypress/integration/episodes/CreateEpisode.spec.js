beforeEach(()=>{
  cy.login()
  cy.wait(500)
  cy.navigateToStories()
  // GET STORIES REQUEST
  cy.intercept('GET', Cypress.env("API_URL") + 'private/stories', {
    statusCode: 200,
    fixture: 'stories.json'
  })

  cy.get('button').contains('New Chapter').click()
})

describe('Create Episodes Test', () => {
  it("Should load", () => {
    _assertTextExists('Title')
    _assertTextExists('Upload Chapter')
  });

  it("Submit button should be disabled when title is less than three letters", ()=>{
    let titleInput = cy.get("input").eq(0)
    titleInput.clear().type('no')
    cy.get("button").contains('POST EPISODE').parent().should('be.disabled')
  })
  it("Should create Episode", ()=>{

    _fillInputsValid()
    cy.get("button").contains('POST EPISODE').click()
  })
})


function _assertTextExists(text) {
  cy.contains(text).should('exist')
}
function _fillInputsValid(){
  const fixture_pdf = 'lorem-ipsum.pdf';
  cy.get("input").eq(0).type("Episodio de prueba");
  cy.get('input[type=file]').attachFile(fixture_pdf);
}
