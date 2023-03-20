import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricService } from './services/metric.service';
import { MetricDtoMapperService } from './mappers/metric-dto-mapper.service';
import { MetricEntity } from './db/metric.entity';
import { MetricController } from './metric.controller';
import { MetricRepositoryService } from './db/metric-repository.service';
import { MetricValueController } from './metric-value.controller';
import { MetricValueService } from './services/metric-value.service';
import { MetricValueRepositoryService } from './db/metric-value-repository.service';
import { MetricValueDtoMapperService } from './mappers/metric-value-dto-mapper.service';
import { MetricValueEntity } from './db/metric-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetricEntity, MetricValueEntity])],
  controllers: [MetricController, MetricValueController],
  providers: [
    MetricService,
    MetricRepositoryService,
    MetricDtoMapperService,
    MetricValueService,
    MetricValueRepositoryService,
    MetricValueDtoMapperService,
  ],
})
export class MetricModule {}
