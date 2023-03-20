import { TimePeriod } from './time-period';
import { TimeFilter } from './time-filter';
import { AggregationType } from './aggregation-type';

export interface MetricQueryData {
  readonly metricIds: string[];
  readonly group: TimePeriod;
  readonly timeFilter: TimeFilter;
  readonly aggregation: AggregationType;
}
