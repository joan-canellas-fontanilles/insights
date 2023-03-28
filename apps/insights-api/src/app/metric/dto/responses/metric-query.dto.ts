import { MetricDataDto } from './metric-data.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MetricQueryDto {
  @ApiProperty({
    description: 'Metric uuid of the retrieved query data',
  })
  public readonly metric: string;

  @ApiProperty({
    description: 'List of retrieved query data for this metric',
    type: MetricDataDto,
    isArray: true,
  })
  public readonly data: MetricDataDto[];

  constructor(metric: string, data: MetricDataDto[]) {
    this.metric = metric;
    this.data = data;
  }
}
