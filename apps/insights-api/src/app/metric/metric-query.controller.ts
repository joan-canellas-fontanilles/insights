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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetricQueryDto } from './dto/responses/metric-query.dto';
import { HttpExceptionDto } from './dto/responses/http-exception.dto';

@ApiTags('metric-query')
@Controller()
export class MetricQueryController {
  constructor(private readonly metricQueryService: MetricQueryService) {}

  @Get(MetricQueryRequestUrl)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Query retrieved successfully',
    type: MetricQueryDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'A invalid encoded query parameter was provided',
    type: HttpExceptionDto,
  })
  public async metricQuery(
    @Query('query', MetricQueryPipe, new ValidationPipe())
    query: MetricQueryRequestDto
  ): Promise<MetricQueryResponse> {
    return this.metricQueryService.metricQuery(query);
  }
}
