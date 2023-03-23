import {
  getCreateMetric,
  getCreateMetricButton,
  getCreateMetricInput,
  getCreateMetricValue,
  getCreateMetricValueButton,
  getCreateMetricValueTime,
  getCreateMetricValueValue,
  getSelector,
  getSelectorOption,
} from '../support/metric-manager.po';

describe('insights-client', () => {
  const metricId = Cypress._.random(0, 200);
  const metricName = `Metric ${metricId}`;

  beforeEach(() => cy.visit('/metrics'));

  it('should be able to access', () => {
    cy.location('pathname').should('eq', '/metrics');
  });

  describe('create metric', () => {
    it('should display the input', () => {
      getCreateMetric().should('exist');
      getCreateMetricInput().should('exist');
      getCreateMetricButton().should('exist');
    });

    it('should be able to create a new metric', () => {
      cy.intercept('POST', '/api/v1/metric').as('create-metric');
      getCreateMetricInput().type(metricName);
      getCreateMetricButton().click();

      cy.wait('@create-metric').then((intercept) => {
        expect(intercept?.response?.statusCode).to.eq(201);
      });
    });
  });

  describe('metric selector', () => {
    it('should display the element', () => {
      getSelector().should('exist');
    });

    it('should be able to change the selected metric', () => {
      getSelector().click();
      getSelectorOption(metricName).click();
      getCreateMetricButton().click();
      getSelectorOption(metricName).should('not.be.visible');
    });

    it('should make visible the create metric menu', () => {
      getSelector().click();
      getSelectorOption(metricName).click();
      getCreateMetricValue().should('exist');
    });
  });

  describe('create metric value', () => {
    it('should display the inputs', () => {
      getSelector().click();
      getSelectorOption(metricName).click();
      getCreateMetricValue().should('exist');
      getCreateMetricValueValue().should('exist');
      getCreateMetricValueTime().should('exist');
      getCreateMetricValueButton().should('exist');
    });

    it('should be able to create a new metric', () => {
      getSelector().click();
      getSelectorOption(metricName).click();
      cy.intercept('POST', '/api/v1/metric/*/value').as('create-metric-value');
      getCreateMetricValueValue().type('300');
      getCreateMetricValueTime().type('2023-03-20T05:55');
      getCreateMetricValueButton().click();

      cy.wait('@create-metric-value').then((intercept) => {
        expect(intercept?.response?.statusCode).to.eq(201);
      });
    });
  });
});
