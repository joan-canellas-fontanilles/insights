import { HttpException, HttpStatus } from '@nestjs/common';

export class MetricNotFoundException extends HttpException {
  constructor() {
    super('No metric was found with that uuid!', HttpStatus.NOT_FOUND);
  }
}
