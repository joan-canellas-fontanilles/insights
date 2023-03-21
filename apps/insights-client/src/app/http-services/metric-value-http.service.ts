import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateMetricValueRequestBody,
  CreateMetricValueRequestUrl,
  CreateMetricValueResponse,
} from '@insights/insights-api-data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricValueHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(
    metricId: string,
    body: CreateMetricValueRequestBody
  ): Observable<CreateMetricValueResponse> {
    return this.httpClient.post<CreateMetricValueResponse>(
      CreateMetricValueRequestUrl.replace(':metricId', metricId),
      body
    );
  }
}
