import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricValueEntity } from './metric-value.entity';
import { MetricEntity } from './metric.entity';

@Injectable()
export class MetricValueRepositoryService {
  constructor(
    @InjectRepository(MetricValueEntity)
    private metricValueRepository: Repository<MetricValueEntity>
  ) {}

  public async create(
    metric: MetricEntity,
    value: number,
    timestamp: Date
  ): Promise<MetricValueEntity> {
    const entity = new MetricValueEntity();
    entity.metric = metric;
    entity.value = value;
    entity.timestamp = timestamp;
    await this.metricValueRepository.insert(entity);
    return entity;
  }
}
