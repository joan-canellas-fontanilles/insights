import { TestBed } from '@angular/core/testing';

import { MetricSelectorService } from './metric-selector.service';

describe('MetricSelectorService', () => {
  let service: MetricSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array by default', (done) => {
    service.get().subscribe((metricIds) => {
      expect(metricIds.length).toEqual(0);
      done();
    });
  });

  it('should add a metricId on add call', (done) => {
    service.add('2e015fd6-f785-4625-a587-be35c625f398');
    service.get().subscribe((metricIds) => {
      expect(metricIds).toEqual(['2e015fd6-f785-4625-a587-be35c625f398']);
      done();
    });
  });

  it('should only add once if an id is inserted multiple times', (done) => {
    service.add('2e015fd6-f785-4625-a587-be35c625f398');
    service.add('8323b3f8-7e69-4394-906f-52f39a9d69bc');
    service.add('8323b3f8-7e69-4394-906f-52f39a9d69bc');
    service.get().subscribe((metricIds) => {
      expect(metricIds).toEqual([
        '2e015fd6-f785-4625-a587-be35c625f398',
        '8323b3f8-7e69-4394-906f-52f39a9d69bc',
      ]);
      done();
    });
  });

  it('should be able to remove a metricId on remove', (done) => {
    service.add('2e015fd6-f785-4625-a587-be35c625f398');
    service.add('8323b3f8-7e69-4394-906f-52f39a9d69bc');
    service.remove('8323b3f8-7e69-4394-906f-52f39a9d69bc');
    service.get().subscribe((metricIds) => {
      expect(metricIds).toEqual(['2e015fd6-f785-4625-a587-be35c625f398']);
      done();
    });
  });

  it('should be not remove anything if the metricId provided is not in the array', (done) => {
    service.add('2e015fd6-f785-4625-a587-be35c625f398');
    service.remove('8323b3f8-7e69-4394-906f-52f39a9d69bc');
    service.get().subscribe((metricIds) => {
      expect(metricIds).toEqual(['2e015fd6-f785-4625-a587-be35c625f398']);
      done();
    });
  });
});
