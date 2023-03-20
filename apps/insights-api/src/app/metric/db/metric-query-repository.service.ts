import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetricValueEntity } from './metric-value.entity';
import { Between, In, Repository, SelectQueryBuilder } from 'typeorm';
import { MetricQuery, TimePeriod } from '@insights/insights-api-data';

enum QueryParts {
  MetricId = 'metricId',
  TimePeriod = 'timePeriod',
  Value = 'value',
}

export interface QueryResult {
  [QueryParts.MetricId]: string;
  [QueryParts.TimePeriod]: string;
  [QueryParts.Value]: string;
}

@Injectable()
export class MetricQueryRepositoryService {
  constructor(
    @InjectRepository(MetricValueEntity)
    private metricValueRepository: Repository<MetricValueEntity>
  ) {}

  private timeFormat(timePeriod: TimePeriod): string {
    switch (timePeriod) {
      case TimePeriod.Day:
        return '%Y-%m-%d';
      case TimePeriod.Hour:
        return '%Y-%m-%d %H:00:00';
      case TimePeriod.Minute:
        return '%Y-%m-%d %H:%i:00';
    }
  }

  private groupSelection(timePeriod: TimePeriod): string {
    const timeFormat = this.timeFormat(timePeriod);
    return `date_format(timestamp, '${timeFormat}')`;
  }

  private baseQuery(): SelectQueryBuilder<MetricValueEntity> {
    return this.metricValueRepository
      .createQueryBuilder()
      .select('metricId', QueryParts.MetricId)
      .groupBy(QueryParts.MetricId)
      .orderBy(QueryParts.MetricId);
  }

  private addWhere(
    query: SelectQueryBuilder<MetricValueEntity>,
    metricIds: string[],
    timeFilter: MetricQuery['timeFilter']
  ): SelectQueryBuilder<MetricValueEntity> {
    return query
      .where({ metric: In(metricIds) })
      .andWhere({ timestamp: Between(timeFilter.from, timeFilter.to) });
  }

  private addGroup(
    query: SelectQueryBuilder<MetricValueEntity>,
    timePeriod: TimePeriod
  ): SelectQueryBuilder<MetricValueEntity> {
    const groupSelection = this.groupSelection(timePeriod);
    return query
      .addSelect(groupSelection, QueryParts.TimePeriod)
      .addGroupBy(QueryParts.TimePeriod)
      .addOrderBy(QueryParts.TimePeriod);
  }

  private addAggregation(
    query: SelectQueryBuilder<MetricValueEntity>
  ): SelectQueryBuilder<MetricValueEntity> {
    return query.addSelect('AVG(value)', QueryParts.Value);
  }

  private generateQuery(queryParams: MetricQuery) {
    let query = this.baseQuery();
    query = this.addAggregation(query);
    query = this.addWhere(query, queryParams.metricIds, queryParams.timeFilter);
    query = this.addGroup(query, queryParams.group);
    return query;
  }

  public async query(query: MetricQuery): Promise<QueryResult[]> {
    return this.generateQuery(query).getRawMany<QueryResult>();
  }
}
