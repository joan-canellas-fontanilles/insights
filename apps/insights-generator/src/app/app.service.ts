import { Injectable, Logger } from '@nestjs/common';
import {
  concatMap,
  delay,
  Observable,
  of,
  range,
  Subscription,
  tap,
} from 'rxjs';
import {
  CreateMetricRequestBody,
  CreateMetricRequestUrl,
  CreateMetricResponse,
  CreateMetricValueRequestBody,
  CreateMetricValueRequestUrl,
  CreateMetricValueResponse,
} from '@insights/insights-api-data';
import axios from 'axios';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  private readonly baseUrl;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>('TARGET_HOST');
  }

  private subscriptions = new Subscription();

  public stopAll(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }

  public start(): void {
    this.subscriptions.add(this.createMetricAndMetricValues().subscribe());
  }

  private generateRandomNumber(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private createMetric(): Observable<CreateMetricResponse> {
    const body: CreateMetricRequestBody = {
      name: 'metric ' + this.generateRandomNumber(200, 1000),
    };
    const promise = axios
      .post<CreateMetricResponse>(this.baseUrl + CreateMetricRequestUrl, body)
      .then((response) => response.data);
    return fromPromise(promise);
  }

  private requestRandomDelay(id: string): Observable<string> {
    return range(1, 1_000_000).pipe(
      concatMap(() => of(id).pipe(delay(this.generateRandomNumber(100, 2_000))))
    );
  }

  private createMetricValue(
    metricId: string
  ): Observable<CreateMetricValueResponse> {
    const body: CreateMetricValueRequestBody = {
      value: this.generateRandomNumber(200, 3_000),
      timestamp: null,
    };
    const promise = axios
      .post<CreateMetricValueResponse>(
        this.baseUrl +
          CreateMetricValueRequestUrl.replace(':metricId', metricId),
        body
      )
      .then((response) => response.data);
    return fromPromise(promise);
  }

  private createMetricAndMetricValues(): Observable<CreateMetricValueResponse> {
    return this.createMetric().pipe(
      concatMap(({ id }) => this.requestRandomDelay(id)),
      concatMap((id) => this.createMetricValue(id)),
      tap((value) => this.logger.log(value))
    );
  }
}
