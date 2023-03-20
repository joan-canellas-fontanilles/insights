import { MetricResponse } from '@insights/insights-api-data';

export class MetricDto implements MetricResponse {
  constructor(public readonly id: string, public readonly name: string) {}
}
