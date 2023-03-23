import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MetricQuery } from '@insights/insights-api-data';
import { isBase64 } from 'class-validator';

@Injectable()
export class MetricQueryPipe implements PipeTransform<string, MetricQuery> {
  transform(base64: string, metadata: ArgumentMetadata): MetricQuery {
    if (!isBase64(base64)) {
      throw new BadRequestException(
        'A valid query encoded in base64 must be provided'
      );
    }
    try {
      return MetricQuery.fromString(base64);
    } catch (e) {
      throw new BadRequestException(
        'A valid query encoded in base64 must be provided'
      );
    }
  }
}
