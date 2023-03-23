export const getSelector = () =>
  cy.get('.metric-page__selector').find(' insights-text-input');
export const getSelectorOption = (text: string) =>
  getSelector().get('.options > .option').contains(text);

export const getCreateMetric = () => cy.get('insights-create-metric-form');
export const getCreateMetricInput = () =>
  cy.get('.create-metric__input > .text-input');

export const getCreateMetricButton = () =>
  cy.get('insights-button > .insights-button').contains('New Metric');

export const getCreateMetricValue = () =>
  cy.get('insights-create-metric-value-form');

export const getCreateMetricValueValue = () =>
  getCreateMetricValue().find('input[type="number"]');

export const getCreateMetricValueTime = () =>
  getCreateMetricValue().find('input[type="datetime-local"]');

export const getCreateMetricValueButton = () =>
  getCreateMetricValue().find('button');
