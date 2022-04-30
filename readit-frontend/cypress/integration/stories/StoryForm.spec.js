beforeEach(() => {
  cy.request('POST', Cypress.env("API_URL") + '/auth/login', cy.fixture('login'))
    .its('body')
    .as('currentUser')
  // CLEAR INPUTS
  for(let i = 0; i < 8; i++){
    _getInput(i).clear()
  }
})
describe('LoginForm Test', () => {
  it("Should load", () => {
    cy.get('p').contains('Story cover image').should('exist')
  });

})

function _getInput(inputNumber){
  return cy.get('input').eq(inputNumber);
}
