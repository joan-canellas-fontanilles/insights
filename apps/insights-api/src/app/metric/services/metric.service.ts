import { Injectable } from '@nestjs/common';
import { CreateMetricRequestDto } from '../dto/requests/create-metric-request.dto';
import {
  CreateMetricResponse,
  GetAllMetricsResponse,
} from '@insights/insights-api-data';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricDtoMapperService } from '../mapper/metric-dto-mapper.service';
import { MetricAlreadyExists } from '../exceptions/metric-already-exists.exception';

@Injectable()
export class MetricService {
  constructor(
    private readonly metricRepository: MetricRepositoryService,
    private readonly metricDtoMapper: MetricDtoMapperService
  ) {}

  public async getAll(): Promise<GetAllMetricsResponse> {
    const metrics = await this.metricRepository.findAll();
    return metrics.map((metric) => this.metricDtoMapper.fromEntity(metric));
  }

  public async create({
    name,
  }: CreateMetricRequestDto): Promise<CreateMetricResponse> {
    const exists = await this.metricRepository.existsByName(name);

    if (exists) {
      throw new MetricAlreadyExists();
    }

    const metric = await this.metricRepository.create(name);

    return this.metricDtoMapper.fromEntity(metric);
  }
}
