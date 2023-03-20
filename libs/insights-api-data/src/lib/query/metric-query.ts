import { TimePeriod } from './time-period';
import { TimeFilter } from './time-filter';
import { MetricQueryData } from './metric-query-data';
import { AggregationType } from './aggregation-type';

export class MetricQuery implements MetricQueryData {
  readonly metricIds: string[];
  readonly group: TimePeriod;
  readonly timeFilter: TimeFilter;
  readonly aggregation: AggregationType;

  constructor(data: MetricQueryData) {
    this.metricIds = data.metricIds;
    this.group = data.group;
    this.timeFilter = {
      from: new Date(data.timeFilter.from),
      to: new Date(data.timeFilter.to),
    };
    this.aggregation = AggregationType.Average;
  }

  private static fromBase64ToUtf8(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  private static fromUtf8ToBase64(json: string): string {
    return Buffer.from(json, 'utf-8').toString('base64');
  }

  public static fromString(base64: string): MetricQuery {
    const data = this.fromBase64ToUtf8(base64);

    return new MetricQuery(JSON.parse(data));
  }

  public toString(): string {
    const json = JSON.stringify({
      metricIds: this.metricIds,
      group: this.group,
      timeFilter: this.timeFilter,
    });

    return MetricQuery.fromUtf8ToBase64(json);
  }
}
