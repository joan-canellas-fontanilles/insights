import { Injectable } from '@nestjs/common';
import { MetricValueEntity } from '../db/metric-value.entity';
import { MetricValueDto } from '../dto/metric-value.dto';

@Injectable()
export class MetricValueDtoMapperService {
  public fromEntity(entity: MetricValueEntity): MetricValueDto {
    return new MetricValueDto(
      entity.id,
      entity.value,
      entity.timestamp,
      entity.metric.id
    );
  }
}
