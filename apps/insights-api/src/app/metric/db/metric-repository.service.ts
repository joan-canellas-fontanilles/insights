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

  public async findById(id: string): Promise<MetricEntity | null> {
    return this.metricRepository.findOneBy({ id });
  }

  public async existsByName(name: string): Promise<boolean> {
    const metric = await this.metricRepository.findOneBy({ name });
    return metric !== null;
  }

  public async create(name: string): Promise<MetricEntity> {
    const entity = new MetricEntity();
    entity.name = name;
    await this.metricRepository.insert(entity);
    return entity;
  }
}
