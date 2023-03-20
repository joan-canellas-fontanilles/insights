import { Test, TestingModule } from '@nestjs/testing';
import { MetricQueryService } from './metric-query.service';
import { MetricQueryRepositoryService } from '../db/metric-query-repository.service';
import {
  AggregationType,
  MetricQuery,
  TimePeriod,
} from '@insights/insights-api-data';
import { MetricQueryDtoMapperService } from '../mappers/metric-query-dto-mapper.service';

describe('MetricQueryService', () => {
  let service: MetricQueryService;
  let repository: MetricQueryRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricQueryService,
        MetricQueryDtoMapperService,
        {
          provide: MetricQueryRepositoryService,
          useValue: new MetricQueryRepositoryService(null),
        },
      ],
    }).compile();

    service = module.get<MetricQueryService>(MetricQueryService);
    repository = module.get<MetricQueryRepositoryService>(
      MetricQueryRepositoryService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transform the returned query data to a valid response', async () => {
    const metricId1 = '1f41a45d-7062-4267-97e6-380f0976d29f';
    const metricId2 = '765f4a2b-cbdd-4e48-a996-8b1cdeda3eaf';
    jest.spyOn(repository, 'query').mockResolvedValue([
      { metricId: metricId1, value: '10', timePeriod: '2023-03-20 15:00:00' },
      { metricId: metricId1, value: '20', timePeriod: '2023-03-20 16:00:00' },
      { metricId: metricId1, value: '30', timePeriod: '2023-03-20 17:00:00' },

      { metricId: metricId2, value: '40', timePeriod: '2023-03-20 15:00:00' },
      { metricId: metricId2, value: '50', timePeriod: '2023-03-20 16:00:00' },
      { metricId: metricId2, value: '60', timePeriod: '2023-03-20 17:00:00' },
    ]);

    const response = await service.metricQuery(
      new MetricQuery({
        metricIds: [metricId1, metricId2],
        group: TimePeriod.Hour,
        timeFilter: {
          from: new Date('2023-03-20 15:00:00'),
          to: new Date('2023-03-20 17:59:59'),
        },
        aggregation: AggregationType.Average,
      })
    );

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
