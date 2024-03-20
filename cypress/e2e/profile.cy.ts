describe('template spec', () => {
  it('passes', () => {
    cy.setUpApi();
    cy.visit('/');
  });
});
