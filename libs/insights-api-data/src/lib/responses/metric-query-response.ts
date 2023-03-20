export interface MetricData {
  readonly time: Date;
  readonly value: number;
}

export interface MetricResponse {
  readonly metric: string;
  readonly data: MetricData[];
}

export type MetricQueryResponse = MetricResponse[];
