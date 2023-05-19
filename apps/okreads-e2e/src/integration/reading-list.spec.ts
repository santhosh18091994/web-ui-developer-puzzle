describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('Undo feature for adding and removing book to reading list', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I could able to undo the book adding to reading list', () => {
      cy.get('input[type="search"]').type('python');
      cy.get('form').submit();
      cy.get('[data-testing="RQ6xDwAAQBAJ"]').eq(0).then(($ele)=>{
          if($ele[0].hasAttribute('disabled')){
            cy.get('[data-testing="toggle-reading-list"]').click();
            cy.get('[data-testing="remove-reading-list-RQ6xDwAAQBAJ"]').click();
            cy.get('[data-testing="toggle-reading-list-cross"]').eq(0).click();
          }
      });
      cy.wait(3000);
      cy.get('[data-testing="RQ6xDwAAQBAJ"]').eq(0).click();
      cy.get('.mat-simple-snackbar-action > button').click();
      cy.get('[data-testing="RQ6xDwAAQBAJ"]').eq(0).should('not.be.disabled');
  });

  it('I could able to undo the remove book from reading list', () => {
      cy.get('input[type="search"]').type('python');
      cy.get('form').submit();
      cy.get('[data-testing="RQ6xDwAAQBAJ"]').eq(0).then(($elem)=>{
        if($elem[0].hasAttribute('disabled')){
          cy.get('[data-testing="toggle-reading-list"]').click();
          cy.get('[data-testing="remove-reading-list-RQ6xDwAAQBAJ"]').click();
          cy.get('.mat-simple-snackbar-action > button').click();
          cy.get('[data-testing="remove-reading-list-RQ6xDwAAQBAJ"]').should('exist');
        }else{
          cy.get('[data-testing="RQ6xDwAAQBAJ"]').eq(0).click();
          cy.wait(3000);
          cy.get('[data-testing="toggle-reading-list"]').click();
          cy.get('[data-testing="remove-reading-list-RQ6xDwAAQBAJ"]').eq(0).click();
          cy.get('.mat-simple-snackbar-action > button').click();
          cy.get('[data-testing="remove-reading-list-RQ6xDwAAQBAJ"]').should('exist');
        }
      });   
  });
})
