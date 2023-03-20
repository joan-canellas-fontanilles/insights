import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InvalidMetricIdException } from '../exceptions/invalid-metric-id.exception';

@Injectable()
export class MetricIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (isUUID(value)) {
      return value;
    }
    throw new InvalidMetricIdException();
  }
}
