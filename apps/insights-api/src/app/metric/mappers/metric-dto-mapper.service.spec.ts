import { Test, TestingModule } from '@nestjs/testing';
import { MetricDtoMapperService } from './metric-dto-mapper.service';
import { MetricEntity } from '../db/metric.entity';
import { MetricDto } from '../dto/metric.dto';

describe('MetricDtoMapperService', () => {
  let service: MetricDtoMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricDtoMapperService],
    }).compile();

    service = module.get<MetricDtoMapperService>(MetricDtoMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fromEntity', () => {
    it('should return a MetricDto from a entity class', () => {
      const entity = new MetricEntity();
      entity.id = '69b215b6-fb75-4600-97c3-f4736510bd8d';
      entity.name = 'test';
      const metricDto = service.fromEntity(entity);

      expect(metricDto).toEqual(
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
      );
    });
  });
});
