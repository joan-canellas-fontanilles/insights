import { TimePeriod } from './time-period';
import { TimeFilter } from './time-filter';

export interface AverageQueryData {
  readonly metricIds: string[];
  readonly group: TimePeriod;
  readonly timeFilter: TimeFilter;
}
