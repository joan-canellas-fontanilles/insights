import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidMetricIdException extends HttpException {
  constructor() {
    super('The supplied metric id is not a valid uuid', HttpStatus.BAD_REQUEST);
  }
}
