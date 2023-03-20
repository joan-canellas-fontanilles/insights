import { Injectable } from '@nestjs/common';
import { MetricQuery, MetricQueryResponse } from '@insights/insights-api-data';
import { MetricQueryRepositoryService } from '../db/metric-query-repository.service';
import { MetricQueryDtoMapperService } from '../mappers/metric-query-dto-mapper.service';

@Injectable()
export class MetricQueryService {
  constructor(
    private readonly metricQueryRepository: MetricQueryRepositoryService,
    private readonly metricQueryDtoMapper: MetricQueryDtoMapperService
  ) {}

  public async metricQuery(
    queryRequest: MetricQuery
  ): Promise<MetricQueryResponse> {
    const queryResult = await this.metricQueryRepository.query(queryRequest);
    return this.metricQueryDtoMapper.fromQuery(queryRequest, queryResult);
  }
}
