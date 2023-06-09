import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricEntity } from './metric.entity';

@Injectable()
export class MetricRepositoryService {
  constructor(
    @InjectRepository(MetricEntity)
    private metricRepository: Repository<MetricEntity>
  ) {}

  public async findAll(): Promise<MetricEntity[]> {
    return this.metricRepository.find();
  }

  public async findById(id: string): Promise<MetricEntity | null> {
    return this.metricRepository.findOneBy({ id });
  }

  public async findByName(name: string): Promise<MetricEntity | null> {
    return this.metricRepository.findOneBy({ name });
  }

  public async create(name: string): Promise<MetricEntity> {
    const entity = new MetricEntity();
    entity.name = name;
    await this.metricRepository.insert(entity);
    return entity;
  }

  public async update(
    metric: MetricEntity,
    name: string
  ): Promise<MetricEntity> {
    metric.name = name;
    await this.metricRepository.save(metric);
    return metric;
  }
}
