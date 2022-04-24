beforeEach(()=>{
  //Navigate
  cy.contains("Not register? Do it here").click();
  // Clear inputs
  for(let i = 0; i < 4; i++){
    _getInput(i).clear()
  }
})

describe('RegisterForm Test', ()=>{
  it('Should load', () => {
    cy.get('h1').contains('Sign up here').should('exist')
  })

  it("Submit button should be disabled when inputs are empty", ()=>{
    cy.get("button").contains('Sign up').parent().should('be.disabled')
  })

  it("Submit button should be disabled when email format is wrong", ()=>{
    _fillInputsValid()
    let emailInput = _getInput(1)
    emailInput.clear().type('badEmail@bad')
    cy.get("button").contains('Sign up').parent().should('be.disabled')
  })

  it('Should give server error when email is in use', () => {
    cy.intercept('POST', Cypress.env("API_URL") + '/auth/register', {
      statusCode: 400,
      body: {code: "AU000", error: "BadRequestException", message:"Bad Request Exception. Invalid data input"}
    })
    _fillInputsValid()

    let emailInput = _getInput(0)
    emailInput.clear().type('user2@email.com')
    _clickSubmitButton()
    _assertTextExists('Invalid data input')
  })
})


function _getInput(inputNumber){
  return cy.get('input').eq(inputNumber);
}

function _clickSubmitButton() {
  cy.get("button").contains("Sign up").click();
}

function _fillInputsValid() {
  _getInput(0).clear().type('jtest') // Nickname
  _getInput(1).clear().type('jtest@email.com') // Email
  _getInput(2).clear().type('C0mplexpass!') // Password
  _getInput(3).clear().type('C0mplexpass!') // Repeat Password
}

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}
