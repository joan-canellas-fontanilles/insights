import { MetricIdPipe } from './metric-id.pipe';
import { InvalidMetricIdException } from '../exceptions/invalid-metric-id.exception';

describe('MetricIdPipe', () => {
  it('should be defined', () => {
    expect(new MetricIdPipe()).toBeDefined();
  });

  it('should return the value without errors if it is a valid uuid', () => {
    expect(() =>
      new MetricIdPipe().transform('603f8acf-72c7-47d2-8126-9906a558f72e', null)
    ).not.toThrow();
  });

  it('should return an error if it is not a valid uuid', () => {
    expect(() =>
      new MetricIdPipe().transform('not-a-valid-uuid', null)
    ).toThrowError(InvalidMetricIdException);
  });
});
