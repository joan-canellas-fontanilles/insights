describe('insights-client', () => {
  beforeEach(() => cy.visit('/'));

  it('should be redirected to dashboard', () => {
    cy.location('pathname').should('eq', '/dashboard');
  });
});
