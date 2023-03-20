import { Test, TestingModule } from '@nestjs/testing';
import { MetricService } from './metric.service';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricEntity } from '../db/metric.entity';
import { MetricDto } from '../dto/metric.dto';
import { MetricAlreadyExists } from '../exceptions/metric-already-exists.exception';

describe('MetricService', () => {
  let service: MetricService;
  let repository: MetricRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricService,
        {
          provide: MetricRepositoryService,
          useValue: new MetricRepositoryService(null),
        },
      ],
    }).compile();

    service = module.get<MetricService>(MetricService);
    repository = module.get<MetricRepositoryService>(MetricRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw a BadRequestException if a metric is found with the same name', async () => {
      jest.spyOn(repository, 'existsByName').mockResolvedValue(true);

      await expect(() => service.create({ name: 'test' })).rejects.toThrowError(
        MetricAlreadyExists
      );
    });

    it('should returns the new metric on success', async () => {
      jest.spyOn(repository, 'existsByName').mockResolvedValue(false);
      const entity = new MetricEntity();
      entity.id = '69b215b6-fb75-4600-97c3-f4736510bd8d';
      entity.name = 'test';
      jest.spyOn(repository, 'create').mockResolvedValue(entity);

      const result = await service.create({ name: 'test' });

      expect(result).toEqual(
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
      );
    });
  });
});
