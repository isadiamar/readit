beforeEach(()=>{
  cy.login()
  cy.wait(500)
  cy.createStory('Create a new story')
})

describe('Create Story Test', () => {
  it("Should load", () => {
    _assertTextExists('USER')
  });

  it("Submit button should be disabled when title is less than three letters", ()=>{
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

  it("Should create Story", ()=>{
    _fillInputsValid()
    cy.get("button").contains('Create').click()
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

function _assertTextExists(text) {
  cy.contains(text).should('exist')
}

function _fillInputsValid(){
  _getInput(2).clear().type('Title');
  _getTextarea(0).eq(0).clear().type('TThis is a description for a test')
  _getSelect(0).click().get('mat-option').contains('Romance').click()
  _getSelect(1).click().get('mat-option').contains('Comedy').click()
  _getSelect(2).click().get('mat-option').first().click()
  _getSelect(3).click().get('mat-option').first().click()
  cy.get('input[type=color]')
    .invoke('val', '#139086')
    .trigger('change').click()
}

