import { CreateMetricValueResponse } from '@insights/insights-api-data';
import { ApiProperty } from '@nestjs/swagger';

export class MetricValueDto implements CreateMetricValueResponse {
  @ApiProperty({
    description: 'Metric value unique identifier',
  })
  public readonly id: string;

  @ApiProperty({
    description:
      'Measurement that represents the value or quantity of a particular metric at a specific point in time',
  })
  public readonly value: number;

  @ApiProperty({
    description: 'Time when the measurement was performed',
  })
  public readonly timestamp: Date;

  @ApiProperty({
    description: 'Metric unique identifier at which this value makes reference',
  })
  public readonly metricId: string;

  constructor(id: string, value: number, timestamp: Date, metricId: string) {
    this.id = id;
    this.value = value;
    this.timestamp = timestamp;
    this.metricId = metricId;
  }
}
