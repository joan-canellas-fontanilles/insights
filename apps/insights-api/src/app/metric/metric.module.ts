import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricService } from './services/metric.service';
import { MetricDtoMapperService } from './mapper/metric-dto-mapper.service';
import { MetricEntity } from './db/metric.entity';
import { MetricController } from './metric.controller';
import { MetricRepositoryService } from './db/metric-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetricEntity])],
  controllers: [MetricController],
  providers: [MetricService, MetricRepositoryService, MetricDtoMapperService],
})
export class MetricModule {}
