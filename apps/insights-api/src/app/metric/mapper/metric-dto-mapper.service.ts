import { Injectable } from '@nestjs/common';
import { MetricEntity } from '../db/metric.entity';
import { MetricDto } from '../dto/metric.dto';

@Injectable()
export class MetricDtoMapperService {
  public fromEntity(entity: MetricEntity): MetricDto {
    return new MetricDto(entity.id, entity.name);
  }
}
