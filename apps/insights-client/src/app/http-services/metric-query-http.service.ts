import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  MetricQuery,
  MetricQueryData,
  MetricQueryRequestUrl,
  MetricQueryResponse,
} from '@insights/insights-api-data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricQueryHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public query(data: MetricQueryData): Observable<MetricQueryResponse> {
    const query = new MetricQuery(data).toString();

    return this.httpClient.get<MetricQueryResponse>(MetricQueryRequestUrl, {
      params: new HttpParams().set('query', query),
    });
  }
}
