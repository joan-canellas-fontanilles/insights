import { Test, TestingModule } from '@nestjs/testing';
import { MetricQueryDtoMapperService } from './metric-query-dto-mapper.service';
import {
  AggregationType,
  MetricQuery,
  TimePeriod,
} from '@insights/insights-api-data';

describe('MetricQueryDtoMapperService', () => {
  let service: MetricQueryDtoMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricQueryDtoMapperService],
    }).compile();

    service = module.get<MetricQueryDtoMapperService>(
      MetricQueryDtoMapperService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map the returned query data to a metric query dto', async () => {
    const metricId1 = '1f41a45d-7062-4267-97e6-380f0976d29f';
    const metricId2 = '765f4a2b-cbdd-4e48-a996-8b1cdeda3eaf';

    const query = new MetricQuery({
      metricIds: [metricId1, metricId2],
      group: TimePeriod.Hour,
      timeFilter: {
        from: new Date('2023-03-20 15:00:00'),
        to: new Date('2023-03-20 17:59:59'),
      },
      aggregation: AggregationType.Average,
    });
    const data = [
      { metricId: metricId1, value: '10', timePeriod: '2023-03-20 15:00:00' },
      { metricId: metricId1, value: '20', timePeriod: '2023-03-20 16:00:00' },
      { metricId: metricId1, value: '30', timePeriod: '2023-03-20 17:00:00' },

      { metricId: metricId2, value: '40', timePeriod: '2023-03-20 15:00:00' },
      { metricId: metricId2, value: '50', timePeriod: '2023-03-20 16:00:00' },
      { metricId: metricId2, value: '60', timePeriod: '2023-03-20 17:00:00' },
    ];

    const response = service.fromQuery(query, data);

    expect(response).toEqual([
      {
        metric: metricId1,
        data: [
          { value: 10, time: new Date('2023-03-20 15:00:00') },
          { value: 20, time: new Date('2023-03-20 16:00:00') },
          { value: 30, time: new Date('2023-03-20 17:00:00') },
        ],
      },
      {
        metric: metricId2,
        data: [
          { value: 40, time: new Date('2023-03-20 15:00:00') },
          { value: 50, time: new Date('2023-03-20 16:00:00') },
          { value: 60, time: new Date('2023-03-20 17:00:00') },
        ],
      },
    ]);
  });
});
