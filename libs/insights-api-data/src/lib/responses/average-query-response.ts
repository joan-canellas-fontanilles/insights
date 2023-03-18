import { TimeFilter, TimePeriod } from '../query';

export interface AverageData {
  readonly time: Date;
  readonly value: number;
}

export interface AverageResponse {
  readonly metric: string;
  readonly data: AverageData[];
}

export interface AverageQueryResponse {
  readonly metrics: string[];
  readonly group: TimePeriod;
  readonly timeFilter: TimeFilter;
  readonly data: AverageResponse;
}
