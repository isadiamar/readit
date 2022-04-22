beforeEach(() => {
  // CLEAR INPUTS
  for(let i = 0; i < 2; i++){
    _getInput(i).clear()
  }
})

describe('LoginForm Test', () =>{
  it("Should load", () =>{
    cy.get('h1').contains('Welcome back!').should('exist')
  })

  it('Submit Button should be disabled with empty input', () => {
    cy.get('button').should('be.disabled')
  })

  it('Should give error with invalid email', () => {
    _fillInputsValid()

    let emailInput = _getInput(0)
    emailInput.clear().type('invalidMail@bad')
    _clickSubmitButton()

  })

  it('Should give server error when email dont exists', () => {
    cy.intercept('POST',  Cypress.env("API_URL") + '/auth/login', {
      statusCode: 403,
      body: {error: "ForbiddenException", message: "Forbidden Exception: Email or password are wrong", code:403}
    })
    _fillInputsValid()

    let emailInput = _getInput(0)
    emailInput.clear().type('notExistingEmail@test.com')
    _clickSubmitButton()
    _assertTextExists('Email or password are wrong')
  })

  it('Should give server error when password dont exists', () => {
    cy.intercept('POST', Cypress.env("API_URL") + '/auth/login', {
      statusCode: 403,
      body: {error: "ForbiddenException", message: "Forbidden Exception: Email or password are wrong", code:403}
    })
    _fillInputsValid()

    let passwordInput = _getInput(1)
    passwordInput.clear().type('passwordNotExists')
    _clickSubmitButton()
    _assertTextExists('Email or password are wrong')
  })

})

function _getInput(inputNumber){
  return cy.get('input').eq(inputNumber);
}

function _fillInputsValid() {
  _getInput(0).clear().type('user2@email.com') // Email
  _getInput(1).clear().type('password') // Password
}

function _clickSubmitButton() {
  cy.contains("Log in").click();
}

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

