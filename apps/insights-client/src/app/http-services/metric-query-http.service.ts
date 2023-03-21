import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateMetricValueResponse,
  MetricQuery,
  MetricQueryData,
  MetricQueryRequestUrl,
} from '@insights/insights-api-data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricQueryHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public query(data: MetricQueryData): Observable<CreateMetricValueResponse> {
    const query = new MetricQuery(data).toString();

    return this.httpClient.get<CreateMetricValueResponse>(
      MetricQueryRequestUrl,
      { params: new HttpParams().set('query', query) }
    );
  }
}
