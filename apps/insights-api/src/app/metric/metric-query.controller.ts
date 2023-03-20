import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  MetricQueryRequestUrl,
  MetricQueryResponse,
} from '@insights/insights-api-data';
import { MetricQueryService } from './services/metric-query.service';
import { MetricQueryRequestDto } from './dto/requests/metric-query-request.dto';
import { MetricQueryPipe } from './pipes/metric-query.pipe';

@Controller()
export class MetricQueryController {
  constructor(private readonly metricQueryService: MetricQueryService) {}

  @Get(MetricQueryRequestUrl)
  @HttpCode(HttpStatus.OK)
  public async metricQuery(
    @Query('query', MetricQueryPipe, new ValidationPipe())
    query: MetricQueryRequestDto
  ): Promise<MetricQueryResponse> {
    return this.metricQueryService.metricQuery(query);
  }
}
