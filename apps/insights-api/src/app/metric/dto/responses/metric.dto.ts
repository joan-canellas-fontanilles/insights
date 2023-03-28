import { MetricResponse } from '@insights/insights-api-data';
import { ApiProperty } from '@nestjs/swagger';

export class MetricDto implements MetricResponse {
  @ApiProperty({
    description: 'Metric unique identifier',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'Name of the metric',
  })
  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
