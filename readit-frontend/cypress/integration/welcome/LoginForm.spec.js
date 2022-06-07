beforeEach(() => {
  // CLEAR INPUTS
  for (let i = 0; i < 2; i++) {
    _getInput(i).clear()
  }
})

describe('LoginForm Test', () => {
  it("Should load", () => {
    cy.get('h1').contains('Welcome back!').should('exist')
  })

  it("Submit button should be disabled when inputs are empty", () => {
    cy.get("button").contains('Log in').parent().should('be.disabled')
  })

  it("Submit button should be disabled when email format is wrong", () => {
    _fillInputsValid()
    let emailInput = _getInput(0)
    emailInput.clear().type('badEmail@bad')
    cy.get("button").contains('Log in').parent().should('be.disabled')
  })

  it('Should give server error when email dont exists', () => {
    cy.intercept('POST', Cypress.env("API_URL") + '/auth/login', {
      statusCode: 403,
      body: {error: "ForbiddenException", message: "Forbidden Exception: Email or password are wrong", code: 403}
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
      body: {error: "ForbiddenException", message: "Forbidden Exception: Email or password are wrong", code: 403}
    })
    _fillInputsValid()

    let passwordInput = _getInput(1)
    passwordInput.clear().type('passwordNotExists')
    _clickSubmitButton()
    _assertTextExists('Email or password are wrong')
  })

  it('Should login', () => {
    _fillInputsValid()
    _clickSubmitButton()
    _assertTextExists('USER')
  })

})

function _getInput(inputNumber) {
  return cy.get('input').eq(inputNumber);
}

function _fillInputsValid() {
  _getInput(0).clear().type('user@user.com') // Email
  _getInput(1).clear().type('uSer*Password1') // Password
}

function _clickSubmitButton() {
  cy.get("button").contains("Log in").click();
}

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

