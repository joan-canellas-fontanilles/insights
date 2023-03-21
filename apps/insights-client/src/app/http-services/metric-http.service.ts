import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateMetricRequestBody,
  CreateMetricRequestUrl,
  CreateMetricResponse,
  GetAllMetricsRequestUrl,
  GetAllMetricsResponse,
  GetMetricRequestUrl,
  GetMetricResponse,
  UpdateMetricRequestBody,
  UpdateMetricRequestUrl,
} from '@insights/insights-api-data';

@Injectable({ providedIn: 'root' })
export class MetricHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public get(metricId: string): Observable<GetMetricResponse> {
    return this.httpClient.get<GetMetricResponse>(
      GetMetricRequestUrl.replace(':metricId', metricId)
    );
  }

  public getAll(): Observable<GetAllMetricsResponse> {
    return this.httpClient.get<GetAllMetricsResponse>(GetAllMetricsRequestUrl);
  }

  public create(
    body: CreateMetricRequestBody
  ): Observable<CreateMetricResponse> {
    return this.httpClient.post<CreateMetricResponse>(
      CreateMetricRequestUrl,
      body
    );
  }

  public update(
    metricId: string,
    body: UpdateMetricRequestBody
  ): Observable<CreateMetricResponse> {
    return this.httpClient.put<CreateMetricResponse>(
      UpdateMetricRequestUrl.replace(':metricId', metricId),
      body
    );
  }
}
