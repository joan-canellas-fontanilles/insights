import { Injectable } from '@nestjs/common';
import { MetricValueRepositoryService } from '../db/metric-value-repository.service';
import {
  CreateMetricValueRequestBody,
  CreateMetricValueResponse,
} from '@insights/insights-api-data';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricNotFoundException } from '../exceptions/metric-not-found.exception';
import { MetricValueDtoMapperService } from '../mappers/metric-value-dto-mapper.service';

@Injectable()
export class MetricValueService {
  constructor(
    private readonly metricRepository: MetricRepositoryService,
    private readonly metricValueRepository: MetricValueRepositoryService,
    private readonly metricValueDtoMapper: MetricValueDtoMapperService
  ) {}

  public async create(
    metricId: string,
    { value, timestamp }: CreateMetricValueRequestBody
  ): Promise<CreateMetricValueResponse> {
    const metric = await this.metricRepository.findById(metricId);

    if (metric === null) {
      throw new MetricNotFoundException();
    }

    const metricValue = await this.metricValueRepository.create(
      metric,
      value,
      timestamp ?? new Date()
    );
    return this.metricValueDtoMapper.fromEntity(metricValue);
  }
}
