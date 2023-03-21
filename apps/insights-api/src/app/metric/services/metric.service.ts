import { Injectable } from '@nestjs/common';
import { CreateMetricRequestDto } from '../dto/requests/create-metric-request.dto';
import {
  CreateMetricResponse,
  GetAllMetricsResponse,
  GetMetricResponse,
  UpdateMetricResponse,
} from '@insights/insights-api-data';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricDtoMapperService } from '../mappers/metric-dto-mapper.service';
import { MetricAlreadyExists } from '../exceptions/metric-already-exists.exception';
import { MetricNotFoundException } from '../exceptions/metric-not-found.exception';
import { UpdateMetricRequestDto } from '../dto/requests/update-metric-request.dto';

@Injectable()
export class MetricService {
  constructor(
    private readonly metricRepository: MetricRepositoryService,
    private readonly metricDtoMapper: MetricDtoMapperService
  ) {}

  public async get(id: string): Promise<GetMetricResponse> {
    const metric = await this.metricRepository.findById(id);

    if (metric === null) {
      throw new MetricNotFoundException();
    }

    return this.metricDtoMapper.fromEntity(metric);
  }

  public async getAll(): Promise<GetAllMetricsResponse> {
    const metrics = await this.metricRepository.findAll();
    return metrics.map((metric) => this.metricDtoMapper.fromEntity(metric));
  }

  public async create({
    name,
  }: CreateMetricRequestDto): Promise<CreateMetricResponse> {
    const exists = await this.metricRepository.findByName(name);

    if (exists !== null) {
      throw new MetricAlreadyExists();
    }

    const metric = await this.metricRepository.create(name);

    return this.metricDtoMapper.fromEntity(metric);
  }

  public async update(
    id: string,
    { name }: UpdateMetricRequestDto
  ): Promise<UpdateMetricResponse> {
    const metric = await this.metricRepository.findById(id);

    if (metric === null) {
      throw new MetricNotFoundException();
    }

    const exists = await this.metricRepository.findByName(name);

    if (exists !== null && exists.id !== metric.id) {
      throw new MetricAlreadyExists();
    }

    const updatedMetric = await this.metricRepository.update(metric, name);

    return this.metricDtoMapper.fromEntity(updatedMetric);
  }
}
