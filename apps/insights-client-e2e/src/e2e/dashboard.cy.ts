import {
  getDashboard,
  getMetricSelector,
  getTimeFilter,
} from '../support/dashboard.po';

describe('insights-client', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should be able to access', () => {
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('should display the graph element and the selectors', () => {
    getDashboard().should('exist');
    getTimeFilter().should('exist');
    getMetricSelector().should('exist');
  });

  it('should the timeFilter contain the time options', () => {
    getTimeFilter().should('contain.text', 'Minute');
    getTimeFilter().should('contain.text', 'Hour');
    getTimeFilter().should('contain.text', 'Day');
  });

  it('should make a request to /metric-query on time options changed', () => {
    cy.clock(new Date(2020, 6, 24, 22, 19), ['Date']);
    cy.intercept('GET', '/api/v1/metric-query*').as('query');

    getTimeFilter().contains('Hour').click();

    cy.wait('@query').then((intercept) => {
      expect(intercept?.response?.statusCode).to.be.oneOf([200, 304]);
      expect(intercept.request.url).to.contain(
        'eyJtZXRyaWNJZHMiOltdLCJncm91cCI6Im1pbnV0ZSIsInRpbWVGaWx0ZXIiOnsiZnJvbSI6IjIwMjAtMDctMjRUMTk6NTk6MDAuMDAwWiIsInRvIjoiMjAyMC0wNy0yNFQyMDoxOTowMC4wMDBaIn19'
      );
    });
  });
});
