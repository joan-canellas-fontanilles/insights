import { CreateMetricValueResponse } from '@insights/insights-api-data';

export class MetricValueDto implements CreateMetricValueResponse {
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly timestamp: Date,
    public readonly metricId: string
  ) {}
}
