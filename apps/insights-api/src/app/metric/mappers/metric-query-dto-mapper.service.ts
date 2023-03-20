import { Injectable } from '@nestjs/common';
import { QueryResult } from '../db/metric-query-repository.service';
import { MetricQuery } from '@insights/insights-api-data';
import {
  MetricDataDto,
  MetricQueryDto,
} from '../dto/responses/metric-query-request.dto';

@Injectable()
export class MetricQueryDtoMapperService {
  private generateMetricData(
    metricId: string,
    queryResult: QueryResult[]
  ): MetricDataDto[] {
    return queryResult
      .filter((result) => result.metricId === metricId)
      .map(
        ({ value, timePeriod }) =>
          new MetricDataDto(new Date(timePeriod), Number(value))
      );
  }

  public fromQuery(
    queryRequest: MetricQuery,
    queryResult: QueryResult[]
  ): MetricQueryDto[] {
    return queryRequest.metricIds.map(
      (metricId) =>
        new MetricQueryDto(
          metricId,
          this.generateMetricData(metricId, queryResult)
        )
    );
  }
}
