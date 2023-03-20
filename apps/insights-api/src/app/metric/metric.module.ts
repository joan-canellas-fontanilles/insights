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
import { MetricQueryController } from './metric-query.controller';
import { MetricQueryService } from './services/metric-query.service';
import { MetricQueryRepositoryService } from './db/metric-query-repository.service';
import { MetricQueryDtoMapperService } from './mappers/metric-query-dto-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetricEntity, MetricValueEntity])],
  controllers: [MetricController, MetricValueController, MetricQueryController],
  providers: [
    MetricService,
    MetricRepositoryService,
    MetricDtoMapperService,
    MetricValueService,
    MetricValueRepositoryService,
    MetricValueDtoMapperService,
    MetricQueryService,
    MetricQueryRepositoryService,
    MetricQueryDtoMapperService,
  ],
})
export class MetricModule {}
