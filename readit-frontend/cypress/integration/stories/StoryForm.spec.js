beforeEach(()=>{
  _fillInputsValidLogin()
  _clickSubmitButtonLogin()
})

describe('LoginForm Test', () => {
  it("Should load", () => {
    _assertTextExists('USER')
  });

  it("Submit button should be disabled when title is less than three letters", ()=>{
    _fillInputsValid()
    let titleInput = _getInput(2)
    titleInput.clear().type('no')
    cy.get("button").contains('Create').parent().should('be.disabled')
  })

  it("Submit button should be disabled when description is less than 15 letters", ()=>{
    _fillInputsValid()
    let description = _getTextarea(0)
    description.clear().type('Not valid')
    cy.get("button").contains('Create').parent().should('be.disabled')
  })
})

function _getInput(inputNumber){
  return cy.get('input').eq(inputNumber);
}

function _getTextarea(textareaNumber){
  return cy.get('textarea').eq(textareaNumber);
}

function _getSelect(selectNumber){
  return cy.get('mat-select').eq(selectNumber);
}

function _fillInputsValidLogin() {
  _getInput(0).clear().type('user2@email.com') // Email
  _getInput(1).clear().type('password') // Password
}

function _clickSubmitButtonLogin() {
  cy.get("button").contains("Log in").click();
}

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

function _fillInputsValid(){
  _getInput(2).clear().type('Title');
  _getTextarea(0).clear().type('This is a description. And it is working')
  _getSelect(0).click().get('mat-option').contains('Romance').click()
  _getSelect(1).click().get('mat-option').contains('Horror').click()
  _getSelect(2).click().get('mat-option').first().click()
  _getSelect(3).click().get('mat-option').first().click()
}
