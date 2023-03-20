import { HttpException, HttpStatus } from '@nestjs/common';

export class MetricAlreadyExists extends HttpException {
  constructor() {
    super(
      'Already exists a metric with the same name!',
      HttpStatus.BAD_REQUEST
    );
  }
}
