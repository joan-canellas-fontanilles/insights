import { Test, TestingModule } from '@nestjs/testing';
import { MetricValueService } from './metric-value.service';
import { MetricValueRepositoryService } from '../db/metric-value-repository.service';
import { MetricNotFoundException } from '../exceptions/metric-not-found.exception';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricEntity } from '../db/metric.entity';
import { MetricValueDto } from '../dto/metric-value.dto';
import { MetricValueEntity } from '../db/metric-value.entity';
import { MetricValueDtoMapperService } from '../mappers/metric-value-dto-mapper.service';

describe('MetricValueService', () => {
  let service: MetricValueService;
  let metricRepository: MetricRepositoryService;
  let repository: MetricValueRepositoryService;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-03-20'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricValueService,
        MetricValueDtoMapperService,
        {
          provide: MetricRepositoryService,
          useValue: new MetricRepositoryService(null),
        },
        {
          provide: MetricValueRepositoryService,
          useValue: new MetricValueRepositoryService(null),
        },
      ],
    }).compile();

    service = module.get<MetricValueService>(MetricValueService);
    metricRepository = module.get<MetricRepositoryService>(
      MetricRepositoryService
    );
    repository = module.get<MetricValueRepositoryService>(
      MetricValueRepositoryService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const metric = new MetricEntity();
    metric.id = '69b215b6-fb75-4600-97c3-f4736510bd8d';
    metric.name = 'test';

    beforeEach(() => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation(
          (metric: MetricEntity, value: number, timestamp: Date) => {
            const metricValue = new MetricValueEntity();
            metricValue.id = '255b02d2-228e-40a4-af41-51c6bced733a';
            metricValue.value = value;
            metricValue.timestamp = timestamp;
            metricValue.metric = metric;
            return Promise.resolve(metricValue);
          }
        );
    });

    it('should throw a MetricNotFound if the metric is not found ', async () => {
      jest.spyOn(metricRepository, 'findById').mockResolvedValue(null);

      await expect(() =>
        service.create('69b215b6-fb75-4600-97c3-f4736510bd8d', {
          value: 10,
          timestamp: new Date('2023-03-20'),
        })
      ).rejects.toThrowError(MetricNotFoundException);
    });

    it('should returns the new metric value on success', async () => {
      jest.spyOn(metricRepository, 'findById').mockResolvedValue(metric);

      const result = await service.create(
        '69b215b6-fb75-4600-97c3-f4736510bd8d',
        { value: 10, timestamp: new Date('2023-03-19') }
      );

      expect(result).toEqual(
        new MetricValueDto(
          '255b02d2-228e-40a4-af41-51c6bced733a',
          10,
          new Date('2023-03-19'),
          '69b215b6-fb75-4600-97c3-f4736510bd8d'
        )
      );
    });

    it('should returns the new metric value on success and assign the current date as timestamp', async () => {
      jest.spyOn(metricRepository, 'findById').mockResolvedValue(metric);

      const result = await service.create(
        '69b215b6-fb75-4600-97c3-f4736510bd8d',
        { value: 10, timestamp: undefined }
      );

      expect(result).toEqual(
        new MetricValueDto(
          '255b02d2-228e-40a4-af41-51c6bced733a',
          10,
          new Date('2023-03-20'),
          '69b215b6-fb75-4600-97c3-f4736510bd8d'
        )
      );
    });
  });
});
