beforeEach(()=>{
  cy.login()
  cy.completeStoryForm()
})

describe('StoryTest',()=>{
  it('should load',  () => {
    _assertTextExists('Item')
  });
})
function _assertTextExists(text) {
  cy.contains(text).should('exist')
}
