import { Test, TestingModule } from '@nestjs/testing';
import { MetricValueDtoMapperService } from './metric-value-dto-mapper.service';

describe('MetricValueDtoMapperService', () => {
  let service: MetricValueDtoMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricValueDtoMapperService],
    }).compile();

    service = module.get<MetricValueDtoMapperService>(
      MetricValueDtoMapperService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
