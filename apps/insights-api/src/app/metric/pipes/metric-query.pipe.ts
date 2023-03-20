import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { MetricQuery } from '@insights/insights-api-data';

@Injectable()
export class MetricQueryPipe implements PipeTransform<string, MetricQuery> {
  transform(base64: string, metadata: ArgumentMetadata): MetricQuery {
    return MetricQuery.fromString(base64);
  }
}
